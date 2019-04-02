import { mount } from '@vue/test-utils';

import { createComponentGenerator, Click } from '../helpers';
import StackSearchableTable from '../../../src/components/stack-searchableTable.vue';
import SmartTable from '../../../src/components/smart-table.vue';
import SmartSearch from '../../../src/components/smart-search.vue';
import BitPaging from '../../../src/components/bit-paging.vue';
import ModelType from '../../../src/global/constants/ModelType';
import { smartSearch, smartTable } from '../../../src/components/props';

// Get all search props except for onSubmit, onReset,
// and value, which stack-searchableTable overrides
const {
  onSubmit,
  onReset,
  value,
  ...smartSearchProps
} = smartSearch;

const {
  onSort,
  ...smartTableProps
} = smartTable;

const searchContent = '<div class="search-content">Test</div>';

const tableContent = `
  <template slot="table-action" slot-scope="{ getActionPath, itemId, context }">
    <p class="table-content">{{getActionPath(context, 'edit', itemId)}}</p>
  </template>
`;

const mountStackSearchableTable = createComponentGenerator(StackSearchableTable, {
  stubs: ['router-link'],
  slots: {
    'search-action': searchContent,
  },
  scopedSlots: {
    'table-action': tableContent,
  },
});

const positions = ['ITS3', 'ITS4', 'ITS5'];

const tableData = [
  {
    personId: 1,
    name: 'Person 1',
    age: 25,
    isEmployee: true,
    hireDate: new Date('01/01/2001'),
    phoneNumber: '(360) 123-4567',
    position: 'ITS4',
    ignoredField: 'data',
  },
  {
    personId: 2,
    name: 'Person 2',
    age: 26,
    isEmployee: false,
    hireDate: new Date('01/01/2002'),
    phoneNumber: '(360) 223-4567',
    position: 'ITS5',
    ignoredField: 'data',
  },
  {
    personId: 3,
    name: 'Person 3',
    age: 27,
    isEmployee: true,
    hireDate: new Date('01/01/2003'),
    phoneNumber: '(360) 323-4567',
    position: 'ITS3',
    ignoredField: 'data',
  },
  {
    personId: 4,
    name: 'Person 4',
    age: 28,
    isEmployee: false,
    hireDate: new Date('01/01/2004'),
    phoneNumber: '(360) 423-4567',
    position: 'ITS3',
    ignoredField: 'data',
  },
  {
    personId: 5,
    name: 'Person 5',
    age: 29,
    isEmployee: true,
    hireDate: new Date('01/01/2005'),
    phoneNumber: '(360) 523-4567',
    position: 'ITS4',
    ignoredField: 'data',
  },
  {
    personId: 6,
    name: 'Person 6',
    age: 30,
    isEmployee: false,
    hireDate: new Date('01/01/2006'),
    phoneNumber: '(360) 623-4567',
    position: 'ITS5',
    ignoredField: 'data',
  },
];

const defaultContext = 'person';
const unsearchableHeadings = ['isEmployee'];
const includeActionContainer = true;
const ignoreFields = ['ignoredField'];
const propsToLink = {};
const tableEmptyMessage = 'Sorry, this is a test.';
const idKey = 'personId';

const tableProps = {
  tableData,
  defaultContext,
  unsearchableHeadings,
  includeActionContainer,
  ignoreFields,
  propsToLink,
  tableEmptyMessage,
  idKey,
};

const searchModel = {
  name: String,
  age: Number,
  isEmployee: Boolean,
  hireDate: Date,
  phoneNumber: ModelType.PhoneNumber(),
  position: positions,
};

const multipleSearchModel = {
  namePosition: {
    name: String,
    position: positions,
  },
  agePhone: {
    age: Number,
    phoneNumber: ModelType.PhoneNumber(),
  },
  employeeHireDate: {
    isEmployee: Boolean,
    hireDate: Date,
  },
};

const searchModelWithoutBoolean = {
  name: String,
  age: Number,
  hireDate: Date,
  phoneNumber: ModelType.PhoneNumber(),
  position: positions,
};

const searchProps = {
  searchModel,
};

const resultsPerPage = 5;

const stackSearchableTableWithoutCheckbox = mountStackSearchableTable({
  ...tableProps,
  ...searchProps,
  searchModel: searchModelWithoutBoolean,
  resultsPerPage: 10,
});

const stackSearchableTable = mountStackSearchableTable({
  ...tableProps,
  ...searchProps,
  resultsPerPage,
});

const searchableTableWithMultipleSearch = mountStackSearchableTable({
  ...tableProps,
  searchModel: multipleSearchModel,
  resultsPerPage,
});

const table = stackSearchableTable.find(SmartTable);

const search = stackSearchableTable.find(SmartSearch);

const bitPaging = stackSearchableTable.find(BitPaging);

function clickSearchOption(optionName, searchableTable) {
  const filter = searchableTable.find(`.smart-search--filterList option[value=${optionName}]`);

  filter.trigger('change');
}

function setInputValue(input, inputValue) {
  if (typeof inputValue === 'boolean') {
    Click(input);
  } else if (Array.isArray(inputValue)) {
    const [selectValue] = inputValue;

    const option = input.find(`option[value="${selectValue}"]`);

    option.trigger('change');
  } else {
    input.setValue(inputValue);
  }
}

function clickSearchOptionAndSetValue(optionName, searchableTable, searchData) {
  clickSearchOption(optionName, searchableTable);

  const inputWrapper = searchableTable.find('.smart-search--searchField');

  const input = inputWrapper.find('.bit-input--field');

  setInputValue(input, searchData);
}

function clickSearchOptionAndSetMultipleValue(optionName, searchableTable, searchValues) {
  clickSearchOption(optionName, searchableTable);

  const inputs = searchableTable.findAll('.smart-search--searchField .bit-input--field');

  setInputValue(inputs.at(0), searchValues[0]);
  setInputValue(inputs.at(1), searchValues[1]);
}

describe('stack-searchableTable.vue', () => {
  it('passes all available smart-table props into a smart-table component', () => {
    expect(table.props('tableData')).toEqual(tableData.slice(0, resultsPerPage));
    expect(table.props('defaultContext')).toEqual(defaultContext);
    expect(table.props('unsearchableHeadings')).toEqual(unsearchableHeadings);
    expect(table.props('includeActionContainer')).toEqual(includeActionContainer);
    expect(table.props('ignoreFields')).toEqual(ignoreFields);
    expect(table.props('propsToLink')).toEqual(propsToLink);
    expect(table.props('tableEmptyMessage')).toEqual(tableEmptyMessage);
    expect(table.props('idKey')).toEqual(idKey);

    const smartTableComponentProps = Object.keys(smartTableProps);
    const testedSmartTableProps = Object.keys(tableProps);

    smartTableComponentProps.every((prop) => {
      const result = testedSmartTableProps.find(tableProp => tableProp === prop);

      expect(result, `Smart table prop "${prop}" maybe not be included in stack-searchableTable. Please test for this.`).not.toBeUndefined();
      return true;
    });
  });

  it('passes all available smart-search props into a smart-search component', () => {
    expect(search.props('searchModel')).toEqual(searchModel);

    const smartSearchComponentProps = Object.keys(smartSearchProps);
    const testedSmartSearchProps = Object.keys(searchProps);

    smartSearchComponentProps.every((prop) => {
      const result = testedSmartSearchProps.find(searchProp => searchProp === prop);

      expect(result, `Smart search prop "${prop}" maybe not be included in stack-searchableTable. Please test for this.`).not.toBeUndefined();
      return true;
    });
  });

  it('allows smart-search slot content to be passed in', () => {
    const searchAction = stackSearchableTable.find('.search-content');

    expect(searchAction.exists()).toEqual(true);
  });

  it('allows smart-table slot content to be passed in with the appropriate default', () => {
    const tableActionContainer = stackSearchableTable.find('.table-content');

    expect(tableActionContainer.html()).toEqual('<p class="table-content">/person/edit/1</p>');

    const defaultActionSearchableTableGenerator = createComponentGenerator(StackSearchableTable, {
      stubs: ['router-link'],
    });

    const searchableTableWithDefaultAction = defaultActionSearchableTableGenerator({
      ...searchProps,
      ...tableProps,
    });

    const actionContainer = searchableTableWithDefaultAction.find('router-link-stub');

    expect(actionContainer.attributes('to')).toEqual('/person/edit/1');
  });

  it('pages the data with the specified number of results per page', () => {
    expect(bitPaging.props('pagedDataLength')).toEqual(2);
  });

  it('renders a bit-paging element to keep track of paging', () => {
    expect(bitPaging.props('value')).toEqual(stackSearchableTable.vm.pageIdx);
  });

  it('yields the correct results when string criteria is set', () => {
    // VALID TEST 1
    clickSearchOptionAndSetValue('name', stackSearchableTableWithoutCheckbox, 'Person 1');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[0]]);

    // // VALID TEST 2
    clickSearchOptionAndSetValue('name', stackSearchableTableWithoutCheckbox, 'Person 6');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[5]]);

    // VALID TEST 3
    clickSearchOptionAndSetValue('name', stackSearchableTableWithoutCheckbox, 'Person');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);

    // INVALID TEST
    clickSearchOptionAndSetValue('name', stackSearchableTableWithoutCheckbox, 'bad data');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    clickSearchOptionAndSetValue('name', stackSearchableTableWithoutCheckbox, '');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when number criteria is set', () => {
    // VALID TEST 1
    clickSearchOptionAndSetValue('age', stackSearchableTableWithoutCheckbox, 29);
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[4]]);

    // VALID TEST 2
    clickSearchOptionAndSetValue('age', stackSearchableTableWithoutCheckbox, 25);
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[0]]);

    // VALID TEST 3
    clickSearchOptionAndSetValue('age', stackSearchableTableWithoutCheckbox, 27);
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[2]]);

    // INVALID TEST
    clickSearchOptionAndSetValue('age', stackSearchableTableWithoutCheckbox, 7832);
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    clickSearchOptionAndSetValue('age', stackSearchableTableWithoutCheckbox, null);
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when boolean criteria is set', () => {
    // VALID TEST 1
    clickSearchOptionAndSetValue('isEmployee', stackSearchableTable, true);
    expect(stackSearchableTable.vm.currentPage).toEqual([tableData[0], tableData[2], tableData[4]]);

    // VALID TEST 2
    clickSearchOptionAndSetValue('isEmployee', stackSearchableTable, false);
    expect(stackSearchableTable.vm.currentPage).toEqual([tableData[1], tableData[3], tableData[5]]);
  });

  it('yields the correct results when date criteria is set', () => {
    // VALID TEST 1
    clickSearchOptionAndSetValue('hireDate', stackSearchableTableWithoutCheckbox, '01/01/2001');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[0]]);

    // VALID TEST 2
    clickSearchOptionAndSetValue('hireDate', stackSearchableTableWithoutCheckbox, '01/01/2002');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[1]]);

    // VALID TEST 3
    clickSearchOptionAndSetValue('hireDate', stackSearchableTableWithoutCheckbox, '01/01/2003');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[2]]);

    // INVALID TEST
    clickSearchOptionAndSetValue('hireDate', stackSearchableTableWithoutCheckbox, '09/09/1999');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    clickSearchOptionAndSetValue('hireDate', stackSearchableTableWithoutCheckbox, '');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when phone # criteria is set', () => {
    // VALID TEST 1
    clickSearchOptionAndSetValue('phoneNumber', stackSearchableTableWithoutCheckbox, '(360) 223-4567');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[1]]);

    // VALID TEST 2
    clickSearchOptionAndSetValue('phoneNumber', stackSearchableTableWithoutCheckbox, '(360) 523-4567');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[4]]);

    // VALID TEST 3
    clickSearchOptionAndSetValue('phoneNumber', stackSearchableTableWithoutCheckbox, '(360) 623-4567');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[5]]);

    // INVALID TEST
    clickSearchOptionAndSetValue('phoneNumber', stackSearchableTableWithoutCheckbox, '(360) 999-9999');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    clickSearchOptionAndSetValue('phoneNumber', stackSearchableTableWithoutCheckbox, '');

    const inputWrapper = stackSearchableTableWithoutCheckbox.find('.smart-search--searchField');

    const input = inputWrapper.find('.bit-input--field');

    // Simulate the user clicking outside of the phone input
    input.trigger('blur');

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when array criteria is set', () => {
    clickSearchOption('position', stackSearchableTableWithoutCheckbox);

    const selectWrapper = stackSearchableTableWithoutCheckbox.find('.smart-search--searchField');

    const positionInput = selectWrapper.find('.bit-input--field');
    const options = positionInput.findAll('option:not([disabled])');

    // VALID TEST 1
    const firstOption = options.wrappers[0];

    firstOption.trigger('change');
    expect(stackSearchableTableWithoutCheckbox.vm.currentPage)
      .toEqual([tableData[2], tableData[3]]);

    // VALID TEST 2
    const secondOption = options.wrappers[1];

    secondOption.trigger('change');

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage)
      .toEqual([tableData[0], tableData[4]]);

    // VALID TEST 3
    const thirdOption = options.wrappers[2];

    thirdOption.trigger('change');

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage)
      .toEqual([tableData[1], tableData[5]]);
  });

  it('yields the correct results when multiple criteria are set', () => {
    clickSearchOptionAndSetMultipleValue('namePosition', searchableTableWithMultipleSearch, ['Person 1', ['ITS4']]);
    expect(searchableTableWithMultipleSearch.vm.currentPage).toEqual([tableData[0]]);

    clickSearchOptionAndSetMultipleValue('agePhone', searchableTableWithMultipleSearch, [28, '3604234567']);
    expect(searchableTableWithMultipleSearch.vm.currentPage).toEqual([tableData[3]]);

    clickSearchOptionAndSetMultipleValue('employeeHireDate', searchableTableWithMultipleSearch, [true, '01/01/2005']);
    expect(searchableTableWithMultipleSearch.vm.currentPage).toEqual([tableData[4]]);
  });

  it('limits the number of results to the specified number of results per page', () => {
    const freshStackSearchableTable = mountStackSearchableTable({
      ...tableProps,
      ...searchProps,
      searchModel: searchModelWithoutBoolean,
      resultsPerPage: 10,
    });

    const resultsPerPageInput = freshStackSearchableTable.find('.stack-searchableTable--resultsPerPage .bit-input--field');

    // Limit results to one result per page
    resultsPerPageInput.setValue(1);

    expect(freshStackSearchableTable.vm.currentPage.length).toEqual(1);
    expect(freshStackSearchableTable.vm.currentPage).toEqual([tableData[0]]);

    const nextPageBtn = freshStackSearchableTable.find('.bit-paging--next');
    Click(nextPageBtn);

    expect(freshStackSearchableTable.vm.currentPage).toEqual([tableData[1]]);
  });

  it('renders correctly when data is loaded asynchronously', (done) => {
    const secondsToWaitForData = 1;

    const testTableData = [{
      personId: 1,
      name: 'Test',
      age: 25,
    }];

    const patientTableWrapper = mount({
      components: {
        StackSearchableTable,
      },
      template: `<stack-searchable-table :table-data="currentTableData"
                                         default-context="test"
                                         :search-model="searchModel" />`,
      data() {
        return {
          tableData: [],
          searchModel,
        };
      },
      computed: {
        currentTableData() {
          return this.tableData;
        },
      },
      mounted() {
        setTimeout(() => {
          this.tableData = testTableData;
        }, secondsToWaitForData * 1000);
      },
    });

    const patientTable = patientTableWrapper.find(SmartTable);

    // Check if changing the parent data caused the child to update
    setTimeout(() => {
      expect(patientTable.vm.tableData).toEqual(testTableData);

      done();
    }, (secondsToWaitForData + 1) * 1000);
  });

  it('forces the table data to go back to page one if the number of results per page have changed', () => {
    const freshStackSearchableTable = mountStackSearchableTable({
      ...tableProps,
      ...searchProps,
      searchModel: searchModelWithoutBoolean,
      resultsPerPage: 10,
    });

    const resultsPerPageInput = freshStackSearchableTable.find('.stack-searchableTable--resultsPerPage .bit-input--field');

    // Limit results to one result per page
    resultsPerPageInput.setValue(1);

    // Click the next page button
    const nextPageBtn = freshStackSearchableTable.find('.bit-paging--next');
    Click(nextPageBtn);

    // Change results per page
    resultsPerPageInput.setValue(1);

    // Current page should have gone back to initial page
    expect(freshStackSearchableTable.vm.currentPage).toEqual([tableData[0]]);
  });

  it('sorts data accross all pages when sort column is clicked', () => {
    const freshStackSearchableTable = mountStackSearchableTable({
      ...tableProps,
      ...searchProps,
      searchModel: searchModelWithoutBoolean,
      resultsPerPage: 10,
    });

    // Limit results to two per page
    const resultsPerPageInput = freshStackSearchableTable.find('.stack-searchableTable--resultsPerPage .bit-input--field');
    resultsPerPageInput.setValue(2);

    // Click "position" sort button
    const positionSortButton = freshStackSearchableTable.find('.smart-table--sortByPosition');
    Click(positionSortButton);

    // Check to see that the two records rendered are correct
    expect(freshStackSearchableTable.vm.currentPage).toEqual([
      tableData[2],
      tableData[3],
    ]);

    // Click "name" sort button
    const nameSortButton = freshStackSearchableTable.find('.smart-table--sortByName');
    Click(nameSortButton);

    // Check to see that the two records rendered are correct
    expect(freshStackSearchableTable.vm.currentPage).toEqual([
      tableData[0],
      tableData[1],
    ]);
  });
});
