import { isObject, getType, getDefaultValue } from '../../../src/global/mixins/helpers';

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
});
