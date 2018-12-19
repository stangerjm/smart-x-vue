import { createComponentGenerator } from '../helpers';
import BlockExpandableSection from '../../../src/components/block-expandableSection.vue';

const content = '<h1 class="test-content">Hello there</h1>';

const mountBlockExpandableSection = createComponentGenerator(BlockExpandableSection, {
  attachToDocument: true,
  slots: {
    default: content,
  },
});

const blockExpandableSection = mountBlockExpandableSection({
  isExpanded: true,
});

describe('block-expandableSection.vue', () => {
  it('allows content to be passed in', () => {
    const testContent = blockExpandableSection.find('.test-content');

    expect(testContent.html()).toEqual(content);
  });

  it('allows expanded state to be set from the outside', () => {
    expect(blockExpandableSection.props('isExpanded')).toEqual(true);

    blockExpandableSection.setProps({ isExpanded: false });
    expect(blockExpandableSection.props('isExpanded')).toEqual(false);

    blockExpandableSection.setProps({ isExpanded: true });
    expect(blockExpandableSection.props('isExpanded')).toEqual(true);
  });
});
