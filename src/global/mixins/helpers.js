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

/**
 * Gets the default value for the type passed in.
 * @param type
 * @returns {*}
 */
export function getDefaultValue(type) {
  switch (type) {
    case Number:
      return null;
    case String:
      return "";
    case Date:
      return null;
    case Object:
      return {};
    case Boolean:
      return false;
    case Array:
      return [];
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
  } else {
    return `${baseClass}-error`;
  }
}

/**
 * Returns the name of the type of the value passed in.
 * @param value
 * @param returnConstructorType
 * @returns {string}
 */
export function getType(value, returnConstructorType) {
  let type = Object.getPrototypeOf(Object(value)).constructor;
  if (returnConstructorType) {
    return type;
  }
  return type.name;
}
