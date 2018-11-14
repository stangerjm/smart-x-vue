import compareAsc from 'date-fns/compareAsc';
import { coerceToDate } from './helpers';

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
      // Compare the compareValue and the parsed data value as dates
      return (
        compareAsc(coerceToDate(compareValue), coerceToDate(dataValue)) === 0
      );
    case Object:
    case Array:
    case Boolean:
    default:
      return dataValue === compareValue;
  }
}
