import { transformIntoFormModel } from '../../../src/global/mixins';

describe('transformIntoFormModel.js', () => {
  it('transforms an object into an array of objects, moving the outer keys into a "name" property', () => {
    const model = {
      firstName: {
        type: String,
        required: true,
        span: '5',
      },
      middleInitial: {
        type: String,
        required: false,
        span: '2',
        displayName: 'M.I.',
      },
      lastName: {
        type: String,
        required: true,
        span: '5',
      },
    };

    const expectedModel = [
      {
        name: 'firstName',
        type: String,
        required: true,
        span: '5',
      },
      {
        name: 'middleInitial',
        type: String,
        required: false,
        span: '2',
        displayName: 'M.I.',
      },
      {
        name: 'lastName',
        type: String,
        required: true,
        span: '5',
      },
    ];

    expect(transformIntoFormModel(model)).toEqual(expectedModel);
  });
});
