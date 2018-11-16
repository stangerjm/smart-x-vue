import { createWrapperGenerator } from '../helpers';
import BitLoading from '../../../src/components/bit-loading.vue';

const mountBitLoading = createWrapperGenerator(BitLoading);

describe('bit-loading.vue', () => {
  it('renders a loading spinner', () => {
    const wrapper = mountBitLoading();
    expect(wrapper.classes()).toContain('bit-loading');
  });
});
