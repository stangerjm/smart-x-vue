import { createWrapperGenerator } from '../helpers';
import BitBtn from '../../../src/components/bit-btn.vue';

const mountBtn = createWrapperGenerator(BitBtn);

describe('bit-btn.vue', () => {
  // btnStyle
  it('renders the correct style when props.btnStyle is set', () => {
    // Should render each of the below styles
    ['add', 'exit', 'expand', 'reset', 'search', 'clear']
      .every((style) => {
        const wrapper = mountBtn({
          propsData: { btnStyle: style },
        });

        expect(wrapper.classes()).toContain(`bit-btn-${style}`);
        return true;
      });

    // Should not render anything else
    const badStyle = 'bad-value';
    const wrapper = mountBtn({
      propsData: { btnStyle: badStyle },
    });

    expect(wrapper.classes()).not.toContain(`bit-btn-${badStyle}`);
  });

  // btnSize
  it('renders the correct size when props.btnSize is set', () => {
    ['small', 'medium', 'large'].every((size) => {
      const wrapper = mountBtn({
        propsData: { btnSize: size },
      });

      expect(wrapper.classes()).toContain(`bit-btn-${size}`);
      return true;
    });
  });

  // bit-btn-expand
  it('manages an expanded variable when rendered as an expand button, and does NOT have a size attached to it', () => {
    const wrapper = mountBtn({ propsData: { btnStyle: 'expand' } });
    const button = wrapper.find('button');

    // Button should set "expanded" property to true
    // and the text to "-" indicating the associated element can be collapsed
    button.trigger('click');
    expect(wrapper.vm.expanded).toBeTruthy();
    expect(wrapper.text()).toEqual('-');

    // Button should set the "expanded" property back to false
    // and the text to "+" indicating the associated element can be expanded
    button.trigger('click');
    expect(wrapper.vm.expanded).toBeFalsy();
    expect(wrapper.text()).toEqual('+');

    expect(wrapper.classes()).not.toContain('bit-btn-small');
  });
});
