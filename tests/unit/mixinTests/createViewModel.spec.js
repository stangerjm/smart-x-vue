import { createViewModel } from '../../../src/global/mixins';
import ModelType from '../../../src/global/constants/ModelType';
import { Password, PhoneNumber } from '../../../src/global/constants/CustomTypes';

const defaultViewModelProps = ['type', 'typeConstructor', 'value', 'errored'];
const advancedViewModelProps = [...defaultViewModelProps, 'required'];

function viewModelMatchesExpectedModel(model, expectedModel, propsToTest) {
  const viewModel = createViewModel(model);
  Object.entries(viewModel).every(([key, value]) => {
    propsToTest.forEach((prop) => {
      const errorMessage = `Value at "${key} => ${prop}" did not match expected value`;
      const modelItem = expectedModel[key];
      expect(value[prop], errorMessage).toEqual(modelItem[prop]);
    });
    return true;
  });
}

const modelWithDefaultValues = {
  name: {
    type: 'String',
    typeConstructor: String,
    value: '',
    errored: false,
    required: true,
  },
  age: {
    type: 'Number',
    typeConstructor: Number,
    value: null,
    errored: false,
    required: true,
  },
  birthday: {
    type: 'Date',
    typeConstructor: Date,
    value: null,
    errored: false,
    required: true,
  },
  isEmployee: {
    type: 'Boolean',
    typeConstructor: Boolean,
    value: false,
    errored: false,
    required: true,
  },
  teamMembers: {
    type: 'Array',
    typeConstructor: Array,
    value: [],
    errored: false,
    required: true,
  },
  position: {
    type: 'Object',
    typeConstructor: Object,
    value: {},
    errored: false,
    required: true,
  },
  phoneNumber: {
    type: 'PhoneNumber',
    typeConstructor: PhoneNumber,
    value: '',
    errored: false,
    required: true,
  },
  password: {
    type: 'Password',
    typeConstructor: Password,
    value: '',
    errored: false,
    required: true,
  },
};

const modelWithCustomValues = {
  name: {
    type: 'String',
    typeConstructor: String,
    value: 'James',
    errored: false,
    required: true,
  },
  age: {
    type: 'Number',
    typeConstructor: Number,
    value: 25,
    errored: false,
    required: true,
  },
  birthday: {
    type: 'Date',
    typeConstructor: Date,
    value: new Date('01/01/2001'),
    errored: false,
    required: true,
  },
  isEmployee: {
    type: 'Boolean',
    typeConstructor: Boolean,
    value: true,
    errored: false,
    required: true,
  },
  teamMembers: {
    type: 'Array',
    typeConstructor: Array,
    value: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'],
    errored: false,
    required: true,
  },
  position: {
    type: 'Object',
    typeConstructor: Object,
    value: {
      name: {
        type: 'String',
        typeConstructor: String,
        value: 'ITS3',
        errored: false,
      },
      team: {
        type: 'String',
        typeConstructor: String,
        value: 'PADS',
        errored: false,
      },
    },
    errored: false,
    required: true,
  },
  phoneNumber: {
    type: 'PhoneNumber',
    typeConstructor: PhoneNumber,
    value: '1234567890',
    errored: false,
    required: true,
  },
  password: {
    type: 'Password',
    typeConstructor: Password,
    value: 'test123',
    errored: false,
    required: true,
  },
};

describe('createViewModel.js', () => {
  it('creates a typed view model from an object with actual values', () => {
    const model = {
      name: 'James',
      age: 25,
      birthday: new Date('01/01/2001'),
      isEmployee: true,
      teamMembers: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'],
      position: { name: 'ITS3', team: 'PADS' },
      phoneNumber: ModelType.PhoneNumber('1234567890'),
      password: ModelType.Password('test123'),
    };

    viewModelMatchesExpectedModel(model, modelWithCustomValues, defaultViewModelProps);
  });

  it('creates a type view model from an object with type constructors', () => {
    const model = {
      name: String,
      age: Number,
      birthday: Date,
      isEmployee: Boolean,
      teamMembers: Array,
      position: Object,
      phoneNumber: ModelType.PhoneNumber(),
      password: ModelType.Password(),
    };

    viewModelMatchesExpectedModel(model, modelWithDefaultValues, defaultViewModelProps);
  });

  it('creates a single typed view model from an array of objects that contain actual values', () => {
    const model = [
      {
        name: 'name',
        value: 'James',
        required: true,
      },
      {
        name: 'age',
        value: 25,
        required: true,
      },
      {
        name: 'birthday',
        value: new Date('01/01/2001'),
        required: true,
      },
      {
        name: 'isEmployee',
        value: true,
        required: true,
      },
      {
        name: 'teamMembers',
        value: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'],
        required: true,
      },
      {
        name: 'position',
        value: { name: 'ITS3', team: 'PADS' },
        required: true,
      },
      {
        name: 'phoneNumber',
        value: ModelType.PhoneNumber('1234567890'),
        required: true,
      },
      {
        name: 'password',
        value: ModelType.Password('test123'),
        required: true,
      },
    ];

    viewModelMatchesExpectedModel(model, modelWithCustomValues, advancedViewModelProps);
  });

  it('creates a single typed view model from an array of objects that contain type constructors', () => {
    const model = [
      {
        name: 'name',
        type: String,
        required: true,
      },
      {
        name: 'age',
        type: Number,
        required: true,
      },
      {
        name: 'birthday',
        type: Date,
        required: true,
      },
      {
        name: 'isEmployee',
        type: Boolean,
        required: true,
      },
      {
        name: 'teamMembers',
        type: Array,
        required: true,
      },
      {
        name: 'position',
        type: Object,
        required: true,
      },
      {
        name: 'phoneNumber',
        type: ModelType.PhoneNumber(),
        required: true,
      },
      {
        name: 'password',
        type: ModelType.Password(),
        required: true,
      },
    ];

    viewModelMatchesExpectedModel(model, modelWithDefaultValues, advancedViewModelProps);
  });

  it('allows a simple version of the view model to be accessed containing only keys and values', () => {
    const model = {
      name: 'James',
      age: 25,
      birthday: new Date('01/01/2001'),
      isEmployee: true,
      teamMembers: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'],
      position: { name: 'ITS3', team: 'PADS' },
      phoneNumber: '1234567890',
      password: 'test123',
    };

    const viewModel = createViewModel(model);

    expect(viewModel.simpleVersion).toEqual(model);

    const advancedViewModel = createViewModel([
      { name: 'name', value: 'James', required: true },
      { name: 'age', value: 25, required: true },
      { name: 'birthday', value: new Date('01/01/2001'), required: true },
      { name: 'isEmployee', value: true, required: true },
      { name: 'teamMembers', value: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'], required: true },
      { name: 'position', value: { name: 'ITS3', team: 'PADS' }, required: true },
      { name: 'phoneNumber', value: '1234567890', required: true },
      { name: 'password', value: 'test123', required: true },
    ]);

    expect(advancedViewModel.simpleVersion).toEqual(model);
  });

  it('allows values of the input model to be ignored, instead using the default value for that type as the model value', () => {
    const modelWithValues = createViewModel({
      name: 'James',
      age: 25,
      birthday: new Date('01/01/2001'),
      isEmployee: true,
      teamMembers: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'],
      position: { name: 'ITS3', team: 'PADS' },
      phoneNumber: '1234567890',
      password: 'test123',
    }, true);

    const expectedModel = createViewModel({
      name: String,
      age: Number,
      birthday: Date,
      isEmployee: Boolean,
      teamMembers: ['Jeremy', 'Josh', 'Kelli', 'Kieth', 'Long', 'Richard'],
      position: { name: String, team: String },
      phoneNumber: String,
      password: String,
    });

    expect(modelWithValues).toEqual(expectedModel);
  });
});
