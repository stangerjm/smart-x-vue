import ModelType from '../constants/ModelType';

/**
 * Determines if the value passed in is an object.
 * @param value
 * @returns {boolean}
 */
export function isObject(value) {
  if (value == null) {
    return false;
  }

  return typeof value === 'object' && value.constructor === Object;
}

/**
 * Returns the name of the type of the value passed in.
 * @param value
 * @param returnConstructorType
 * @returns {string}
 */
export function getType(value, returnConstructorType) {
  const type = Object.getPrototypeOf(Object(value)).constructor;
  if (returnConstructorType) {
    return type;
  }
  return type.name;
}

/**
 * Gets the default value for the type passed in.
 * @param type
 * @returns {*}
 */
export function getDefaultValue(type) {
  if (
    type.name === ModelType.PhoneNumber.name ||
    type.name === ModelType.PhoneNumber().name ||
    type.name === ModelType.Password.name ||
    type.name === ModelType.Password().name
  ) {
    // Only return the value from type() call if it returns a value and not a function
    return getType(type()) !== 'Function' ? type() : '';
  }

  switch (type) {
    case Number:
      return null;
    case String:
      return '';
    case Date:
      return null;
    case Object:
      return {};
    case Boolean:
      return false;
    case Array:
      return [];
    default:
      return null;
  }
}

/**
 * Returns the correct class based off of the baseClass and if the
 * passed-in type can be found in the allowed types.
 * @param baseClass
 * @param type
 * @param allowedTypes
 * @returns {string}
 */
export function getClass(baseClass, type, allowedTypes) {
  if (!type) {
    return `${baseClass}-error`;
  } else if (allowedTypes.includes(type)) {
    return `${baseClass}-${type}`;
  }

  return `${baseClass}-error`;
}

/**
 * Returns an array derived from the array passed in and split into chunks
 * with the number of elements specified in each chunk.
 */
export function splitArrayIntoChunks(array, elementsPerChunk) {
  if (array == null || elementsPerChunk == null) {
    return [];
  }
  if (elementsPerChunk <= 0) {
    return array;
  }
  // Create an array with the number of chunks required
  return (
    Array(Math.ceil(array.length / elementsPerChunk))
      // Fill the array with any value (no arguments will just fill with 'undefined')
      .fill()
      // Use Array.prototype.map to fill each chunk with the
      // correct number of values from the original array
      .map((_, idx) => {
        const start = idx * elementsPerChunk;
        const end = start + elementsPerChunk;
        return array.slice(start, end);
      })
  );
}
