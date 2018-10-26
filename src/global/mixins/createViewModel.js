import parseDateString from './parseDateString';
import { isObject, getDefaultValue, getType } from './helpers';

/**
 * Parses value if needed and returns raw or parsed value.
 * @param value
 * @param type
 * @returns {*}
 */
function getValue(value, type) {
  if (type === 'String' || getType(value) === 'String') {
    return parseDateString(value) || value;
  }

  return value;
}

/**
 * Returns a reducing function that will reduce an array
 * of object entries into a typed view model object.
 * @returns {function}
 */
function getViewModelReductor() {
  /**
   * Reducing function. Creates a new object with only the value from a typed schema.
   * @param accumulatorObj
   * @param key
   * @param value
   * @returns {object}
   */
  function revertObjectToUntypedModel(accumulatorObj, [key, typedValue]) {
    if (typedValue.value == null || typedValue.value === '') {
      return accumulatorObj;
    }
    if (typedValue.type !== Object.name) {
      return {
        ...accumulatorObj,
        [key]: typedValue.value,
      };
    }

    return {
      ...accumulatorObj,
      [key]: Object.entries(typedValue.value).reduce(
        revertObjectToUntypedModel,
        {},
      ),
    };
  }

  /**
   * Reverts the passed in object to an untyped model
   * @param obj
   * @returns {object}
   */
  function revert(obj) {
    return Object.entries(obj).reduce(revertObjectToUntypedModel, {});
  }

  /**
   * Defines an 'untypedObject' property on the passed in object
   * which will get the untyped version of the object
   * @param obj
   * @returns {object}
   */
  function getRevertableObject(obj) {
    return Object.defineProperty(obj, 'untypedObject', {
      enumerable: false,
      get() {
        return revert(obj);
      },
    });
  }

  /**
   * Reducing function. Returns a new object with the type and value of the value passed in.
   * @param accumulatorObj
   * @param key
   * @param value
   * @returns {object}
   */
  function gatherIntoViewModelObject(accumulatorObj, [key, value]) {
    if (key === '__v') {
      // ignore null values and unwanted keys
      return accumulatorObj;
    }

    if (isObject(value)) {
      return getRevertableObject({
        ...accumulatorObj,
        [key]: {
          type: getType(value),
          typeConstructor: getType(value, true),
          value: Object.entries(value).reduce(gatherIntoViewModelObject, {}),
          errored: false,
        },
      });
    } else if (typeof value === 'function') {
      return getRevertableObject({
        ...accumulatorObj,
        [key]: {
          type: value.name,
          typeConstructor: value,
          value: getDefaultValue(value),
          errored: false,
        },
      });
    }

    return getRevertableObject({
      ...accumulatorObj,
      [key]: {
        type: getType(getValue(value)),
        typeConstructor: getType(getValue(value), true),
        value: getValue(value),
        errored: false,
      },
    });
  }

  return gatherIntoViewModelObject;
}

function createViewModelFromArray(arraySchema) {
  function createTypedViewModel(accumulator, value) {
    return {
      ...accumulator,
      [value.name]: value.type,
    };
  }

  const typedViewModel = arraySchema.reduce(createTypedViewModel, {});

  const entries = Object.entries(typedViewModel);
  const createViewModelFromEntries = getViewModelReductor();
  const partialViewModel = entries.reduce(createViewModelFromEntries, {});

  return arraySchema.reduce((accumulator, value) => {
    const { name, type, ...restOfSchema } = value;

    accumulator[name] = {
      ...accumulator[name],
      ...restOfSchema,
    };

    return accumulator;
  }, partialViewModel);
}

/**
 * Takes in an object and returns a typed schema based on the values
 * @param schema
 * @returns {object}
 */
export default function createViewModel(schema) {
  if (schema == null) {
    return {};
  }

  if (Array.isArray(schema)) {
    return createViewModelFromArray(schema);
  }

  const entries = Object.entries(schema);
  const createViewModelFromEntries = getViewModelReductor();

  return entries.reduce(createViewModelFromEntries, {});
}
