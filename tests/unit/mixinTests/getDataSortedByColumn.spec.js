import { getDataSortedByColumn } from '../../../src/global/mixins';

describe('getDataSortedByColumn.js', () => {
  it('correctly sorts data based off of a numeric column', () => {
    const data = [{ id: 4 }, { id: 1 }, { id: 3 }, { id: 2 }];

    const sortedDataDescending = [{ id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }];

    const sortedDataAscending = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    expect(getDataSortedByColumn(data, 'id', true)).toEqual(sortedDataDescending);
    expect(getDataSortedByColumn(data, 'id', false)).toEqual(sortedDataAscending);
  });

  it('correctly sorts data based off of an alphabetic column', () => {
    const data = [{ name: 'James' }, { name: 'Kelli' }, { name: 'Jeremy' }, { name: 'Kieth' }];

    const sortedDataDescending = [{ name: 'Kieth' }, { name: 'Kelli' }, { name: 'Jeremy' }, { name: 'James' }];

    const sortedDataAscending = [{ name: 'James' }, { name: 'Jeremy' }, { name: 'Kelli' }, { name: 'Kieth' }];

    expect(getDataSortedByColumn(data, 'name', true)).toEqual(sortedDataDescending);
    expect(getDataSortedByColumn(data, 'name', false)).toEqual(sortedDataAscending);
  });

  it('correctly sorts data based off of a column containing date objects', () => {
    const data = [
      { date: new Date('01/01/2002') },
      { date: new Date('01/01/2003') },
      { date: new Date('01/01/2001') },
      { date: new Date('01/01/2000') },
    ];

    const sortedDataDescending = [
      { date: new Date('01/01/2003') },
      { date: new Date('01/01/2002') },
      { date: new Date('01/01/2001') },
      { date: new Date('01/01/2000') },
    ];

    const sortedDataAscending = [
      { date: new Date('01/01/2000') },
      { date: new Date('01/01/2001') },
      { date: new Date('01/01/2002') },
      { date: new Date('01/01/2003') },
    ];

    expect(getDataSortedByColumn(data, 'date', true)).toEqual(sortedDataDescending);
    expect(getDataSortedByColumn(data, 'date', false)).toEqual(sortedDataAscending);
  });

  it('correctly sorts data based off of a binary column', () => {
    const data = [{ bool: true }, { bool: false }, { bool: true }, { bool: false }];

    const sortedDataDescending = [{ bool: true }, { bool: true }, { bool: false }, { bool: false }];

    const sortedDataAscending = [{ bool: false }, { bool: false }, { bool: true }, { bool: true }];

    expect(getDataSortedByColumn(data, 'bool', true)).toEqual(sortedDataDescending);
    expect(getDataSortedByColumn(data, 'bool', false)).toEqual(sortedDataAscending);
  });
});
