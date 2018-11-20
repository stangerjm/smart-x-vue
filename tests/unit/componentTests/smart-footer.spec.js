import { createComponentGenerator } from '../helpers';
import SmartFooter from '../../../src/components/smart-footer.vue';

const content = 'Some content';
const mountSmartFooter = createComponentGenerator(SmartFooter, {
  slots: {
    default: `<div class="footer-content">${content}</div>`,
  },
});

const organization = 'Test organization';
const footer = mountSmartFooter({
  organization,
});

const footerContent = footer.find('.smart-footer--content');

describe('smart-footer.vue', () => {
  it('displays a copyright sign, the current year, and the organization passed in', () => {
    const currentYear = new Date().getFullYear();
    expect(footerContent.text()).toEqual(`© ${currentYear} ${organization}`);
  });

  it('allows content to be passed into a slot', () => {
    const contentContainer = footer.find('.footer-content');
    expect(contentContainer.text()).toEqual(content);
  });
});
