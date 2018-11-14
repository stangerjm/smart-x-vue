import { getItemId } from '../../../src/global/mixins';

describe('getItemId.js', () => {
  it('gets the id of an object containing an id property', () => {
    const records = {
      id: { id: 1, name: 'James' },
      ID: { ID: 1, name: 'James' },
      Id: { Id: 1, name: 'James' },
      _id: { _id: 1, name: 'James' },
      _ID: { _ID: 1, name: 'James' },
      _Id: { _Id: 1, name: 'James' },
    };

    Object.entries(records).every(([key, record]) => {
      expect(getItemId(record), `getItemId could not find property: "${key}"`).toEqual(1);
      return true;
    });
  });
});
