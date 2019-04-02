import { generateRandomId } from '../../../src/global/mixins';

describe('generateRandomId.js', () => {
  it('generates a random id', () => {
    expect(generateRandomId()).not.toEqual(generateRandomId());
  });
});
