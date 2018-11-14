import { toTitleCase } from '../../../src/global/mixins';

describe('toTitleCase.js', () => {
  it('converts a camel case string to title case', () => {
    expect(toTitleCase('thisIsATest')).toEqual('This Is A Test');
  });
});
