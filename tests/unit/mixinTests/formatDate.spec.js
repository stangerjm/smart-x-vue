import { formatDate } from '../../../src/global/mixins';

describe('formatDate.js', () => {
  it('formats a date object into a uniform string', () => {
    expect(formatDate(new Date('01/01/2001'))).toEqual('01/01/2001');
  });

  it('returns an empty string if anything other than a date is passed in', () => {
    expect(formatDate(12345322340)).toEqual('');
    expect(formatDate('01/01/2001')).toEqual('');
    expect(formatDate(true)).toEqual('');
    expect(formatDate({})).toEqual('');
    expect(formatDate([])).toEqual('');
    expect(formatDate(null)).toEqual('');
    expect(formatDate(undefined)).toEqual('');
  });
});
