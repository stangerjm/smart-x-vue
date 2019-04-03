import Vue from 'vue';
import { createComponentGenerator, Click } from '../helpers';
import SmartSearch from '../../../src/components/smart-search.vue';
import BitInput from '../../../src/components/bit-input.vue';
import ModelType from '../../../src/global/constants/ModelType';

const action = '<button type="button" class="content-action">Test</button>';

const mountSmartSearch = createComponentGenerator(SmartSearch, {
  slots: {
    'extra-action': action,
  },
});

const searchModel = {
  initial: String,
  age: Number,
  birthday: Date,
  isEmployee: Boolean,
  phone: ModelType.PhoneNumber(),
  position: ['ITS3', 'ITS4', 'ITS5'],
};

const multipleSearchModel = {
  name: { firstName: String, lastName: String },
  strNum: { string: String, number: Number },
  strBool: { string: String, boolean: Boolean },
  strArr: { string: String, array: [1, 2, 3] },
  strPhone: { string: String, phoneNumber: ModelType.PhoneNumber() },
  strDate: { string: String, date: Date },
  numNum: { number1: Number, number2: Number },
  numBool: { number: Number, boolean: Boolean },
  numArray: { number: Number, array: [1, 2, 3] },
  numPhone: { number: Number, phoneNumber: ModelType.PhoneNumber() },
  numDate: { number: Number, date: Date },
  boolBool: { boolean1: Boolean, boolean2: Boolean },
  boolArray: { boolean: Boolean, array: [1, 2, 3] },
  boolPhone: { boolean: Boolean, phoneNumber: ModelType.PhoneNumber() },
  boolDate: { boolean: Boolean, date: Date },
  arrayArray: { array1: [1, 2, 3], array2: [4, 5, 6] },
  arrayPhone: { array: [1, 2, 3], phoneNumber: ModelType.PhoneNumber() },
  arrayDate: { array: [1, 2, 3], date: Date },
  phonePhone: { phoneNumber1: ModelType.PhoneNumber(), phoneNumber2: ModelType.PhoneNumber() },
  phoneDate: { phoneNumber: ModelType.PhoneNumber(), date: Date },
  dateDate: { date1: Date, date2: Date },
};

let result;
function onSubmit(submittedData) {
  result = submittedData;
}

function onReset() {
  result = {};
}

const smartSearch = mountSmartSearch({
  searchModel,
  onSubmit,
  onReset,
});

const multipleSmartSearch = mountSmartSearch({
  searchModel: multipleSearchModel,
  onSubmit,
  onReset,
});

const missingMultipleSearch = mountSmartSearch({
  searchModel: multipleSearchModel,
  onSubmit,
  onReset,
});

const filterList = smartSearch.find('.smart-search--filterList');

const multipleFilterList = multipleSmartSearch.find('.smart-search--filterList');

/**
 * Finds the option matching the name passed in and clicks it
 * @param {string} optionName - Name of option to find and click
 * @returns {void}
 */
function clickOption(optionName) {
  const filter = filterList.find(`option[value=${optionName}]`);

  filter.trigger('change');
}

function clickMultipleSearchOption(optionName) {
  const filter = multipleFilterList.find(`option[value=${optionName}]`);

  filter.trigger('change');
}

function selectOption([selectValue], searchElement) {
  const optionsInput = searchElement.find({ ref: 'select-data' });

  const optionElement = optionsInput.find(`option[value="${selectValue}"]`);

  optionElement.trigger('change');
}

function setInputValue(input, value, searchElement) {
  if (Array.isArray(value)) {
    selectOption(value, searchElement);
    return;
  }

  if (typeof value === 'boolean') {
    const checkbox = input.find('.bit-input--field');

    if (checkbox.element.checked !== value) {
      Click(checkbox);
    }

    return;
  }

  input.find('.bit-input--field').setValue(value);
}

function selectOptionAndSetValue(optionName, searchData) {
  clickOption(optionName);

  const inputWrapper = smartSearch.find(BitInput);

  const input = inputWrapper.find('.bit-input--field');

  if (typeof searchData === 'boolean') {
    Click(input);
  } else {
    input.setValue(searchData);
  }
}

function selectOptionAndSetMultipleValue(optionName, values) {
  clickMultipleSearchOption(optionName);

  const inputs = multipleSmartSearch.findAll('.smart-search--searchField.bit-input-stacked');

  const firstInput = inputs.at(0);
  const secondInput = inputs.at(1);

  setInputValue(firstInput, values[0], multipleSmartSearch);
  setInputValue(secondInput, values[1], multipleSmartSearch);
}

function testMultipleSearch(optionName, values, expectedObject) {
  selectOptionAndSetMultipleValue(optionName, values);

  expect(result).toEqual(expectedObject);
}

function testMultipleSearchFirstFieldEmpty(optionName, value, expectedObject) {
  const filter = missingMultipleSearch.find(`option[value=${optionName}]`);

  filter.trigger('change');

  const inputs = missingMultipleSearch.findAll('.smart-search--searchField.bit-input-stacked');

  // Grab second input, ignoring the first
  const input = inputs.at(1);

  setInputValue(input, value, missingMultipleSearch);

  expect(result).toEqual(expectedObject);
}

describe('smart-search.vue', () => {
  it('allows extra actions to be passed in', () => {
    const actionContent = smartSearch.find('.content-action');

    expect(actionContent.html()).toEqual(action);
  });

  it('renders an item in the filter drop-down list for each entry in the search model', () => {
    expect(filterList.props('selectData')).toEqual([
      'initial',
      'age',
      'birthday',
      'isEmployee',
      'phone',
      'position',
    ]);
  });

  it('selects the correct filter when a filter is clicked', () => {
    /**
     * Tests that clicking an option with a given value will select the correct value
     * @param {string} name - The name of the option
     * @returns {void}
     */
    function testOptionSelectsCorrectValue(name) {
      clickOption(name);

      expect(smartSearch.vm.selectedFilter).toEqual(name);
    }

    testOptionSelectsCorrectValue('initial');
    testOptionSelectsCorrectValue('age');
    testOptionSelectsCorrectValue('birthday');
    testOptionSelectsCorrectValue('isEmployee');
    testOptionSelectsCorrectValue('phone');
    testOptionSelectsCorrectValue('position');
  });

  it('renders the correct input type when the corresponding option is selected', () => {
    /**
     * Clicks on an option and tests that the correct input is rendered
     * @param {string} optionName - The option name to test
     * @param {string} inputType - The input type to check
     * @returns {void}
     */
    function testSearchRendersInputType(optionName, inputType) {
      clickOption(optionName);

      const input = smartSearch.find(BitInput);

      expect(input.props('inputType')).toEqual(inputType);
    }

    testSearchRendersInputType('initial', 'text');
    testSearchRendersInputType('age', 'number');
    testSearchRendersInputType('birthday', 'date');
    testSearchRendersInputType('isEmployee', 'checkbox');
    testSearchRendersInputType('phone', 'phone');

    // Check that position renders a select element with a list of possible options
    clickOption('position');

    const select = smartSearch.find({ ref: 'select-data' });

    expect(select.props('selectData')).toEqual(searchModel.position);
  });

  it('calls the search function passed in on input change and injects search data', () => {
    /**
     * Tests the search functionality by selecting an option,
     * setting search data, and checking the output
     * @param {string} optionName - The name of the option to select
     * @param {*} searchData - The data to set in the input
     * @param {*} expectedValue - The expected value
     */
    function testSearchFunctionality(optionName, searchData, expectedValue) {
      selectOptionAndSetValue(optionName, searchData);

      expect(result).toEqual(expectedValue);
    }

    // STRING
    testSearchFunctionality('initial', 'test', {
      initial: 'test',
    });

    // NUMBER
    testSearchFunctionality('age', 25, {
      age: 25,
    });

    // PHONE NUMBER
    const phone = '(123) 456-7890';
    testSearchFunctionality('phone', '1234567890', {
      phone,
    });

    // check that phone number does not submit if not valid
    testSearchFunctionality('phone', '123', {
      phone,
    });

    // DATE
    const birthday = new Date('01/01/2001');
    testSearchFunctionality('birthday', '01/01/2001', {
      birthday,
    });

    // check that date does not submit if not valid
    testSearchFunctionality('birthday', '1234', null);

    // BOOLEAN
    testSearchFunctionality('isEmployee', true, {
      isEmployee: true,
    });

    // ARRAY
    clickOption('position');

    const positionList = smartSearch.find({ ref: 'select-data' });

    const position = 'ITS3';

    const positionOption = positionList.find(`option[value=${position}]`);

    positionOption.trigger('change');

    expect(result).toEqual({
      position,
    });
  });

  it('allows multiple inputs to be mapped to a single property', () => {
    // Check that the name option renders multiple inputs
    clickMultipleSearchOption('name');

    const nameInputs = multipleSmartSearch.findAll(BitInput);

    const firstNameInput = nameInputs.at(0);
    const lastNameInput = nameInputs.at(1);

    expect(firstNameInput.props('inputType')).toEqual('text');
    expect(lastNameInput.props('inputType')).toEqual('text');
  });

  it('calls the search function passed in on input change and injects multiple-search data', () => {
    // STRING AND PHONE
    testMultipleSearch('strPhone', ['test', '1234567890'], {
      string: 'test',
      phoneNumber: '(123) 456-7890',
    });

    // TWO STRINGS
    testMultipleSearch('name', ['James', 'Stanger'], {
      firstName: 'James',
      lastName: 'Stanger',
    });

    // STRING AND NUMBER
    testMultipleSearch('strNum', ['test', 1], {
      string: 'test',
      number: 1,
    });

    // STRING AND BOOLEAN
    testMultipleSearch('strBool', ['test', true], {
      string: 'test',
      boolean: true,
    });

    // STRING AND ARRAY
    testMultipleSearch('strArr', ['test', [1]], {
      string: 'test',
      array: '1',
    });

    // STRING AND DATE
    testMultipleSearch('strDate', ['test', '01/01/2001'], {
      string: 'test',
      date: new Date('01/01/2001'),
    });

    // NUMBER AND NUMBER
    testMultipleSearch('numNum', [100, 200], {
      number1: 100,
      number2: 200,
    });

    // NUMBER AND BOOLEAN
    testMultipleSearch('numBool', [100, false], {
      number: 100,
      boolean: false,
    });

    // NUMBER AND ARRAY
    testMultipleSearch('numArray', [100, [2]], {
      number: 100,
      array: '2',
    });

    // NUMBER AND PHONE
    testMultipleSearch('numPhone', [100, '9876543210'], {
      number: 100,
      phoneNumber: '(987) 654-3210',
    });

    // NUMBER AND DATE
    testMultipleSearch('numDate', [100, '02/02/2002'], {
      number: 100,
      date: new Date('02/02/2002'),
    });

    // BOOLEAN AND BOOLEAN
    testMultipleSearch('boolBool', [true, false], {
      boolean1: true,
      boolean2: false,
    });

    // BOOLEAN AND ARRAY
    testMultipleSearch('boolArray', [true, [3]], {
      boolean: true,
      array: '3',
    });

    // BOOLEAN AND PHONE
    testMultipleSearch('boolPhone', [false, '4567891230'], {
      boolean: false,
      phoneNumber: '(456) 789-1230',
    });

    // BOOLEAN AND DATE
    testMultipleSearch('boolDate', [true, '03/03/2003'], {
      boolean: true,
      date: new Date('03/03/2003'),
    });

    // ARRAY AND ARRAY
    clickMultipleSearchOption('arrayArray');

    const selectElements = multipleSmartSearch.findAll({ ref: 'select-data' });

    const array1 = selectElements.at(0);
    const array2 = selectElements.at(1);

    const option1 = array1.find('option[value="2"]');
    const option2 = array2.find('option[value="6"]');

    option1.trigger('change');
    option2.trigger('change');

    expect(result).toEqual({
      array1: '2',
      array2: '6',
    });

    // ARRAY AND PHONE
    testMultipleSearch('arrayPhone', [[3], '1234567890'], {
      array: '3',
      phoneNumber: '(123) 456-7890',
    });

    // // ARRAY AND DATE
    testMultipleSearch('arrayDate', [[1], '04/04/2004'], {
      array: '1',
      date: new Date('04/04/2004'),
    });

    // PHONE AND PHONE
    testMultipleSearch('phonePhone', ['3456851064', '6745632132'], {
      phoneNumber1: '(345) 685-1064',
      phoneNumber2: '(674) 563-2132',
    });

    // PHONE AND DATE
    testMultipleSearch('phoneDate', ['3456851064', '05/05/2005'], {
      phoneNumber: '(345) 685-1064',
      date: new Date('05/05/2005'),
    });

    // DATE AND DATE
    testMultipleSearch('dateDate', ['07/07/2007', '08/08/2008'], {
      date1: new Date('07/07/2007'),
      date2: new Date('08/08/2008'),
    });
  });

  it('only submits the multiple-search data that has been filled out', () => {
    // NUMBER
    testMultipleSearchFirstFieldEmpty('numDate', '01/01/2001', {
      date: new Date('01/01/2001'),
    });

    // BOOLEAN
    testMultipleSearchFirstFieldEmpty('boolArray', [1], {
      boolean: false,
      array: '1',
    });

    // ARRAY
    // Note: must test manually, as missingMultipleSearch function gets confused
    const filter = missingMultipleSearch.find('option[value="arrayPhone"]');

    filter.trigger('change');

    const phoneInput = missingMultipleSearch.find(BitInput);

    setInputValue(phoneInput, '1234567890', missingMultipleSearch);

    expect(result).toEqual({
      phoneNumber: '(123) 456-7890',
    });

    // PHONE NUMBER
    testMultipleSearchFirstFieldEmpty('phoneDate', '01/01/2001', {
      date: new Date('01/01/2001'),
    });

    // DATE
    testMultipleSearchFirstFieldEmpty('dateDate', '01/01/2001', {
      date2: new Date('01/01/2001'),
    });

    // STRING
    testMultipleSearchFirstFieldEmpty('strNum', 25, {
      number: 25,
    });
  });

  it('will reset all fields and call reset method if reset button is clicked', (done) => {
    // Ensure vue will throw an exception that will stop the test on failure
    // We must do this here because we need to test the DOM asynchronously
    Vue.config.errorHandler = done;

    function clickReset(searchElement) {
      const resetBtn = searchElement.find('.smart-search--reset');

      Click(resetBtn);
    }

    function testValueIsClear(input, value) {
      if (typeof value === 'boolean') {
        expect(input.checked).toEqual(false);
      } else {
        expect(input.value).toEqual('');
      }
    }

    function testResetSingle(optionName, value) {
      selectOptionAndSetValue(optionName, value);

      clickReset(smartSearch);

      expect(result).toEqual({});

      smartSearch.vm.$nextTick(() => {
        // Ensure the correct option is still selected
        clickOption(optionName);

        const input = smartSearch.vm.$el.querySelector('input.bit-input--field');

        testValueIsClear(input, value);

        done();
      });
    }

    function testResetMultiple(optionName, values) {
      selectOptionAndSetMultipleValue(optionName, values);

      clickReset(multipleSmartSearch);

      expect(result).toEqual({});

      multipleSmartSearch.vm.$nextTick(() => {
        clickMultipleSearchOption(optionName);

        const inputs = multipleSmartSearch.findAll('.smart-search--searchField .bit-input--field');

        testValueIsClear(inputs.at(0).element, values[0]);
        testValueIsClear(inputs.at(1).element, values[1]);

        done();
      });
    }

    testResetSingle('initial', 'test');
    testResetSingle('age', 25);
    testResetSingle('birthday', '01/01/2001');
    testResetSingle('isEmployee', true);
    testResetSingle('phone', '1234567890');

    // Test single array
    clickOption('position');

    const positionList = smartSearch.find({ ref: 'select-data' });

    const positionOption = positionList.find('option[value=ITS3]');

    positionOption.trigger('change');

    clickReset(smartSearch);

    expect(result).toEqual({});

    Vue.nextTick(() => {
      clickOption('position');

      const positionOptions = smartSearch.vm.$el.querySelectorAll('.smart-search--searchField option:not([disabled])');

      positionOptions.forEach((option) => {
        expect(option.selected).toEqual(false);
      });

      done();
    });

    // NUMBER
    testResetMultiple('numDate', [25, '01/01/2001']);

    // PHONE NUMBER
    testResetMultiple('phoneDate', ['1234567890', '01/01/2001']);

    // DATE
    testResetMultiple('dateDate', ['01/01/2001', '02/02/2002']);

    // STRING
    testResetMultiple('strNum', ['test', 25]);

    // BOOLEAN
    testResetMultiple('boolBool', [true, true]);

    // ARRAY
    clickMultipleSearchOption('arrayPhone');

    const phoneInput = multipleSmartSearch.find(BitInput);
    const selectInput = multipleSmartSearch.find({ ref: 'select-data' });

    setInputValue(phoneInput, '1234567890', multipleSmartSearch);

    const firstOption = selectInput.find('option:not([disabled])');

    firstOption.trigger('change');

    clickReset(multipleSmartSearch);

    expect(result).toEqual({});

    multipleSmartSearch.vm.$nextTick(() => {
      clickMultipleSearchOption('arrayPhone');

      const inputs = multipleSmartSearch.findAll('.smart-search--searchField .bit-input--field');

      const options = smartSearch.vm.$el.querySelectorAll('.smart-search--searchField option:not([disabled])');

      options.forEach((option) => {
        expect(option.selected).toEqual(false);
      });

      testValueIsClear(inputs.at(1).element, '1234567890');

      done();
    });
  });

  it('calls the search function when the filter is changed', () => {
    selectOptionAndSetValue('initial', 'Test');
    selectOptionAndSetValue('age', 25);

    expect(result).toEqual({
      age: 25,
    });

    clickOption('initial');

    expect(result).toEqual({
      initial: 'Test',
    });
  });
});
