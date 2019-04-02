import { createComponentGenerator } from '../helpers';
import { createLinkToRecord } from '../../../src/global/mixins';
import SmartTable from '../../../src/components/smart-table.vue';
import BlockTableBody from '../../../src/components/block-tableBody.vue';
import BlockTableHeading from '../../../src/components/block-tableHeading.vue';
import BlockActionContainer from '../../../src/components/block-actionContainer.vue';

const mountSmartTable = createComponentGenerator(SmartTable, { stubs: ['router-link'] });

const mountSmartTableWithCustomActions = createComponentGenerator(SmartTable, {
  stubs: ['router-link'],
  scopedSlots: {
    'action-container':
      `<div class="custom-action" slot-scope="{ getActionPath, itemId, context }">
        <a class="custom-action--edit" :href="getActionPath(context, 'edit', itemId)">Edit</a>
        <a class="custom-action--delete" :href="getActionPath(context, 'delete', itemId)">Delete</a>
        <a class="custom-action--details" :href="getActionPath(context, 'details', itemId)">Details</a>
       </div>`,
  },
});

const defaultContext = 'test';

const propsToLink = {
  name: createLinkToRecord({
    linkContext: 'person',
    linkAction: 'edit',
    destinationTable: [
      { id: 1, name: 'James', code: 'dummy' },
      { id: 2, name: 'test', code: 'dummy' },
    ],
    destinationLookupKey: 'name',
    destinationIdKey: 'id',
  }),
};

const tableData = [
  {
    id: 1,
    name: 'James',
    age: 25,
    birthday: new Date(),
    isEmployee: true,
  },
  {
    id: 2,
    name: 'test2',
    age: 25,
    birthday: new Date(),
    isEmployee: true,
  },
  {
    id: 3,
    name: 'test3',
    age: 25,
    birthday: new Date(),
    isEmployee: true,
  },
  {
    id: 4,
    name: 'test1',
    age: 25,
    birthday: new Date(),
    isEmployee: true,
  },
];

const dataWithCustomId = [
  { personId: 1, name: 'James', age: 25 },
  { personId: 2, name: 'test2', age: 25 },
  { personId: 3, name: 'test3', age: 25 },
  { personId: 4, name: 'test1', age: 25 },
];

const tableWithNoData = mountSmartTable({
  tableData: [],
  defaultContext,
});

const tableWithData = mountSmartTable({
  tableData,
  defaultContext,
  propsToLink,
});

const tableWithActionContainer = mountSmartTable({
  tableData,
  defaultContext,
  includeActionContainer: true,
});

const tableWithCustomActionContainer = mountSmartTableWithCustomActions({
  tableData,
  defaultContext,
  includeActionContainer: true,
});

const tableWithCustomId = mountSmartTable({
  tableData: dataWithCustomId,
  defaultContext,
  idKey: 'personId',
  includeActionContainer: true,
});

describe('smart-table.vue', () => {
  it('displays a notification that there is no table data if tableData is empty', () => {
    const message = tableWithNoData.find('[class^=bit-message]');
    expect(message.exists()).toBeTruthy();
  });

  it('does not display the table if tableData is empty', () => {
    const table = tableWithNoData.find('.smart-table');
    expect(table.exists()).toBeFalsy();
  });

  it('renders a heading for each key found in the data, excluding the id column', () => {
    const expectedHeadings = ['Name', 'Age', 'Birthday', 'Is Employee'];

    const renderedHeadings = tableWithData.findAll('.smart-table--heading > .smart-table--link');

    renderedHeadings.wrappers.every((renderedHeading, idx) => {
      expect(renderedHeading.text()).toEqual(expectedHeadings[idx]);
      return true;
    });
  });

  it('passes table keys, any unsearchable headings, sort by method, and includeActionContainer flag to block-tableHeading', () => {
    const tableHeading = tableWithData.find(BlockTableHeading);

    expect(tableHeading.props('tableHeadings')).toEqual(['name', 'age', 'birthday', 'isEmployee']);
    expect(tableHeading.props('unsearchableHeadings')).toEqual([]);
    expect(tableHeading.props('sortMethod')).not.toBeNull();
    expect(tableHeading.props('includeActionContainer')).toBeFalsy();
  });

  it('excludes the action container by default', () => {
    const actionContainer = tableWithData.find('.block-actionContainer');

    expect(actionContainer.exists()).toBeFalsy();
  });

  it('includes the action container if specified', () => {
    const actionContainer = tableWithActionContainer.find('.block-actionContainer');

    expect(actionContainer.exists()).toBeTruthy();
  });

  it('renders a default action container with edit, delete, and details actions', () => {
    const actionContainer = tableWithActionContainer.find('.block-actionContainer');

    const editBtn = actionContainer.find('.smart-table--edit');
    const deleteBtn = actionContainer.find('.smart-table--delete');
    const detailsBtn = actionContainer.find('.smart-table--details');

    expect(editBtn.attributes('to')).toEqual('/test/edit/1');
    expect(deleteBtn.attributes('to')).toEqual('/test/delete/1');
    expect(detailsBtn.attributes('to')).toEqual('/test/details/1');
  });

  it('allows a custom action container to be specified', () => {
    const customActionContainer = tableWithCustomActionContainer.find('.block-actionContainer');

    const editBtn = customActionContainer.find('.custom-action--edit');
    const deleteBtn = customActionContainer.find('.custom-action--delete');
    const detailsBtn = customActionContainer.find('.custom-action--details');

    expect(editBtn.attributes('href')).toEqual('/test/edit/1');
    expect(deleteBtn.attributes('href')).toEqual('/test/delete/1');
    expect(detailsBtn.attributes('href')).toEqual('/test/details/1');
  });

  it('passes typed data, table keys, default context, and "propsToLink" properties to table body', () => {
    const tableBody = tableWithData.find(BlockTableBody);
    const tableKeys = ['name', 'age', 'birthday', 'isEmployee'];

    expect(tableBody.props('typedData').length).toEqual(Object.keys(tableData).length);
    expect(tableBody.props('dataKeys')).toEqual(tableKeys);
    expect(tableBody.props('defaultContext')).toEqual(defaultContext);
    expect(tableBody.props('includeActionContainer')).toEqual(false);
    expect(tableBody.props('propsToLink')).toEqual(propsToLink);
  });

  it('sorts the data when a column is clicked', () => {
    const sortBtns = tableWithData.findAll('.smart-table--link');

    const nameSortBtn = sortBtns.wrappers.find(sortBtn => sortBtn.text() === 'Name');

    function gatherName(accumulator, person) {
      return [
        ...accumulator,
        person.name,
      ];
    }

    nameSortBtn.trigger('click');
    let names = tableWithData.vm.localData.reduce(gatherName, []);
    expect(names).toEqual(['James', 'test1', 'test2', 'test3']);

    nameSortBtn.trigger('click');
    names = tableWithData.vm.localData.reduce(gatherName, []);
    expect(names).toEqual(['test3', 'test2', 'test1', 'James']);
  });

  it('allows a specified property to be treated as the id', () => {
    const editLink = tableWithCustomId.find('.smart-table--edit');
    const blockActionContainer = tableWithCustomId.find(BlockActionContainer);

    expect(editLink.attributes('to')).toEqual('/test/edit/1');
    expect(blockActionContainer.props('itemId')).toEqual(1);
  });
});
