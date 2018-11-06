import moment from 'moment';
import config from '../../../app.config';

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

  // Return whether or not the date string can be parsed
  // Check normally formatted dates, ISO formatted dates
  return (
    moment(value, config.dateFormat, true).isValid() ||
    moment(value, moment.ISO_8601, true).isValid()
  );
}

/**
 * Parses a string date into a new Date object.
 * @param {string} dateString
 * @returns {Date | undefined}
 */
export default function parseDateString(dateString) {
  if (typeof dateString !== 'string') {
    return undefined;
  }

  // If date is earliest possible .NET MVC encoded JSON date, return early date
  if (dateString.startsWith('/Date(')) {
    const parsedDate = dateString.substring(dateString.indexOf('(') + 1, dateString.indexOf(')'));
    return new Date(Number.parseInt(parsedDate, 10));
  } else if (isValidDateString(dateString)) {
    // If date is any other valid date, return new date with the value
    return new Date(dateString);
  }

  // If parameter cannot be parsed, return undefined
  return undefined;
}
