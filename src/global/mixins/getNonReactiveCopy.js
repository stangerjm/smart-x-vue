import { isObject } from './helpers';

function createCopy(accumulatorObj, [prop, attribute]) {
  return {
    ...accumulatorObj,
    [prop]: attribute,
  };
}

/**
 * Returns a non-reactive copy of the passed in object
 * @param originalObj
 * @returns {*}
 */
export default function getNonReactiveCopy(originalObj) {
  // If parameter is primitive data-type, ignore
  if (!isObject(originalObj) || Array.isArray(originalObj)) {
    return originalObj;
  }

  const entries = Object.entries(originalObj);

  return entries.reduce(createCopy, {});
}
