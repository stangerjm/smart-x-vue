import { mount } from '@vue/test-utils';
import { createComponentGenerator, delay, findByElementName } from '../helpers';
import SmartForm from '../../../src/components/smart-form.vue';
import SmartLoading from '../../../src/components/smart-loading.vue';
import BlockMessages from '../../../src/components/block-messages.vue';
import BitInput from '../../../src/components/bit-input.vue';
import BitSelect from '../../../src/components/bit-select.vue';
import { transformIntoFormModel } from '../../../src/global/mixins';

const button = '<button class="extra-button">Click</button>';
const content = '<p class="custom-content">Custom content</p>';

const mountSmartForm = createComponentGenerator(SmartForm, {
  slots: {
    'form-buttons': button,
    'form-end': content,
  },
});

async function submit(submittedData) {
  // Wait for one second
  await delay(1000);
  return submittedData;
}

const filledOutFormData = {
  id: 1,
  name: 'James',
  birthday: new Date('09/11/1993'),
  age: 25,
  isEmployee: false,
  teamMembers: ['Billy', 'Joe', 'John'],
};

const emptyFormData = {
  id: Number,
  name: String,
  birthday: Date,
  age: Number,
  isEmployee: Boolean,
  teamMembers: Array,
};

const advancedFormData = transformIntoFormModel({
  id: { type: Number },
  firstName: {
    type: String,
    required: true,
    readonly: true,
    span: 5,
  },
  middleInitial: {
    type: String,
    required: true,
    readonly: true,
    displayName: 'M.I.',
    span: 2,
  },
  lastName: {
    type: String,
    required: true,
    readonly: true,
    span: 5,
  },
  birthday: {
    type: Date,
    required: true,
    span: 3,
  },
  age: {
    type: Number,
    required: true,
    span: 3,
  },
  isEmployee: {
    type: Boolean,
    span: 3,
  },
  teamMembers: {
    type: Array,
    required: true,
    span: 12,
  },
});

const erroredFormData = transformIntoFormModel({
  id: { type: Number },
  firstName: {
    type: String,
    required: true,
    errored: true,
    span: 5,
  },
  middleInitial: {
    type: String,
    required: true,
    errored: true,
    span: 2,
  },
  lastName: {
    type: String,
    readonly: true,
    span: 5,
  },
});

const validationErrors = [
  { message: 'First name is incorrect', fieldName: 'firstName' },
  { message: 'Middle initial is the wrong letter', fieldName: 'middleInitial' },
];

const formTitle = 'Test';

const emptyForm = mountSmartForm({
  formData: emptyFormData,
  onSubmit: submit,
  submitBtnSize: 'small',
});

const filledOutForm = mountSmartForm({
  formData: filledOutFormData,
  formTitle,
  onSubmit: submit,
});

const centeredForm = mountSmartForm({
  formData: filledOutFormData,
  onSubmit: submit,
  centerForm: true,
});

const advancedForm = mountSmartForm({
  formData: advancedFormData,
  onSubmit: submit,
});

const erroredForm = mountSmartForm({
  formData: erroredFormData,
  onSubmit: submit,
  validationErrors,
  centerMessages: true,
});

const formWithEmptyRequiredFields = mountSmartForm({
  formData: transformIntoFormModel({
    name: {
      type: String,
      required: true,
    },
    age: {
      value: 25,
      required: true,
    },
  }),
  onSubmit: submit,
});

describe('smart-form.vue', () => {
  it('allows the form to be centered, but will not be centered by default', () => {
    expect(centeredForm.classes()).toContain('smart-form-centered');

    expect(filledOutForm.classes()).not.toContain('smart-form-centered');
  });

  it('allows the form to show a loading state on submit', () => {
    const smartLoading = filledOutForm.find(SmartLoading);

    expect(smartLoading.vm.loading).toBeFalsy();


    const submitBtn = filledOutForm.find('.smart-form--button');

    submitBtn.trigger('click');

    expect(smartLoading.vm.loading).toBeTruthy();
  });

  it('optionally renders a title', () => {
    const title = filledOutForm.find('.smart-form--title');

    expect(title.text()).toEqual(formTitle);
  });

  it('renders the id as a hidden field if an id property exists', () => {
    const idField = filledOutForm.find('input[name=id]');

    expect(idField.attributes('type')).toEqual('hidden');
  });

  it('renders an input for each item in the form data', () => {
    Object.keys(emptyFormData).every((formDataKey) => {
      // Id field is out of the scope of this test
      if (formDataKey === 'id') {
        return true;
      }

      const field = emptyForm.find(`.smart-form--field[name=${formDataKey}]`);
      expect(field.exists()).toBeTruthy();
      return true;
    });
  });

  it('renders a select element for array properties', () => {
    const selectElement = filledOutForm.find('select.bit-input--field[name=teamMembers]');

    expect(selectElement.exists()).toBeTruthy();
  });

  it('renders a bit-input element for any other type', () => {
    Object.keys(emptyFormData).every((formDataKey) => {
      // Id and teamMembers fields are out of the scope of this test
      if (formDataKey === 'id' || formDataKey === 'teamMembers') {
        return true;
      }

      const field = emptyForm.find(`input.bit-input--field[name=${formDataKey}]`);
      expect(field.exists(), `Associated input was not found for property: "${formDataKey}"`).toBeTruthy();
      return true;
    });
  });

  it('displays items in columns if specified', () => {
    // JSDOM, the JavaScript simulated DOM vue-test-utils uses, does not parse css Flexbox
    // Thus this feature cannot be tested by checking the rendered DOM and must be tested
    // by testing the method that generates the property
    const getFlexboxProp = advancedForm.vm.getFlexProp;

    expect(getFlexboxProp(5)).toEqual('flex: 1 1 41%;');
    expect(getFlexboxProp(2)).toEqual('flex: 1 1 16%;');
    expect(getFlexboxProp(4)).toEqual('flex: 1 1 33%;');
    expect(getFlexboxProp(12)).toEqual('flex: 1 1 100%;');
    expect(getFlexboxProp(6)).toEqual('flex: 1 1 50%;');
  });

  it('renders the input as readonly if associated property is flagged as readonly', () => {
    const fields = advancedForm.findAll('.smart-form--field');

    fields.wrappers.every((field) => {
      const fieldTitle = field.find('.bit-input--label').text();
      const fieldInput = field.find('.bit-input--field');

      if (fieldTitle === 'First Name' || fieldTitle === 'Last Name' || fieldTitle === 'M. I.') {
        expect(fieldInput.attributes('readonly'), `Form field "${fieldTitle}" was not marked as readonly.`).toBeTruthy();
        return true;
      }

      expect(fieldInput.attributes('readonly'), `Form field "${fieldTitle}" was marked as readonly when it should not be.`).toBeUndefined();
      return true;
    });
  });

  it('flags the associated input as errored if associated property is marked as errored', () => {
    const fields = erroredForm.findAll('.smart-form--field');

    fields.wrappers.every((field) => {
      const fieldTitle = field.find('.bit-input--label').text();
      const fieldInput = field.find('.bit-input--field');

      if (fieldTitle === 'First Name' || fieldTitle === 'Middle Initial') {
        expect(fieldInput.classes(), `Field: "${fieldTitle}" should be marked as errored`).toContain('bit-input--error');
        return true;
      }

      expect(fieldInput.classes(), `Field: "${fieldTitle}" should NOT be marked as errored`).not.toContain('bit-input--error');
      return true;
    });
  });

  it('allows button size to be specified, but will be medium by default', () => {
    const defaultSubmitBtn = filledOutForm.find('.smart-form--button');
    const smallSubmitBtn = emptyForm.find('.smart-form--button');

    expect(defaultSubmitBtn.classes()).toContain('bit-btn-medium');
    expect(smallSubmitBtn.classes()).toContain('bit-btn-small');
  });

  it('allows extra buttons to be passed into "form-buttons" slot', () => {
    const extraButton = filledOutForm.find('.extra-button');
    expect(extraButton.html()).toEqual(button);
  });

  it('allows extra elements to be passed into "form-end" slot', () => {
    const extraContent = filledOutForm.find('.custom-content');
    expect(extraContent.html()).toEqual(content);
  });

  it('displays any error messages passed in', () => {
    const errors = erroredForm.findAll('.block-messages--message');
    expect(errors.length).toEqual(validationErrors.length);

    errors.wrappers.every((error, idx) => {
      expect(error.text()).toEqual(validationErrors[idx].message);
      return true;
    });
  });

  it('allows submit functionality to be specified, which exposes the submitted form data inside the submit function', () => {
    const wrapperComponent = mount({
      components: {
        SmartForm,
      },
      template: '<smart-form :on-submit="submitForm" :form-data="filledOutFormData"></smart-form>',
      methods: {
        submitForm(submittedData) {
          this.$emit('formSubmit', submittedData);
        },
      },
      data() {
        return {
          filledOutFormData,
        };
      },
    });

    const submitButton = wrapperComponent.find('.smart-form--button');

    submitButton.trigger('click');

    const expectedData = {
      id: 1,
      name: 'James',
      birthday: new Date('09/11/1993'),
      age: 25,
      isEmployee: false,
    };

    expect(wrapperComponent.emitted('formSubmit')[0]).toEqual([expectedData]);
  });

  it('allows form to react to form-data structure changing', () => {
    const model = {
      name: String,
      hireDate: Date,
      age: Number,
    };

    const redefinedModel = {
      ...model,
      birthday: Date,
    };

    const smartForm = mountSmartForm({
      formData: model,
      onSubmit: submit,
    });

    const nameField = smartForm.find('.bit-input--field[name="name"]');
    const ageField = smartForm.find('.bit-input--field[name="age"]');

    expect(nameField.exists()).toBeTruthy();
    expect(ageField.exists()).toBeTruthy();

    // smartForm.vm.propsData.formData = redefinedModel;
    smartForm.setProps({
      formData: redefinedModel,
    });

    const birthdayField = smartForm.find('.bit-input--field[name="birthday"');

    expect(nameField.exists()).toBeTruthy();
    expect(ageField.exists()).toBeTruthy();
    expect(birthdayField.exists()).toBeTruthy();
  });

  it('auto-focuses on the first errored field of the form if submitted with validation errors', () => {
    const attachedErroredForm = mount(SmartForm, {
      attachToDocument: true,
      propsData: {
        formData: erroredFormData,
        onSubmit: submit,
        validationErrors,
      },
    });

    const firstErroredField = attachedErroredForm.find('.bit-input--field[name="firstName"').element;

    expect(firstErroredField).toBe(document.activeElement);
  });

  it('will not submit a form with empty required fields', () => {
    const submitBtn = formWithEmptyRequiredFields.find('.smart-form--button');

    // Submit
    submitBtn.trigger('click');

    const errors = formWithEmptyRequiredFields.findAll('.block-messages--message');

    expect(errors.length).toBeGreaterThan(0);
    expect(formWithEmptyRequiredFields.vm.errors).toContainEqual({ message: 'name is required', fieldName: 'name' });
  });

  it('updates the errors passed in as they change, overriding the existing errors', () => {
    const submitBtn = formWithEmptyRequiredFields.find('.smart-form--button');

    // Submit
    submitBtn.trigger('click');

    expect(formWithEmptyRequiredFields.vm.errors.length).toBeGreaterThan(0);

    const newValidationErrors = [
      { fieldName: 'name', message: 'That is not correct' },
      { fieldName: 'age', message: 'You are not the right age' },
    ];

    formWithEmptyRequiredFields.setProps({
      validationErrors: newValidationErrors,
    });

    expect(formWithEmptyRequiredFields.vm.errors).toEqual(newValidationErrors);
  });

  it('updates internal errors and overrides errors passed in', () => {
    const newValidationErrors = [
      { fieldName: 'name', message: 'That is not correct' },
      { fieldName: 'age', message: 'You are not the right age' },
    ];

    formWithEmptyRequiredFields.setProps({
      validationErrors: newValidationErrors,
    });

    expect(formWithEmptyRequiredFields.vm.errors).toEqual(newValidationErrors);

    const submitBtn = formWithEmptyRequiredFields.find('.smart-form--button');

    submitBtn.trigger('click');

    expect(formWithEmptyRequiredFields.vm.errors).toEqual([{ message: 'name is required', fieldName: 'name' }]);
  });

  it('passes required state to all child bit-input and bit-select components', () => {
    const requiredFields = advancedForm.findAll('.bit-input--required');

    expect(requiredFields.length).toEqual(6);

    const firstNameRequiredLabel = advancedForm.find('.smart-form--field[name="firstName"] > .bit-input--required');
    expect(firstNameRequiredLabel.exists()).toBeTruthy();

    const middleInitialRequiredLabel = advancedForm.find('.smart-form--field[name="middleInitial"] > .bit-input--required');
    expect(middleInitialRequiredLabel.exists()).toBeTruthy();

    const lastNameRequiredLabel = advancedForm.find('.smart-form--field[name="lastName"] > .bit-input--required');
    expect(lastNameRequiredLabel.exists()).toBeTruthy();

    const birthdayRequiredLabel = advancedForm.find('.smart-form--field[name="birthday"] > .bit-input--required');
    expect(birthdayRequiredLabel.exists()).toBeTruthy();

    const ageRequiredLabel = advancedForm.find('.smart-form--field[name="age"] > .bit-input--required');
    expect(ageRequiredLabel.exists()).toBeTruthy();

    const teamMembersRequiredLabel = advancedForm.find('.smart-form--field[name="teamMembers"] > .bit-input--required');
    expect(teamMembersRequiredLabel.exists()).toBeTruthy();
  });

  it('allows error message list to be centered', () => {
    const blockMessages = erroredForm.find(BlockMessages);
    expect(blockMessages.props('alignLeft')).toBeFalsy();
  });

  it('allows elements to not be stacked', () => {
    const formWithNonStackedInputs = mountSmartForm({
      formData: emptyFormData,
      onSubmit: submit,
      stackInputs: false,
    });

    const { wrappers: inputWrappers } = formWithNonStackedInputs.findAll(BitInput);

    const nameInput = inputWrappers.find(findByElementName('name'));
    expect(nameInput.props('stackElements')).toEqual(false);

    const birthdayInput = inputWrappers.find(findByElementName('birthday'));
    expect(birthdayInput.props('stackElements')).toEqual(false);

    const ageInput = inputWrappers.find(findByElementName('age'));
    expect(ageInput.props('stackElements')).toEqual(false);

    const isEmployeeInput = inputWrappers.find(findByElementName('isEmployee'));
    expect(isEmployeeInput.props('stackElements')).toEqual(false);

    const teamMembersInput = formWithNonStackedInputs.find(BitSelect);
    expect(teamMembersInput.props('stackElements')).toEqual(false);
  });

  it('allows elements to be lined up', () => {
    const formWithLinedUpInputs = mountSmartForm({
      formData: emptyFormData,
      onSubmit: submit,
      lineUpInputs: true,
    });

    const { wrappers: inputWrappers } = formWithLinedUpInputs.findAll(BitInput);

    const nameInput = inputWrappers.find(findByElementName('name'));
    expect(nameInput.props('lineUp')).toEqual(true);

    const birthdayInput = inputWrappers.find(findByElementName('birthday'));
    expect(birthdayInput.props('lineUp')).toEqual(true);

    const ageInput = inputWrappers.find(findByElementName('age'));
    expect(ageInput.props('lineUp')).toEqual(true);

    const isEmployeeInput = inputWrappers.find(findByElementName('isEmployee'));
    expect(isEmployeeInput.props('lineUp')).toEqual(true);

    const teamMembersInput = formWithLinedUpInputs.find(BitSelect);
    expect(teamMembersInput.props('lineUp')).toEqual(true);
  });

  it('allows submit button text to be specified with a default of "submit"', () => {
    const btnText = 'Test';

    const formWithCustomSubmitText = mountSmartForm({
      formData: emptyFormData,
      onSubmit: submit,
      submitBtnText: btnText,
    });

    const customSubmitBtn = formWithCustomSubmitText.find('.smart-form--button');
    expect(customSubmitBtn.text()).toEqual(btnText);

    const defaultSubmitBtn = emptyForm.find('.smart-form--button');
    expect(defaultSubmitBtn.text()).toEqual('Submit');
  });
});
