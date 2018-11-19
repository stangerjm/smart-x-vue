import { createViewModel, createLinkToRecord } from '../../../src/global/mixins';
import { createComponentGenerator } from '../helpers';
import BlockTableBody from '../../../src/components/block-tableBody.vue';

const mountBlockTableBody = createComponentGenerator(BlockTableBody, { stubs: ['router-link'] });
const data = [
  {
    id: 1,
    yearsWithWSP: 1,
    hireDate: new Date(),
    position: 'ITS3',
    name: 'James',
  },
  {
    id: 2,
    yearsWithWSP: 5,
    hireDate: new Date(),
    position: 'ITS4',
    name: 'Test',
  },
  {
    id: 3,
    yearsWithWSP: 10,
    hireDate: new Date(),
    position: 'ITS5',
    name: 'Tester',
  },
];

const otherTable = [
  {
    id: 1,
    name: 'James',
    age: 24,
    birthday: new Date(),
  },
  {
    id: 2,
    name: 'Test',
    age: 24,
    birthday: new Date(),
  },
  {
    id: 3,
    name: 'Tester',
    age: 24,
    birthday: new Date(),
  },
];

const typedData = data.map(item => createViewModel(item));
const dataKeys = Object.keys(data[0]).filter(key => key !== 'id');
const defaultContext = 'test';

const tableBody = mountBlockTableBody({
  typedData,
  dataKeys,
  defaultContext,
  propsToLink: {
    name: createLinkToRecord({
      linkContext: 'another',
      linkAction: 'Details',
      destinationLookupKey: 'name',
      destinationTable: otherTable,
      destinationIdKey: 'id',
    }),
  },
});

const tableRows = tableBody.findAll('.smart-table--row');
const tableCellsOfFirstRow = tableRows.wrappers[0]
  .findAll('.smart-table--cell')
  .filter(cell => !cell.find('.block-actionContainer').exists());


describe('block-tableBody.vue', () => {
  it('renders a row for each item in the typedData array', () => {
    expect(tableRows.length).toEqual(Object.keys(data).length);
  });

  it('renders a table cell for each property in each item', () => {
    expect(tableCellsOfFirstRow.length).toEqual(dataKeys.length);
  });

  it('marks a table cell as a key if it is within the first two properties of the main data array', () => {
    tableCellsOfFirstRow.wrappers.every((cell, idx) => {
      if (idx < 2) {
        expect(cell.classes()).toContain('smart-table--key');
        return true;
      }

      expect(cell.classes()).not.toContain('smart-table--key');
      return true;
    });
  });

  it('renders a link in the table cell if the property name is in the "propsToLink" array', () => {
    tableCellsOfFirstRow.wrappers.every((cell) => {
      // Check the name cell.
      // This should be configured above to point to the name property in the "otherTable" above
      if (cell.find('.smart-table--inlineHeading').text().includes('Name')) {
        const link = cell.find('router-link-stub');
        expect(link.attributes('to')).toEqual('/another/Details/1');
        return true;
      }
      return true;
    });
  });

  it('renders an action container if flagged to include actions', () => {
    expect(tableBody.find('.block-actionContainer').exists()).toBeTruthy();

    const tableBodyWithoutActions = mountBlockTableBody({
      typedData,
      dataKeys,
      defaultContext,
      includeActionContainer: false,
    });

    expect(tableBodyWithoutActions.find('.block-actionContainer').exists()).toBeFalsy();
  });

  it('renders an expand button that expands the table cell in a mobile view', () => {
    const firstRow = tableBody.find('.smart-table--row');
    const expandBtn = firstRow.find('.smart-table--expand > .bit-btn-expand');

    // Should not be expanded by default
    expect(firstRow.classes()).not.toContain('record-is-expanded');

    // Should expand when clicked
    expandBtn.trigger('click');
    expect(firstRow.classes()).toContain('record-is-expanded');

    // Should collapsed when clicked again
    expandBtn.trigger('click');
    expect(firstRow.classes()).not.toContain('record-is-expanded');
  });
});
