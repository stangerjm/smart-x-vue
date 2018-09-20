import { isObject } from "./helpers";

/**
 * Returns a non-reactive copy of the passed in object
 * @param originalObj
 * @returns {*}
 */
export function getNonReactiveCopy(originalObj) {
  // If parameter is primitive data-type, ignore
  if (!isObject(originalObj) || Array.isArray(originalObj)) {
    return originalObj;
  }

  let entries = Object.entries(originalObj);

  return entries.reduce(createCopy, {});
}

function createCopy(accumulatorObj, [prop, attribute]) {
  return {
    ...accumulatorObj,
    [prop]: {
      type: attribute.type,
      value: attribute.value
    }
  };
}
