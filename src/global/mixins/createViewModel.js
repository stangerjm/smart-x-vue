import parseDateString from './parseDateString';
import { isObject, getDefaultValue, getType } from './helpers';
import ModelType from '../constants/ModelType';

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
  function simplifyObjectToOriginalModel(accumulatorObj, [key, typedValue]) {
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
        simplifyObjectToOriginalModel,
        {},
      ),
    };
  }

  /**
   * Simplifies the passed in object to just basic keys and values,
   * ignoring the rest of the view model
   * @param obj
   * @returns {object}
   */
  function simplify(obj) {
    return Object.entries(obj).reduce(simplifyObjectToOriginalModel, {});
  }

  /**
   * Defines an 'simpleVersion' property on the passed in object
   * which will transform the object into simple key value pairs,
   * ignoring the rest of the view model
   * @param obj
   * @returns {object}
   */
  function getSimplifyableObject(obj) {
    return Object.defineProperty(obj, 'simpleVersion', {
      enumerable: false,
      get() {
        return simplify(obj);
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
    function accumulateFunctionType(type) {
      return getSimplifyableObject({
        ...accumulatorObj,
        [key]: {
          type: type.name,
          typeConstructor: type,
          value: getDefaultValue(value),
          errored: false,
        },
      });
    }

    if (isObject(value)) {
      return getSimplifyableObject({
        ...accumulatorObj,
        [key]: {
          type: getType(value),
          typeConstructor: getType(value, true),
          value: Object.entries(value).reduce(gatherIntoViewModelObject, {}),
          errored: false,
        },
      });
    } else if (typeof value === 'function') {
      if (value.name === ModelType.PhoneNumber().name) {
        return accumulateFunctionType(ModelType.PhoneNumber);
      }

      if (value.name === ModelType.Password().name) {
        return accumulateFunctionType(ModelType.Password);
      }

      return accumulateFunctionType(value);
    }

    return getSimplifyableObject({
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
    const type = value.type || value.value;
    return {
      ...accumulator,
      [value.name]: type,
    };
  }

  const typedViewModel = arraySchema.reduce(createTypedViewModel, {});

  const entries = Object.entries(typedViewModel);
  const createViewModelFromEntries = getViewModelReductor();

  const partialViewModel = entries.reduce(createViewModelFromEntries, {});

  return arraySchema.reduce((accumulator, partialEntry) => {
    const {
      name, type, value, ...restOfSchema
    } = partialEntry;

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
