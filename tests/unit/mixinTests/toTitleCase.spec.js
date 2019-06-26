import { toTitleCase } from '../../../src/global/mixins';

describe('toTitleCase.js', () => {
  it('converts any case string to title case', () => {
    expect(toTitleCase('interlockManagementSystem')).toEqual('Interlock Management System');
    expect(toTitleCase('dateOfBirth')).toEqual('Date of Birth');
    expect(toTitleCase('isEmployee')).toEqual('Is Employee');
    expect(toTitleCase('deviceModel')).toEqual('Device Model');
    expect(toTitleCase('manufacturerName')).toEqual('Manufacturer Name');

    expect(toTitleCase('toTheMoon')).toEqual('To the Moon');
    expect(toTitleCase('theCar')).toEqual('The Car');
    expect(toTitleCase('personOf')).toEqual('Person Of');
    expect(toTitleCase('toAndFrom')).toEqual('To and From');
    expect(toTitleCase('thisShouldWorkJustFine')).toEqual('This Should Work Just Fine');

    expect(toTitleCase('to the moon')).toEqual('To the Moon');
    expect(toTitleCase('the car')).toEqual('The Car');
    expect(toTitleCase('person of')).toEqual('Person Of');
    expect(toTitleCase('to and from')).toEqual('To and From');
    expect(toTitleCase('this should work just fine')).toEqual('This Should Work Just Fine');
    expect(toTitleCase('This is a test')).toEqual('This Is a Test');

    expect(toTitleCase('to The moon')).toEqual('To the Moon');
    expect(toTitleCase('to And from')).toEqual('To and From');
    expect(toTitleCase('this Should Work just fine')).toEqual('This Should Work Just Fine');
  });
});
