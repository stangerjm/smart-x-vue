import { createComponentGenerator } from '../helpers';
import SmartTabs from '../../../src/components/smart-tabs.vue';

const mountSmartTabs = createComponentGenerator(SmartTabs, {
  slots: {
    default: '<div class="default-content">Default Content</div>',
    TabOne: '<div class="tab-one-content">Tab One Content</div>',
    TabTwo: '<div class="tab-two-content">Tab Two Content</div>',
    TabThree: '<div class="tab-three-content">Tab Three Content</div>',
  },
});

const tabList = ['TabOne', 'TabTwo', 'TabThree'];

const smartTabs = mountSmartTabs({
  tabs: tabList,
  currentTab: 1,
});

const tabs = smartTabs.findAll('.smart-tabs--tab');

const slots = smartTabs.vm.$slots;

const tabElements = tabs.wrappers;

const activeTabClass = 'smart-tabs--activeTab';

describe('smart-tabs.vue', () => {
  it('allows multiple tabs to be rendered with a slot for each tab', () => {
    expect(tabs.length).toEqual(3);

    expect(slots.TabOne).not.toBeUndefined();
    expect(slots.TabTwo).not.toBeUndefined();
    expect(slots.TabThree).not.toBeUndefined();
  });

  it('renders the tab title as title case', () => {
    expect(tabElements[0].text()).toEqual('Tab One');
    expect(tabElements[1].text()).toEqual('Tab Two');
    expect(tabElements[2].text()).toEqual('Tab Three');
  });

  it('allows the current active tab to be changed by clicking', () => {
    tabElements.map((tab) => {
      tab.trigger('click');
      expect(tab.classes()).toContain(activeTabClass);
      return tab;
    });
  });

  it('renders the content on the correct associated tab', () => {
    tabElements[0].trigger('click');
    const tabOneContent = smartTabs.find('.tab-one-content');
    expect(tabOneContent.exists()).toBeTruthy();

    tabElements[1].trigger('click');
    const tabTwoContent = smartTabs.find('.tab-two-content');
    expect(tabTwoContent.exists()).toBeTruthy();

    tabElements[2].trigger('click');
    const tabThreeContent = smartTabs.find('.tab-three-content');
    expect(tabThreeContent.exists()).toBeTruthy();
  });

  it('sets the active tab as the first tab by default', () => {
    const smartTabsDefault = mountSmartTabs({
      tabs: tabList,
    });

    const firstTab = smartTabsDefault.find('.smart-tabs--tab');
    expect(firstTab.classes()).toContain(activeTabClass);
  });

  it('allows the current tab to be set when created', () => {
    const smartTabsWithSecondTabSelected = mountSmartTabs({
      tabs: tabList,
      currentTab: 2,
    });

    const allTabs = smartTabsWithSecondTabSelected.findAll('.smart-tabs--tab');

    const secondTab = allTabs.wrappers[1];
    expect(secondTab.classes()).toContain(activeTabClass);
  });

  it('allows the current tab to be set after created', () => {
    smartTabs.setProps({
      currentTab: 3,
    });

    expect(tabElements[2].classes()).toContain(activeTabClass);

    smartTabs.setProps({
      currentTab: 1,
    });

    expect(tabElements[0].classes()).toContain(activeTabClass);

    smartTabs.setProps({
      currentTab: 2,
    });

    expect(tabElements[1].classes()).toContain(activeTabClass);
  });

  it('set the active tab as the first tab if an invalid current tab index is set', () => {
    const tabsWithInvalidTabNumber = mountSmartTabs({
      tabs: tabList,
      currentTab: 200,
    });

    const firstTab = tabsWithInvalidTabNumber.find('.smart-tabs--tab');

    expect(firstTab.classes()).toContain(activeTabClass);
  });

  it('allows content to be passed into a default slot, which will be shared among all the tabs', () => {
    tabElements.map((tab) => {
      tab.trigger('click');

      const defaultContent = smartTabs.find('.default-content');
      expect(defaultContent.exists()).toBeTruthy();

      return tab;
    });
  });
});
