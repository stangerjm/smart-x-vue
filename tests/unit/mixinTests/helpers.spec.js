import { isObject, getType, getDefaultValue, getClass, splitArrayIntoChunks, coerceToDate, capitalize } from '../../../src/global/mixins/helpers';

function test() {}

describe('helpers.js', () => {
  it('contains a function "isObject" that determines if a value passed in is an object', () => {
    expect(isObject({ name: 'James' })).toBeTruthy();

    expect(isObject('This is a test')).toBeFalsy();
    expect(isObject(100)).toBeFalsy();
    expect(isObject(true)).toBeFalsy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(new Date())).toBeFalsy();
    expect(isObject(test)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
  });

  it('contains a function "getType" that gets the type of the value passed in', () => {
    /**
     * Test retrieve string type
     */
    expect(getType({ name: 'James' })).toEqual('Object');
    expect(getType('This is a test')).toEqual('String');
    expect(getType(100)).toEqual('Number');
    expect(getType(true)).toEqual('Boolean');
    expect(getType([])).toEqual('Array');
    expect(getType(new Date())).toEqual('Date');
    expect(getType(test)).toEqual('Function');

    /**
     * Test retrieve constructor type
     */
    expect(getType({ name: 'James' }, true)).toEqual(Object);
    expect(getType('This is a test', true)).toEqual(String);
    expect(getType(100, true)).toEqual(Number);
    expect(getType(true, true)).toEqual(Boolean);
    expect(getType([], true)).toEqual(Array);
    expect(getType(new Date(), true)).toEqual(Date);
    expect(getType(test, true)).toEqual(Function);
    expect(getType(null)).toEqual(null);
    expect(getType(undefined)).toEqual(undefined);
  });

  it('contains a function "getDefaultValue" that retrieves the default value for the type passed in', () => {
    /**
     * Test retrieve constructor type
     */
    expect(getDefaultValue(Object)).toEqual({});
    expect(getDefaultValue(String)).toEqual('');
    expect(getDefaultValue(Number)).toEqual(null);
    expect(getDefaultValue(Boolean)).toEqual(false);
    expect(getDefaultValue(Array)).toEqual([]);
    expect(getDefaultValue(Date)).toEqual(null);
    expect(getDefaultValue(Function)).toEqual(null);
    expect(getDefaultValue(null)).toEqual(null);
    expect(getDefaultValue(undefined)).toEqual(undefined);
  });

  it('contains a function "getClass" that retrieves a class based off of the type passed in', () => {
    const allowedTypes = ['add', 'exit', 'expand', 'reset', 'search', 'clear'];
    const baseClass = 'bit-btn';

    allowedTypes.every((type) => {
      expect(getClass(baseClass, type, allowedTypes)).toEqual(`${baseClass}-${type}`);
      return true;
    });

    expect(getClass(baseClass, 'badValue', allowedTypes)).toEqual(`${baseClass}-error`);
  });

  it('contains a function "splitArrayIntoChunks" that splits a given array into chunks', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const expectedList = [[1, 2], [3, 4], [5, 6]];

    expect(splitArrayIntoChunks(list, 2)).toEqual(expectedList);
    expect(splitArrayIntoChunks(list, 0)).toEqual([list]);
    expect(splitArrayIntoChunks(list, -10)).toEqual([list]);
    expect(splitArrayIntoChunks(list, undefined)).toEqual([]);
    expect(splitArrayIntoChunks(list, null)).toEqual([]);
    expect(splitArrayIntoChunks(undefined, 20)).toEqual([]);
    expect(splitArrayIntoChunks(null, 10)).toEqual([]);
    expect(splitArrayIntoChunks(undefined, undefined)).toEqual([]);
    expect(splitArrayIntoChunks(null, null)).toEqual([]);
  });

  it('contains a function "coerceToDate" that attempts to coerce a given value into a date', () => {
    const dateString = '01/01/2001';

    expect(coerceToDate(dateString)).toEqual(new Date(dateString));
    expect(coerceToDate(new Date(dateString))).toEqual(new Date(dateString));
    expect(coerceToDate(Date.parse(dateString))).toEqual(new Date(dateString));
  });

  it('contains a function capitalize that capitalizes the first letter of a string', () => {
    expect(capitalize('test')).toEqual('Test');
    expect(capitalize('person 1')).toEqual('Person 1');
    expect(capitalize('this is a string')).toEqual('This is a string');
    expect(capitalize('1person')).toEqual('1person');
    expect(capitalize('1 test')).toEqual('1 test');
  });
});
