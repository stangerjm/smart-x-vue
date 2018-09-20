import { parseDateString } from "./parseDateString";
import { isObject } from "./helpers";

/**
 * Takes in an object and returns a typed schema based on the values
 * @param schema
 * @returns {object}
 */
export function createSchema(schema) {
  let entries = Object.entries(schema);
  let createSchemaFromEntries = getSchemaReductor();

  return entries.reduce(createSchemaFromEntries, {});
}

/**
 * Returns a reducing function that will reduce an array of object entries into a typed schema object.
 * @returns {function}
 */
function getSchemaReductor() {
  /**
   * Reverts the passed in object to an untyped model
   * @param obj
   * @returns {object}
   */
  function revert(obj) {
    return Object.entries(obj).reduce(revertObjectToUntypedModel, {});
  }

  /**
   * Reducing function. Creates a new object with only the value from a typed schema.
   * @param accumulatorObj
   * @param key
   * @param value
   * @returns {object}
   */
  function revertObjectToUntypedModel(accumulatorObj, [key, typedValue]) {
    if (typedValue.type !== Object.name && typedValue.value != null) {
      return {
        ...accumulatorObj,
        [key]: typedValue.value
      };
    } else {
      return {
        ...accumulatorObj,
        [key]: Object.entries(typedValue.value).reduce(
          revertObjectToUntypedModel,
          {}
        )
      };
    }
  }

  /**
   * Defines an 'untypedObject' property on the passed in object which will get the untyped version of the object
   * @param obj
   * @returns {object}
   */
  function getRevertableObject(obj) {
    return Object.defineProperty(obj, "untypedObject", {
      enumerable: false,
      get() {
        return revert(obj);
      }
    });
  }

  /**
   * Reducing function. Returns a new object with the type and value of the value passed in.
   * @param accumulatorObj
   * @param key
   * @param value
   * @returns {object}
   */
  function gatherIntoSchemaObject(accumulatorObj, [key, value]) {
    if (value == null || key === "__v") {
      // ignore null values and unwanted keys
      return accumulatorObj;
    }

    if (isObject(value)) {
      return getRevertableObject({
        ...accumulatorObj,
        [key]: {
          type: getType(value),
          value: Object.entries(value).reduce(gatherIntoSchemaObject, {})
        }
      });
    } else if (typeof value === "function") {
      return getRevertableObject({
        ...accumulatorObj,
        [key]: {
          type: value.name,
          value: getDefaultValue(value)
        }
      });
    } else {
      return getRevertableObject({
        ...accumulatorObj,
        [key]: {
          type: getType(getValue(value)),
          value: getValue(value)
        }
      });
    }
  }

  return gatherIntoSchemaObject;
}

/**
 * Parses value if needed and returns raw or parsed value.
 * @param value
 * @param type
 * @returns {*}
 */
function getValue(value, type) {
  if (type === "String" || getType(value) === "String") {
    return parseDateString(value) || value;
  }

  return value;
}

/**
 * Returns the name of the type of the value passed in.
 * @param value
 * @returns {string}
 */
function getType(value) {
  return Object.getPrototypeOf(Object(value)).constructor.name;
}

/**
 * Gets the default value for the type passed in.
 * @param type
 * @returns {*}
 */
function getDefaultValue(type) {
  switch (type) {
    case Number:
      return null;
    case String:
      return "";
    case Date:
      return new Date();
    case Object:
      return {};
    case Boolean:
      return false;
    case Array:
      return [];
  }
}
