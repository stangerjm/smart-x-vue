import {createComponentGenerator} from '../helpers';
import LayoutMain from '../../../src/components/layout-main.vue';

const mountLayoutMain = createComponentGenerator(LayoutMain, {
  scopedSlots: {
    header: '<div class="test-header"></div>',
    search: '<div class="test-search"></div>',
    content: '<div class="test-content"></div>',
    footer: '<div class="test-footer"></div>',
  },
});

const layoutMain = mountLayoutMain();

describe('layout-main.vue', () => {
  it('applies appropriate container classes to ensure correct layout', () => {
    expect(layoutMain.classes()).toContain('layout-grid');
    expect(layoutMain.classes()).toContain('layout-main');
  });

  it('provides a header slot', () => {
    const header = layoutMain.find('.layout-main--nav');
    expect(header.find('.test-header').exists()).toBeTruthy();
  });

  it('provides a search slot', () => {
    const header = layoutMain.find('.layout-main--search');
    expect(header.find('.test-search').exists()).toBeTruthy();
  });

  it('provides a content slot', () => {
    const header = layoutMain.find('.layout-main--content');
    expect(header.find('.test-content').exists()).toBeTruthy();
  });

  it('provides a footer slot', () => {
    const header = layoutMain.find('.layout-main--footer');
    expect(header.find('.test-footer').exists()).toBeTruthy();
  });
});
