import moment from "moment";
import { config } from "../../../app.config";

/**
 * Parses a string date into a new Date object.
 * @param {string} date
 * @returns {Date | undefined}
 */
export function parseDateString(date) {
  if (typeof date !== "string") {
    return undefined;
  }

  // Regular expression that matches .NET encoded JSON dates
  let dateRegex = /\/Date\((\d+)(?:-\d+)?\)\//i;

  // If date is earliest possible .NET encoded JSON date, return early date
  if (date === "/Date(-62135568000000)/") {
    return new Date("1/1/0001");
  }
  // If date is any .NET encoded JSON date, return a new date with the value
  else if (dateRegex.test(date)) {
    return new Date(parseInt(dateRegex.exec(date)[1], 10));
  }
  // If date is any other valid date, return new date with the value
  else if (isValidDateString(date)) {
    return new Date(date);
  }
  // If date is any other type, return undefined
  else {
    return undefined;
  }
}

/**
 * Returns true if the passed in value is a valid date string
 * @param {string} value
 * @returns {boolean}
 */
function isValidDateString(value) {
  // If value is not a string or a parseable date-string, return false
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    return false;
  }

  // Return whether or not the date string can be parsed by the 'moment.js' date library
  return (
    moment(value, moment.ISO_8601, true).isValid() ||
    moment.utc(value, config.dateFormat).isValid()
  );
}
