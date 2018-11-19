import { createComponentGenerator } from '../helpers';
import BlockNavList from '../../../src/components/block-navList.vue';

const mountBlockNavList = createComponentGenerator(BlockNavList, {
  stubs: ['router-link'],
});

const listItems = [
  { linkTitle: 'Home', linkPath: '/home' },
  { linkTitle: 'Profile', linkPath: '/profile' },
  { linkTitle: 'Contact', linkPath: '/contact' },
  {
    linkTitle: 'Links',
    linkPath: '#',
    inlineItems: [
      { linkTitle: 'More', linkPath: '/more' },
      { linkTitle: 'Misc', linkPath: '/misc' },
    ],
  },
];

const wrapper = mountBlockNavList({
  listItems,
});

describe('block-navList.vue', () => {
  it('correctly renders the nav list items passed in', () => {
    const dropListItems = wrapper.findAll('.block-navList--item');
    expect(dropListItems.length).toEqual(Object.keys(listItems).length);

    dropListItems.wrappers.every((listItem) => {
      const routerLinkStub = listItem.find('router-link-stub');
      const toAttribute = routerLinkStub.attributes('to');
      const innerText = routerLinkStub.text();

      const result = listItems.find(dropItem =>
        dropItem.linkPath === toAttribute &&
        dropItem.linkTitle === innerText);

      expect(result, `Component did not render expected link path: "${toAttribute}" or expected link title: "${innerText}"`).not.toBeUndefined();
      return true;
    });
  });

  it('renders any sub-items as bit-dropList components', () => {
    const dropListExpand = wrapper.find('.bit-dropList');
    expect(dropListExpand.exists()).toBeTruthy();
  });

  it('renders a mobile expand button', () => {
    const mobileExpand = wrapper.find('.block-navList--expand');
    expect(mobileExpand.exists()).toBeTruthy();
  });

  it('shows the nav on mobile screen if local "isExpanded" property is true', () => {
    const mobileExpand = wrapper.find('.block-navList--expand');
    const navList = wrapper.find('.block-navList--list');

    // Should not be shown by default
    expect(navList.classes()).not.toContain('nav-show');

    // Should show when expand button is clicked
    mobileExpand.trigger('click');
    expect(navList.classes()).toContain('nav-show');

    // Should hide when expand button is clicked again
    mobileExpand.trigger('click');
    expect(navList.classes()).not.toContain('nav-show');
  });
});
