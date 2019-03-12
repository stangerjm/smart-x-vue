import { createWrapperGenerator } from '../helpers';
import DropList from '../../../src/components/bit-dropList.vue';

const mountDropList = createWrapperGenerator(DropList);

describe('bit-dropList.vue', () => {
  it('renders all of the items passed in', () => {
    const dropItems = [
      { linkTitle: 'Home', linkPath: '/home' },
      { linkTitle: 'Profile', linkPath: '/profile' },
      { linkTitle: 'Contact', linkPath: '/contact' },
      { linkTitle: 'About', linkPath: '/about' },
    ];

    const wrapper = mountDropList({
      propsData: {
        dropItems,
      },
      stubs: ['router-link'],
    });

    const dropListItems = wrapper.findAll('.bit-dropList--item');
    expect(dropListItems.length).toEqual(Object.keys(dropItems).length);

    dropListItems.wrappers.every((listItem) => {
      const routerLinkStub = listItem.find('router-link-stub');
      const toAttribute = routerLinkStub.attributes('to');
      const innerText = routerLinkStub.text();

      const result = dropItems.find(dropItem =>
        dropItem.linkPath === toAttribute &&
        dropItem.linkTitle === innerText);

      expect(result, `Component did not render expected link path: "${toAttribute}" or expected link title: "${innerText}"`).not.toBeUndefined();
      return true;
    });
  });
});
