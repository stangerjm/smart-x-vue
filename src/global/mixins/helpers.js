/**
 * Determines if the value passed in is an object.
 * @param value
 * @returns {boolean}
 */
export function isObject(value) {
  if (value == null) {
    return false;
  }

  return typeof value === "object" && value.constructor === Object;
}
