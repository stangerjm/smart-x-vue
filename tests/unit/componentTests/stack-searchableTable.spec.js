import { createComponentGenerator, Click } from '../helpers';
import StackSearchableTable from '../../../src/components/stack-searchableTable.vue';
import SmartTable from '../../../src/components/smart-table.vue';
import SmartSearch from '../../../src/components/smart-search.vue';
import BitPaging from '../../../src/components/bit-paging.vue';
import ModelType from '../../../src/global/constants/ModelType';
import { smartSearch, smartTable } from '../../../src/components/props';

// Get all search props except for onSubmit, which stack-searchableTable overrides
const { onSubmit, ...smartSearchProps } = smartSearch;

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

const searchModelWithoutBoolean = {
  name: String,
  age: Number,
  hireDate: Date,
  phoneNumber: ModelType.PhoneNumber(),
  position: positions,
};

const searchTitle = 'Test Search';
const isExpanded = true;
const searchBtnSize = 'large';
const searchBtnText = 'Test';

const searchProps = {
  searchModel,
  searchTitle,
  isExpanded,
  searchBtnSize,
  searchBtnText,
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

const table = stackSearchableTable.find(SmartTable);

const search = stackSearchableTable.find(SmartSearch);

const bitPaging = stackSearchableTable.find(BitPaging);

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

    const smartTableComponentProps = Object.keys(smartTable);
    const testedSmartTableProps = Object.keys(tableProps);

    smartTableComponentProps.every((prop) => {
      const result = testedSmartTableProps.find(tableProp => tableProp === prop);

      expect(result, `Smart table prop "${prop}" maybe not be included in stack-searchableTable. Please test for this.`).not.toBeUndefined();
      return true;
    });
  });

  it('passes all available smart-search props into a smart-search component', () => {
    expect(search.props('searchModel')).toEqual({ ...searchModel, ResultsPerPage: Number });
    expect(search.props('searchTitle')).toEqual(searchTitle);
    expect(search.props('isExpanded')).toEqual(isExpanded);
    expect(search.props('searchBtnSize')).toEqual(searchBtnSize);
    expect(search.props('searchBtnText')).toEqual(searchBtnText);

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
    const nameInput = stackSearchableTableWithoutCheckbox.find('.bit-input--field[name=name]');
    const submitBtn = stackSearchableTableWithoutCheckbox.find('.smart-form--button');

    // VALID TEST 1
    nameInput.setValue('Person 1');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[0]]);

    // VALID TEST 2
    nameInput.setValue('Person 6');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[5]]);

    // VALID TEST 3
    nameInput.setValue('Person');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);

    // INVALID TEST
    nameInput.setValue('bad data');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    nameInput.setValue('');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when number criteria is set', () => {
    const ageInput = stackSearchableTableWithoutCheckbox.find('.bit-input--field[name=age]');
    const submitBtn = stackSearchableTableWithoutCheckbox.find('.smart-form--button');

    // VALID TEST 1
    ageInput.setValue(29);
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[4]]);

    // VALID TEST 2
    ageInput.setValue(25);
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[0]]);

    // VALID TEST 3
    ageInput.setValue(27);
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[2]]);

    // INVALID TEST
    ageInput.setValue(1859);
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    ageInput.setValue(null);
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when boolean criteria is set', () => {
    const isEmployeeInput = stackSearchableTable.find('.bit-input--field[name=isEmployee]');
    const submitBtn = stackSearchableTable.find('.smart-form--button');

    // VALID TEST 1
    Click(isEmployeeInput);
    Click(submitBtn);

    expect(stackSearchableTable.vm.currentPage).toEqual([tableData[0], tableData[2], tableData[4]]);

    // VALID TEST 2
    Click(isEmployeeInput);
    Click(submitBtn);

    expect(stackSearchableTable.vm.currentPage).toEqual([tableData[1], tableData[3], tableData[5]]);
  });

  it('yields the correct results when date criteria is set', () => {
    const dateInput = stackSearchableTableWithoutCheckbox.find('.bit-input--field[name=hireDate]');
    const submitBtn = stackSearchableTableWithoutCheckbox.find('.smart-form--button');

    // VALID TEST 1
    dateInput.setValue('01/01/2001');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[0]]);

    // VALID TEST 2
    dateInput.setValue('01/01/2002');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[1]]);

    // VALID TEST 3
    dateInput.setValue('01/01/2003');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[2]]);

    // INVALID TEST
    dateInput.setValue('09/09/1999');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR
    dateInput.setValue('');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when phone # criteria is set', () => {
    const phoneInput = stackSearchableTableWithoutCheckbox.find('.bit-input--field[name=phoneNumber]');
    const submitBtn = stackSearchableTableWithoutCheckbox.find('.smart-form--button');

    // VALID TEST 1
    phoneInput.setValue('(360) 223-4567');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[1]]);

    // VALID TEST 2
    phoneInput.setValue('(360) 523-4567');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[4]]);

    // VALID TEST 3
    phoneInput.setValue('(360) 623-4567');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([tableData[5]]);

    // INVALID TEST
    phoneInput.setValue('(360) 999-9999');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([]);

    // CLEAR

    // simulate blur event when focus is set to button on click
    phoneInput.setValue('');
    phoneInput.trigger('blur');

    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage).toEqual([...tableData]);
  });

  it('yields the correct results when array criteria is set', () => {
    const positionInput = stackSearchableTableWithoutCheckbox.find('.bit-input--field[name=position]');
    const options = positionInput.findAll('option:not([disabled])');
    const submitBtn = stackSearchableTableWithoutCheckbox.find('.smart-form--button');

    // VALID TEST 1
    const firstOption = options.wrappers[0];

    firstOption.trigger('input');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage)
      .toEqual([tableData[2], tableData[3]]);

    // VALID TEST 2
    const secondOption = options.wrappers[1];

    secondOption.trigger('input');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage)
      .toEqual([tableData[0], tableData[4]]);

    // VALID TEST 3
    const thirdOption = options.wrappers[2];

    thirdOption.trigger('input');
    Click(submitBtn);

    expect(stackSearchableTableWithoutCheckbox.vm.currentPage)
      .toEqual([tableData[1], tableData[5]]);
  });

  it('yields the correct results when multiple criteria are set', () => {
    const submitBtn = stackSearchableTable.find('.smart-form--button');
    const isEmployeeInput = stackSearchableTable.find('.bit-input--field[name=isEmployee]');
    const nameInput = stackSearchableTable.find('.bit-input--field[name=name]');
    const ageInput = stackSearchableTable.find('.bit-input--field[name=age]');
    const dateInput = stackSearchableTable.find('.bit-input--field[name=hireDate]');
    const phoneInput = stackSearchableTable.find('.bit-input--field[name=phoneNumber]');
    const positionInput = stackSearchableTable.find('.bit-input--field[name=position]');
    const options = positionInput.findAll('option:not([disabled])');

    function searchForAndCheckData({
      name = '',
      age = null,
      isEmployee = false,
      hireDate = '',
      phoneNumber = '',
      positionIndex = 0,
      expectedData = [],
    }) {
      // Set name input
      nameInput.setValue(name);

      // Set age input
      ageInput.setValue(age);

      // Synchronize isEmployeeInput with isEmployee parameter
      if (isEmployee !== isEmployeeInput.element.checked) {
        Click(isEmployeeInput);
      }

      // Set hire date
      dateInput.setValue(hireDate);

      // Set phone input
      phoneInput.setValue(phoneNumber);

      // Select option at passed-in index
      options.wrappers[positionIndex].trigger('input');

      // Submit
      Click(submitBtn);

      // Check result
      expect(stackSearchableTable.vm.currentPage).toEqual([expectedData]);
    }

    searchForAndCheckData({
      name: 'Person 1',
      age: 25,
      isEmployee: true,
      hireDate: '01/01/2001',
      phoneNumber: '(360) 123-4567',
      positionIndex: 1,
      expectedData: tableData[0],
    });

    searchForAndCheckData({
      name: 'Person 2',
      age: 26,
      isEmployee: false,
      hireDate: '01/01/2002',
      phoneNumber: '(360) 223-4567',
      positionIndex: 2,
      expectedData: tableData[1],
    });

    searchForAndCheckData({
      name: 'Person 3',
      age: 27,
      isEmployee: true,
      hireDate: '01/01/2003',
      phoneNumber: '(360) 323-4567',
      positionIndex: 0,
      expectedData: tableData[2],
    });

    searchForAndCheckData({
      name: 'Person 4',
      age: 28,
      isEmployee: false,
      hireDate: '01/01/2004',
      phoneNumber: '(360) 423-4567',
      positionIndex: 0,
      expectedData: tableData[3],
    });

    searchForAndCheckData({
      name: 'Person 5',
      age: 29,
      isEmployee: true,
      hireDate: '01/01/2005',
      phoneNumber: '(360) 523-4567',
      positionIndex: 1,
      expectedData: tableData[4],
    });

    searchForAndCheckData({
      name: 'Person 6',
      age: 30,
      isEmployee: false,
      hireDate: '01/01/2006',
      phoneNumber: '(360) 623-4567',
      positionIndex: 2,
      expectedData: tableData[5],
    });
  });

  it('limits the number of results to the specified number of results per page', () => {
    const freshStackSearchableTable = mountStackSearchableTable({
      ...tableProps,
      ...searchProps,
      searchModel: searchModelWithoutBoolean,
      resultsPerPage: 10,
    });

    const nameInput = freshStackSearchableTable.find('.bit-input--field[name=name]');
    const resultsPerPageInput = freshStackSearchableTable.find('.bit-input--field[name=ResultsPerPage]');
    const submitBtn = freshStackSearchableTable.find('.smart-form--button');

    // Set search criteria to include multiple results
    nameInput.setValue('Person');

    // Limit results to one result per page
    resultsPerPageInput.setValue(1);

    Click(submitBtn);

    expect(freshStackSearchableTable.vm.currentPage.length).toEqual(1);
    expect(freshStackSearchableTable.vm.currentPage).toEqual([tableData[0]]);

    const nextPageBtn = freshStackSearchableTable.find('.bit-paging--next');
    Click(nextPageBtn);

    expect(freshStackSearchableTable.vm.currentPage).toEqual([tableData[1]]);
  });

  it('renders correctly when data is loaded asynchronously', () => {
    const patientSearchableTable = mountStackSearchableTable({
      ...tableProps,
      ...searchProps,
      resultsPerPage,
      // Ensure table data is empty to begin with
      tableData: [],
    });

    const testTableData = [{
      personId: 1,
      name: 'Test',
      age: 25,
    }];

    // Change table data to test if change will cause re-render
    patientSearchableTable.vm.tableData = testTableData;

    // Find the actual table to test the re-render
    const patientSmartTable = patientSearchableTable.find(SmartTable);

    // Check if changing the parent data caused the child to update
    expect(patientSmartTable.vm.tableData).toEqual(testTableData);
  });
});
