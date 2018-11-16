import { createWrapperGenerator } from '../helpers';
import BitSelect from '../../../src/components/bit-select.vue';

const mountBitSelect = createWrapperGenerator(BitSelect);

describe('bit-select.vue', () => {
  const data = [
    'Washington',
    'Oregon',
    'California',
  ];

  const bitSelect = mountBitSelect({
    propsData: {
      selectData: data,
      inputName: 'test',
      labelText: 'Test',
      stackElements: true,
      erroredField: true,
    },
  });

  const select = bitSelect.find('.bit-input--field');
  const label = bitSelect.find('.bit-input--label');
  const options = bitSelect.findAll('.bit-input--field > option:not([disabled])');

  it('renders a list of data as a select element', () => {
    options.wrappers.every((option) => {
      const result = data.find(dataItem => dataItem === option.text() && dataItem === option.attributes('value'));

      expect(result, `Component rendered item that was not passed in: ${option.text()}`).not.toBeUndefined();
      return true;
    });
  });

  it('applies the class "bit-input--error" when an error is indicated', () => {
    expect(select.classes()).toContain('bit-input--error');
  });

  it('applies the class "bit-input--stacked" when the element is flagged to stack', () => {
    expect(bitSelect.classes()).toContain('bit-input-stacked');
  });

  it('has an associated label', () => {
    expect(select.attributes('id')).toEqual(label.attributes('for'));
  });

  it('emits the selected value to a parent component', () => {
    options.wrappers.every((option, idx) => {
      option.trigger('input');
      expect(bitSelect.emitted('input')[idx]).toEqual([data[idx]]);
      return true;
    });
  });
});
