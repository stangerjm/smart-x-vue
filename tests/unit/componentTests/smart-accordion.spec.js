import { createComponentGenerator } from '../helpers';
import SmartAccordion from '../../../src/components/smart-accordion.vue';
import BlockExpandableSection from '../../../src/components/block-expandableSection.vue';

const content = 'Content';
const mountSmartAccordion = createComponentGenerator(SmartAccordion, {
  slots: {
    default: `<div class="accordion-content">${content}</div>`,
  },
});

const title = 'Test';
const collapsedAccordion = mountSmartAccordion({
  title,
});

const expandedAccordion = mountSmartAccordion({
  title,
  expanded: true,
});

const collapsedAccordionButton = collapsedAccordion.find('.smart-accordion--toggle');
const expandedAccordionButton = expandedAccordion.find('.smart-accordion--toggle');

describe('smart-accordion.vue', () => {
  it('renders a title', () => {
    expect(collapsedAccordionButton.text()).toEqual(title);
  });

  it('allows title to be centered', () => {
    const centeredAccordion = mountSmartAccordion({
      title,
      centerTitle: true,
    });

    const centeredButton = centeredAccordion.find('.smart-accordion--toggle');

    expect(centeredButton.classes()).toContain('smart-accordion--centerToggle');
  });

  it('allows expanded state to be set from outside; default is collapsed', () => {
    expect(expandedAccordion.vm.isExpanded).toBeTruthy();
    expect(collapsedAccordion.vm.isExpanded).toBeFalsy();
  });

  it('toggles accordion expand when toggle button is clicked', () => {
    // Start state -> COLLAPSED
    expect(collapsedAccordion.vm.isExpanded).toBeFalsy();

    collapsedAccordionButton.trigger('click');
    expect(collapsedAccordion.vm.isExpanded).toBeTruthy();

    collapsedAccordionButton.trigger('click');
    expect(collapsedAccordion.vm.isExpanded).toBeFalsy();

    // Start state -> EXPANDED
    expect(expandedAccordion.vm.isExpanded).toBeTruthy();

    expandedAccordionButton.trigger('click');
    expect(expandedAccordion.vm.isExpanded).toBeFalsy();

    expandedAccordionButton.trigger('click');
    expect(expandedAccordion.vm.isExpanded).toBeTruthy();
  });

  it('passes content into a block-expandableSection component', () => {
    const blockExpandableSection = collapsedAccordion.find('.block-expandableSection');
    const accordionContent = blockExpandableSection.find('.accordion-content');

    expect(accordionContent.text()).toEqual(content);
  });

  it('allows "watchResize" property to be passed to block-expandableSection', () => {
    const accordionWatchContent = mountSmartAccordion({
      title,
      watchResize: true,
    });

    const blockExpandableSection = accordionWatchContent.find(BlockExpandableSection);

    expect(blockExpandableSection.vm.watchResize).toBeTruthy();
  });
});
