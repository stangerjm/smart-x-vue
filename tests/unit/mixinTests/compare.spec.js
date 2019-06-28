import { compare } from '../../../src/global/mixins';

describe('compare.js', () => {
  it('returns true if values are equal', () => {
    /**
     * String comparison
     */
    expect(compare('test', 'test', String)).toBeTruthy();
    expect(compare('This is a test', 'This is a test', String)).toBeTruthy();
    expect(compare(new Date().toString(), new Date().toString(), String)).toBeTruthy();
    expect(compare('Billy', 'Billy', String)).toBeTruthy();

    /**
     * Number comparison
     */
    expect(compare(25, 25, Number)).toBeTruthy();
    expect(compare(250, 250, Number)).toBeTruthy();
    expect(compare(2500, 2500, Number)).toBeTruthy();
    expect(compare(Infinity, Infinity, Number)).toBeTruthy();

    /**
     * Date comparison
     */
    expect(compare(new Date('01/01/2001'), new Date('01/01/2001'), Date)).toBeTruthy();
    expect(compare('01/01/2001', '01/01/2001', Date)).toBeTruthy();
    expect(compare('01/01/2001', new Date('01/01/2001'), Date)).toBeTruthy();
    expect(compare(new Date('01/01/2001'), '01/01/2001', Date)).toBeTruthy();
    expect(compare('01/01/2001', new Date('01/01/2001').toISOString(), Date)).toBeTruthy();
    expect(compare(new Date('01/01/2001').toISOString(), '01/01/2001', Date)).toBeTruthy();

    /**
     * Boolean comparison
     */
    expect(compare(true, true, Boolean)).toBeTruthy();
    expect(compare(false, false, Boolean)).toBeTruthy();

    /**
     * Object comparison
     */
    const object = {
      name: 'James',
      age: 25,
      birthday: new Date('09/11/1993'),
    };

    const object2 = object;

    expect(compare(object, object, Object)).toBeTruthy();
    expect(compare(object, object2, Object)).toBeTruthy();

    /**
     * Array comparison
     */
    const array = ['Washington', 'Oregon', 'California'];

    const array2 = array;

    expect(compare(array, array, Array)).toBeTruthy();
    expect(compare(array, array2, Array)).toBeTruthy();
  });

  it('returns false if values are not equal', () => {
    /**
     * String comparison
     */
    expect(compare('test', 'test123', String)).toBeFalsy();
    expect(compare('This is a test', 'This is not a test', String)).toBeFalsy();
    expect(compare(new Date().toString(), new Date().toUTCString(), String)).toBeFalsy();
    expect(compare('Billy', 'Joe', String)).toBeFalsy();

    /**
     * Number comparison
     */
    expect(compare(25, 24, Number)).toBeFalsy();
    expect(compare(250, 249, Number)).toBeFalsy();
    expect(compare(2500, 2499, Number)).toBeFalsy();
    expect(compare(Infinity, -Infinity, Number)).toBeFalsy();

    /**
     * Date comparison
     */
    expect(compare(new Date('01/01/2001'), new Date('01/01/2000'), Date)).toBeFalsy();
    expect(compare('01/01/2001', '01/01/2000', Date)).toBeFalsy();
    expect(compare('01/01/2001', new Date('01/01/2000'), Date)).toBeFalsy();
    expect(compare(new Date('01/01/2001'), '01/01/2000', Date)).toBeFalsy();
    expect(compare('01/01/2001', new Date('01/01/2000').toUTCString(), Date)).toBeFalsy();
    expect(compare(new Date('01/01/2001').toUTCString(), '01/01/2000', Date)).toBeFalsy();
    expect(compare('01/01/2001', new Date('01/01/2000').toISOString(), Date)).toBeFalsy();
    expect(compare(new Date('01/01/2001').toISOString(), '01/01/2000', Date)).toBeFalsy();

    /**
     * Boolean comparison
     */
    expect(compare(true, false, Boolean)).toBeFalsy();
    expect(compare(false, true, Boolean)).toBeFalsy();

    /**
     * Object comparison
     */
    const object = { name: 'Test', age: 20 };
    const object2 = { test: 'Name', another: 'Age' };
    expect(compare({ name: 'James' }, { name: 'James' }, Object)).toBeFalsy();
    expect(compare(object, object2, Object)).toBeFalsy();

    /**
     * Array comparison
     */
    const array = ['Washington', 'Oregon', 'California'];

    const array2 = ['United States', 'Canada', 'Mexico'];

    expect(compare(['Washington', 'Oregon', 'California'], ['Washington', 'Oregon', 'California'], Array)).toBeFalsy();
    expect(compare(array, array2, Array)).toBeFalsy();

    /**
     * Null comparison
     */
    expect(compare(null, 'Test')).toBeFalsy();
    expect(compare('Test', null)).toBeFalsy();

    expect(compare(null, 10)).toBeFalsy();
    expect(compare(10, null)).toBeFalsy();

    expect(compare(null, new Date('01/01/2001'))).toBeFalsy();
    expect(compare(new Date('01/01/2001'), null)).toBeFalsy();

    expect(compare(null, true)).toBeFalsy();
    expect(compare(true, null)).toBeFalsy();

    expect(compare(null, {})).toBeFalsy();
    expect(compare({}, null)).toBeFalsy();

    expect(compare(null, [])).toBeFalsy();
    expect(compare([], null)).toBeFalsy();

    expect(compare(null, null)).toBeFalsy();

    /**
     * Undefined comparison
     */
    expect(compare(undefined, 'Test')).toBeFalsy();
    expect(compare('Test', undefined)).toBeFalsy();

    expect(compare(undefined, 10)).toBeFalsy();
    expect(compare(10, undefined)).toBeFalsy();

    expect(compare(undefined, new Date('01/01/2001'))).toBeFalsy();
    expect(compare(new Date('01/01/2001'), undefined)).toBeFalsy();

    expect(compare(undefined, true)).toBeFalsy();
    expect(compare(true, undefined)).toBeFalsy();

    expect(compare(undefined, {})).toBeFalsy();
    expect(compare({}, undefined)).toBeFalsy();

    expect(compare(undefined, [])).toBeFalsy();
    expect(compare([], undefined)).toBeFalsy();

    expect(compare(undefined, undefined)).toBeFalsy();
  });
});
