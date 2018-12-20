import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import config from '../../../app.config';

function getDateValidator(dateString) {
  return function validateWithFormat(format) {
    return isValid(parse(dateString, format, new Date(), { awareOfUnicodeTokens: true }));
  };
}

/**
 * Returns true if the passed in value is a valid date string
 * *Note: CANNOT handle UTC strings
 * @param {string} value
 * @returns {boolean}
 */
function isValidDateString(value) {
  // If value is not a string, return false
  if (typeof value !== 'string') {
    return false;
  }

  const shortISOFormat = "YYYY-MM-DD'T'HH:mm:ss";
  const longISOFormat = "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'";
  const utcFormat = "ccc, DD MMM YYYY HH:mm:ss 'GMT'";
  const validDate = config.dateParseFormat;

  const validateDateString = getDateValidator(value);

  // Return whether or not the date string can be parsed
  // Check normally formatted dates, ISO formatted dates
  return (
    validateDateString(shortISOFormat) ||
    validateDateString(longISOFormat) ||
    validateDateString(utcFormat) ||
    validateDateString(validDate)
  );
}

/**
 * Parses a string date into a new Date object.
 * @param {*} dateString
 * @returns {Date | null}
 */
export default function parseDateString(dateString) {
  if (dateString == null) {
    return null;
  }

  if (typeof dateString !== 'string') {
    return null;
  }

  // If date is earliest possible .NET MVC encoded JSON date, return early date
  if (dateString.startsWith('/Date(')) {
    const parsedDate = dateString.substring(dateString.indexOf('(') + 1, dateString.indexOf(')'));
    return new Date(Number.parseInt(parsedDate, 10));
  } else if (isValidDateString(dateString)) {
    // If date is any other valid date, return new date with the value
    return new Date(dateString);
  }

  // If parameter cannot be parsed, return null
  return null;
}
