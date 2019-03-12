import { toTitleCase } from '../../../src/global/mixins';

describe('toTitleCase.js', () => {
  it('converts a camel case string to title case', () => {
    expect(toTitleCase('interlockManagementSystem')).toEqual('Interlock Management System');
    expect(toTitleCase('dateOfBirth')).toEqual('Date Of Birth');
    expect(toTitleCase('isEmployee')).toEqual('Is Employee');
    expect(toTitleCase('deviceModel')).toEqual('Device Model');
    expect(toTitleCase('manufacturerName')).toEqual('Manufacturer Name');
  });
});
