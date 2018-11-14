import { createLinkToRecord } from '../../../src/global/mixins';

const destinationTable = [
  {
    id: 1,
    name: 'James',
    age: 25,
    birthday: new Date('09/11/1993'),
  },
  {
    id: 2,
    name: 'Test',
    age: 26,
    birthday: new Date('01/01/1992'),
  },
  {
    id: 3,
    name: 'Another',
    age: 27,
    birthday: new Date('01/10/1991'),
  },
  {
    id: 4,
    name: 'Tester',
    age: 28,
    birthday: new Date('05/01/1990'),
  },
  {
    id: 5,
    name: 'Testing',
    age: 29,
    birthday: new Date('01/01/1990'),
  },
];

describe('createLinkToRecord.js', () => {
  it('creates a link to a record in another table', () => {
    const createLink = createLinkToRecord({
      linkContext: 'test',
      linkAction: 'Edit',
      destinationTable,
      destinationLookupKey: 'name',
      destinationIdKey: 'id',
    });

    expect(createLink('James')).toEqual('/test/Edit/1');
    expect(createLink('Test')).toEqual('/test/Edit/2');
    expect(createLink('Another')).toEqual('/test/Edit/3');
    expect(createLink('Tester')).toEqual('/test/Edit/4');
    expect(createLink('Testing')).toEqual('/test/Edit/5');
  });

  it('automatically points to the id field in a table if no value is passed to the "destinationIdKey" parameter', () => {
    const createLink = createLinkToRecord({
      linkContext: 'test',
      linkAction: 'Edit',
      destinationTable,
      destinationLookupKey: 'name',
    });

    expect(createLink('James')).toEqual('/test/Edit/1');
    expect(createLink('Test')).toEqual('/test/Edit/2');
    expect(createLink('Another')).toEqual('/test/Edit/3');
    expect(createLink('Tester')).toEqual('/test/Edit/4');
    expect(createLink('Testing')).toEqual('/test/Edit/5');
  });

  it('builds a blank link if no arguments are passed', () => {
    const createLink = createLinkToRecord();

    expect(createLink('James')).toEqual('/');
  });
});
