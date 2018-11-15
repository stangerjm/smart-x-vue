import { createWrapperGenerator } from '../helpers';
import BitInput from '../../../src/components/bit-input.vue';

const mountBitInput = createWrapperGenerator(BitInput);

describe('bit-input.vue', () => {
  it('renders a label with a title and associated input box', () => {
    const wrapper = mountBitInput({
      propsData: {
        inputType: 'date',
        labelText: 'test',
      },
    });

    const label = wrapper.find('label');
    const input = wrapper.find('input');

    // Renders the title correctly
    expect(label.text()).toEqual('test');

    // Input and label are associated
    expect(label.attributes('for')).toEqual(input.attributes('id'));
  });

  it('renders a text input element that tracks user input', () => {
    const wrapper = mountBitInput({
      propsData: {
        inputType: 'text',
        labelText: 'test',
      },
    });

    const input = wrapper.find('input');
    input.setValue('test');

    expect(wrapper.emitted('input')[0]).toEqual(['test']);
    expect(input.attributes('type')).toEqual('text');
  });

  it('renders a checkbox that tracks a boolean value', () => {
    const wrapper = mountBitInput({
      propsData: {
        inputType: 'checkbox',
        labelText: 'test',
      },
    });

    const input = wrapper.find('input');
    input.trigger('click');

    expect(wrapper.emitted('input')[0]).toEqual([true]);
    expect(input.attributes('type')).toEqual('checkbox');
  });

  it('renders a text box with a phone number input mask that tracks a valid phone number', () => {
    const wrapper = mountBitInput({
      propsData: {
        inputType: 'phone',
        labelText: 'test',
      },
    });

    const input = wrapper.find('input');

    const phoneNumber = '1234567890';
    const formattedPhoneNumber = '(123) 456-7890';

    input.setValue(phoneNumber);
    expect(wrapper.emitted('input')[0]).toEqual([formattedPhoneNumber]);

    // Input mask should fill the extra places with a placeholder
    const badPhoneNumber = '123456789';

    input.setValue(badPhoneNumber);
    expect(wrapper.emitted('input')[1]).toBeUndefined();

    // Input mask should not allow text, only numbers
    input.setValue('testing phone number');
    expect(wrapper.emitted('input')[2]).toBeUndefined();

    expect(input.attributes('type')).toEqual('text');
  });

  it('renders a password input that tracks user input', () => {
    const wrapper = mountBitInput({
      propsData: {
        inputType: 'password',
        labelText: 'test',
      },
    });

    const input = wrapper.find('input');
    const password = 'test@123';

    input.setValue(password);
    expect(wrapper.emitted('input')[0]).toEqual([password]);

    expect(input.attributes('type')).toEqual('password');
  });

  it('renders a date picker with a date input mask that tracks a valid date', () => {
    const wrapper = mountBitInput({
      propsData: {
        inputType: 'date',
        labelText: 'test',
      },
    });

    const input = wrapper.find('input');

    const date = '01/01/2001';
    const expectedDate = new Date(date);

    input.setValue(date);
    expect(wrapper.emitted('input')[0]).toEqual([expectedDate]);

    input.setValue('01/01/200');
    expect(wrapper.emitted('input')[1]).toBeUndefined();

    input.setValue('test');
    expect(wrapper.emitted('input')[2]).toBeUndefined();

    input.setValue('12345');
    expect(wrapper.emitted('input')[3]).toBeUndefined();
  });
});
