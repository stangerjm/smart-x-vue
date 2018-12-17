import { createComponentGenerator } from '../helpers';
import SmartSection from '../../../src/components/smart-section.vue';

const content = '<div class="section-content">Test</div>';

const mountSmartSection = createComponentGenerator(SmartSection, {
  slots: {
    default: content,
  },
});

const sectionTitle = 'Test';

const smartSection = mountSmartSection({
  sectionTitle,
});

describe('smart-section.vue', () => {
  it('renders a title if one is passed in', () => {
    const title = smartSection.find('.smart-section--title');

    expect(title.text()).toEqual(sectionTitle);
  });

  it('renders a styled section with any content passed in', () => {
    const sectionContent = smartSection.find('.section-content');

    expect(sectionContent.html()).toEqual(content);
  });
});
