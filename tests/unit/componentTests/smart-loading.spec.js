import { createComponentGenerator } from '../helpers';
import SmartLoading from '../../../src/components/smart-loading.vue';
import BitLoading from '../../../src/components/bit-loading.vue';

const mountSmartLoading = createComponentGenerator(SmartLoading, {
  slots: {
    default: '<h1 class="test-content">Test</h1>',
  },
});

const smartLoading = mountSmartLoading();

describe('smart-loading.vue', () => {
  it('allows content to be passed in', () => {
    const content = smartLoading.find('.test-content');

    expect(content.exists()).toBeTruthy();
  });

  it('does not render loading spinner by default', () => {
    const loadingSpinner = smartLoading.find(BitLoading);

    expect(loadingSpinner.exists()).toBeFalsy();
    expect(smartLoading.classes()).not.toContain('smart-loading-active');
  });

  it('tracks a loading state flag that conditionally renders a bit-loading component', () => {
    const smartLoadingWithLoadingState = mountSmartLoading({
      loading: true,
    });

    const bitLoading = smartLoadingWithLoadingState.find(BitLoading);

    expect(bitLoading.exists()).toBeTruthy();
    expect(smartLoadingWithLoadingState.classes()).toContain('smart-loading-active');
  });
});
