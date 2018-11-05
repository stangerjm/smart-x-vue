import moment from 'moment';
import config from '../../../app.config';

/**
 * Returns true if the passed in value is a valid date string
 * @param {string} value
 * @returns {boolean}
 */
function isValidDateString(value) {
  // If value is not a string or a parseable date-string, return false
  if (typeof value !== 'string' || !moment(value, config.dateFormat, true).isValid()) {
    return false;
  }

  // Return whether or not the date string can be parsed by the 'moment.js' date library
  return (
    moment(value, moment.ISO_8601, true).isValid() ||
    moment.utc(value, config.dateFormat).isValid()
  );
}

/**
 * Parses a string date into a new Date object.
 * @param {string} date
 * @returns {Date | undefined}
 */
export default function parseDateString(date) {
  if (typeof date !== 'string') {
    return undefined;
  }

  // Regular expression that matches .NET encoded JSON dates
  const dateRegex = /\/Date\((\d+)(?:-\d+)?\)\//i;

  // If date is earliest possible .NET encoded JSON date, return early date
  if (date === '/Date(-62135568000000)/') {
    return new Date('1/1/0001');
  } else if (dateRegex.test(date)) {
    // If date is any .NET encoded JSON date, return a new date with the value
    return new Date(parseInt(dateRegex.exec(date)[1], 10));
  } else if (isValidDateString(date)) {
    // If date is any other valid date, return new date with the value
    return new Date(date);
  }

  // If date is any other type, return undefined
  return undefined;
}
