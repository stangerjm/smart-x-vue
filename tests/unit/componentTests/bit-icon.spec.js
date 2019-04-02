import { createWrapperGenerator } from '../helpers';
import BitIcon from '../../../src/components/bit-icon.vue';

const mountIcon = createWrapperGenerator(BitIcon);

describe('bit-icon.vue', () => {
  it('renders the correct style when props.iconType is set', () => {
    // Should render each of the below styles
    ['user', 'sort', 'delete', 'details', 'edit', 'search', 'exit', 'logout', 'reset']
      .every((type) => {
        const wrapper = mountIcon({
          propsData: { iconType: type },
        });

        expect(wrapper.classes()).toContain(`bit-icon-${type}`);
        return true;
      });

    // Should not render anything else
    const badType = 'bad-value';
    const wrapper = mountIcon({
      propsData: { iconType: badType },
    });

    expect(wrapper.classes()).toContain('bit-icon-error');
  });
});
