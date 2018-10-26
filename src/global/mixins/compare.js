import moment from 'moment';

/**
 * Compare the two values passed in. Return true if values are equal.
 * @param dataValue
 * @param compareValue
 * @param compareType
 * @returns {boolean}
 */
export default function compare(dataValue, compareValue, compareType) {
  // Don't compare if values are null or undefined
  if (dataValue == null || compareType == null) {
    return false;
  }
  switch (compareType) {
    case String:
      // Compare values coerced into strings and trimmed then cast to lower case
      return String(dataValue)
        .trim()
        .toLowerCase()
        .includes(String(compareValue)
          .trim()
          .toLowerCase());
    case Number:
      // Coerce values to numbers then compare
      return Number(dataValue) === Number(compareValue);
    case Date:
      // Coerce values into Date objects before comparison
      // Compare only to the day (ignore time)
      return (
        moment(new Date(compareValue))
          .startOf('day')
          .toString() ===
        moment(new Date(dataValue))
          .startOf('day')
          .toString()
      );
    case Object:
    case Array:
    case Boolean:
    default:
      return dataValue === compareValue;
  }
}
