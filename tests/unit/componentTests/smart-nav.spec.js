import { mount } from '@vue/test-utils';
import { createComponentGenerator } from '../helpers';
import SmartNav from '../../../src/components/smart-nav.vue';
import BlockNavList from '../../../src/components/block-navList.vue';

const mountSmartNav = createComponentGenerator(SmartNav, {
  stubs: ['router-link'],
});

const navTitle = 'Test';

const navItems = [
  { linkTitle: 'Home', linkPath: '/home' },
  { linkTitle: 'Profile', linkPath: '/profile' },
  { linkTitle: 'Contact', linkPath: '/contact' },
];

const usr = 'jmst225';

function onSignOut() {}

const smartNav = mountSmartNav({
  navTitle,
  navItems,
  usr,
  onSignOut,
});

describe('smart-nav.vue', () => {
  it('renders a specified title', () => {
    const title = smartNav.find('.smart-nav--title');

    expect(title.text()).toEqual(navTitle);
  });

  it('displays a welcome message with the user name', () => {
    const welcomeMessage = smartNav.find('.smart-nav--userInfo');

    expect(welcomeMessage.text()).toEqual(`Welcome, ${usr}!`);
  });

  it('renders a log out button', () => {
    const logOutBtn = smartNav.find('.smart-nav--signOut');

    expect(logOutBtn.exists()).toBeTruthy();
  });

  it('allows the log out button to be omitted', () => {
    const navWithoutLogout = mountSmartNav({
      navTitle,
      navItems,
      usr,
      excludeLogout: true,
    });

    const logOutBtn = navWithoutLogout.find('.smart-nav--signOut');

    expect(logOutBtn.exists()).toBeFalsy();
  });

  it('only shows user info and sign out button if user is specified', () => {
    const navWithoutUser = mountSmartNav({
      navTitle,
      navItems,
      onSignOut,
    });

    const userContainer = navWithoutUser.find('.smart-nav--headerAside');

    expect(userContainer.exists()).toBeFalsy();
  });

  it('allows sign out logic to be specified', () => {
    const wrapperComponent = mount(
      {
        components: {
          SmartNav,
        },
        template: '<smart-nav navTitle="test" :usr="usr" :navItems="items" :onSignOut="signOut"></smart-nav>',
        methods: {
          signOut() {
            this.testCounter += 1;
          },
        },
        data() {
          return {
            items: navItems,
            usr,
            testCounter: 0,
          };
        },
      },
      {
        stubs: ['router-link'],
      },
    );

    expect(wrapperComponent.vm.testCounter).toEqual(0);

    const signOutBtn = wrapperComponent.find('.smart-nav--signOut');

    signOutBtn.trigger('click');

    expect(wrapperComponent.vm.testCounter).toEqual(1);
  });

  it('renders all nav items passed in', () => {
    const blockNavList = smartNav.find(BlockNavList);

    expect(blockNavList.props('listItems')).toEqual(navItems);
  });
});
