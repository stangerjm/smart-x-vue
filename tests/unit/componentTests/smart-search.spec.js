import { createComponentGenerator } from '../helpers';
import SmartSearch from '../../../src/components/smart-search.vue';
import BlockExpandableSection from '../../../src/components/block-expandableSection.vue';
import BitInput from '../../../src/components/bit-input.vue';
import BitSelect from '../../../src/components/bit-select.vue';
import ModelType from '../../../src/global/constants/ModelType';

const action = '<button type="button" class="content-action">Test</button>';

const mountSmartSearch = createComponentGenerator(SmartSearch, {
  slots: {
    'extra-action': action,
  },
});

const searchTitle = 'Test';

const searchModel = {
  name: String,
  age: Number,
  birthday: Date,
  isEmployee: Boolean,
  phone: ModelType.PhoneNumber,
  position: ['ITS3', 'ITS4', 'ITS5'],
};

let result;
function onSubmit(submittedData) {
  result = submittedData;
}

const smartSearch = mountSmartSearch({
  searchTitle,
  searchModel,
  onSubmit,
});

const searchHeader = smartSearch.find('.smart-search--header');

function findByElementName(nameValue) {
  return function findByName(input) {
    return input.vm.$el.getAttribute('name') === nameValue;
  };
}

const inputWrappers = smartSearch.findAll(BitInput).wrappers;
const selectWrappers = smartSearch.findAll(BitSelect).wrappers;

const nameWrapper = inputWrappers.find(findByElementName('name'));
const nameInput = nameWrapper.find('.bit-input--field');

const ageWrapper = inputWrappers.find(findByElementName('age'));
const ageInput = ageWrapper.find('.bit-input--field');

const birthdayWrapper = inputWrappers.find(findByElementName('birthday'));
const birthdayInput = birthdayWrapper.find('.bit-input--field');

const isEmployeeWrapper = inputWrappers.find(findByElementName('isEmployee'));
const isEmployeeInput = isEmployeeWrapper.find('.bit-input--field');

const phoneWrapper = inputWrappers.find(findByElementName('phone'));
const phoneInput = phoneWrapper.find('.bit-input--field');


const positionWrapper = selectWrappers.find(findByElementName('position'));
const positionInput = positionWrapper.find('.bit-input--field');

describe('smart-search.vue', () => {
  it('renders a title if passed in', () => {
    const title = smartSearch.find('.smart-search--title');

    expect(title.text()).toEqual(searchTitle);
  });

  it('allows extra actions to be passed in', () => {
    const actionContent = smartSearch.find('.content-action');

    expect(actionContent.html()).toEqual(action);
  });

  it('toggles between a search and close button if header is clicked', () => {
    let currentAction = smartSearch.find('.smart-search--action');
    expect(currentAction.classes()).toContain('bit-icon-search');

    searchHeader.trigger('click');
    currentAction = smartSearch.find('.smart-search--action');
    expect(currentAction.classes()).toContain('bit-icon-exit');
  });

  it('toggles a container of search fields when header is clicked', () => {
    const newSmartSearch = mountSmartSearch({
      searchTitle,
      searchModel,
      onSubmit,
    });

    const newSearchHeader = newSmartSearch.find('.smart-search--header');

    const expandableSection = newSmartSearch.find(BlockExpandableSection);

    expect(expandableSection.props('isExpanded')).toBeFalsy();
    expect(expandableSection.classes()).toContain('is-hidden');

    newSearchHeader.trigger('click');
    expect(expandableSection.props('isExpanded')).toBeTruthy();
    expect(expandableSection.classes()).not.toContain('is-hidden');
  });

  it('renders an appropriate field for each entry in the search model', () => {
    expect(nameWrapper.props('inputType')).toEqual('text');
    expect(nameWrapper.vm.$options.name).toEqual('bit-input');

    expect(ageWrapper.props('inputType')).toEqual('number');
    expect(ageWrapper.vm.$options.name).toEqual('bit-input');

    expect(birthdayWrapper.props('inputType')).toEqual('date');
    expect(birthdayWrapper.vm.$options.name).toEqual('bit-input');

    expect(isEmployeeWrapper.props('inputType')).toEqual('checkbox');
    expect(isEmployeeWrapper.vm.$options.name).toEqual('bit-input');

    expect(phoneWrapper.props('inputType')).toEqual('phone');
    expect(phoneWrapper.vm.$options.name).toEqual('bit-input');

    expect(positionWrapper.vm.$options.name).toEqual('bit-select');
  });

  // it('lines up input fields for consistency', () => {
  //   expect(nameInput.props('lineUp')).toBeTruthy();
  //   expect(birthdayInput.props('lineUp')).toBeTruthy();
  //   expect(isEmployeeInput.props('lineUp')).toBeTruthy();
  //   expect(phoneInput.props('lineUp')).toBeTruthy();
  //   expect(positionSelect.props('lineUp')).toBeTruthy();
  // });

  it('only submits values from search fields that are filled out', () => {
    function Click(wrapper) {
      if (wrapper.trigger != null) {
        wrapper.trigger('click');
      }
    }

    const submitBtn = smartSearch.find('.smart-form--button');

    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(1);
    expect(result.isEmployee).toEqual(false);

    // Check isEmployee input box and verify value is correct
    Click(isEmployeeInput);
    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(1);
    expect(result.isEmployee).toEqual(true);

    // Set name input and verify submitted value is correct
    const text = 'test';
    nameInput.setValue(text);

    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(2);
    expect(result.name).toEqual(text);

    // Set age input and verify submitted value is correct
    const age = 25;
    ageInput.setValue(age);

    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(3);
    expect(result.age).toEqual(age);

    // Set birthday input and verify submitted value is correct
    const birthday = '09/11/1993';
    birthdayInput.setValue(birthday);

    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(4);
    expect(result.birthday).toEqual(new Date(birthday));

    // Set phone input and verify submitted value is correct
    const phoneNumber = '1234567890';
    phoneInput.setValue(phoneNumber);

    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(5);
    expect(result.phone).toEqual('(123) 456-7890');

    // Select position and verify submitted value is correct
    const selectedPosition = positionInput.find('option:not([disabled])');

    selectedPosition.trigger('input');
    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(6);
    expect(result.position).toEqual('ITS3');

    // Remove all possible inputs and verify output reflects removal
    nameInput.setValue('');
    Click(isEmployeeInput);
    ageInput.setValue(null);
    birthdayInput.setValue('');
    phoneInput.setValue('');

    // Simulate focus moving to the button, triggering blur on phone input
    phoneInput.trigger('blur');

    Click(submitBtn);

    expect(Object.keys(result).length).toEqual(2);
    expect(result.position).toEqual('ITS3');
    expect(result.isEmployee).toEqual(false);
  });

  it('allows content to be expanded by default', () => {
    const expandedSmartSearch = mountSmartSearch({
      searchTitle,
      searchModel,
      onSubmit,
      isExpanded: true,
    });

    const blockExpandableSection = expandedSmartSearch.find(BlockExpandableSection);

    expect(blockExpandableSection.classes()).not.toContain('is-hidden');
    expect(blockExpandableSection.props('isExpanded')).toEqual(true);
  });

  it('allows search button size to be set', () => {
    const smartSearchWithLargeBtn = mountSmartSearch({
      searchTitle,
      searchModel,
      onSubmit,
      searchBtnSize: 'large',
    });

    const searchBtn = smartSearchWithLargeBtn.find('.bit-btn-large');
    expect(searchBtn.exists()).toEqual(true);
  });
});
