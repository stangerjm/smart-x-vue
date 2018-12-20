import { parseDateString } from '../../../src/global/mixins';

describe('parseDateString.js', () => {
  it('parses supported date strings into date objects', () => {
    const dates = {
      /**
       * Supported formats
       */
      utcDate: new Date('01/01/2001').toUTCString(),
      isoDate: new Date('01/01/2001').toISOString(),
      dotNetMVCJsonDate: '/Date(1541539613000)',
      dotNetAPIJsonDate: '2002-02-02T00:00:00',
      validDateString: '01/01/2001',
      /**
       * Unsupported / ignored formats
       */
      dateObject: new Date('01/01/2001'),
      dateToString: new Date('11/13/2018').toString(),
      invalidDateString: '01-01-2001',
      wordThenNumber: 'Device 21',
      stringLikeYear: '2001',
      numberLikeYear: 2001,
      numberLikeDate: 1541539613000,
      stringLikeYearThenWords: '2014 units of paper',
      wordsThenStringLikeYear: 'more words 2014',
    };

    const expectedDates = {
      /**
       * Supported formats
       */
      utcDate: new Date('01/01/2001'),
      isoDate: new Date('01/01/2001'),
      dotNetMVCJsonDate: new Date(2018, 10, 6, 13, 26, 53),
      dotNetAPIJsonDate: new Date('02/02/2002'),
      validDateString: new Date('01/01/2001'),
      /**
       * Unsupported / ignored formats
       */
      dateObject: null,
      dateToString: null,
      invalidDateString: null,
      wordThenNumber: null,
      stringLikeYear: null,
      numberLikeYear: null,
      numberLikeDate: null,
      stringLikeYearThenWords: null,
      wordsThenStringLikeYear: null,
    };

    Object.entries(dates).every(([key, value]) => {
      expect(parseDateString(value), `Value at: "${key}" did not match the expected format.`).toEqual(expectedDates[key]);
      return true;
    });
  });
});
