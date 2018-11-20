import { createComponentGenerator } from '../helpers';
import SmartCard from '../../../src/components/smart-card.vue';
import BlockExpandableSection from '../../../src/components/block-expandableSection.vue';

const cardContent = 'This is a test';
const cardAction = '<button class="card-action">Do an action</button>';
const mountSmartCard = createComponentGenerator(SmartCard, {
  slots: {
    'card-content': `<p class="card-content">${cardContent}</p>`,
    'card-actions': cardAction,
  },
});

const mountSmartCardWithoutActions = createComponentGenerator(SmartCard);

const cardTitle = 'Test';
const cardDescription = 'This is a test';

const collapsedCard = mountSmartCard({
  cardTitle,
  cardDescription,
});

const collapsedTopTitle = collapsedCard.find('.smart-card--collapsedTitle');
const collapsedContentTitle = collapsedCard.find('.smart-card--title');
const collapsedCardButton = collapsedCard.find('.smart-card--toggle');

const expandedCard = mountSmartCard({
  cardTitle,
  cardDescription,
  expanded: true,
});

const expandedCardButton = expandedCard.find('.smart-card--toggle');

describe('smart-card.vue', () => {
  it('renders a title for the card', () => {
    expect(collapsedTopTitle.text()).toEqual(cardTitle);
    expect(collapsedContentTitle.text()).toEqual(cardTitle);
  });

  it('allows the expanded state to be set from the outside', () => {
    expect(collapsedCard.vm.isExpanded).toBeFalsy();
    expect(expandedCard.vm.isExpanded).toBeTruthy();
  });

  it('renders an expand button that toggles expanded state', () => {
    // Start state -> COLLAPSED
    expect(collapsedCard.vm.isExpanded).toBeFalsy();

    collapsedCardButton.trigger('click');
    expect(collapsedCard.vm.isExpanded).toBeTruthy();

    collapsedCardButton.trigger('click');
    expect(collapsedCard.vm.isExpanded).toBeFalsy();

    // Start state -> EXPANDED
    expect(expandedCard.vm.isExpanded).toBeTruthy();

    expandedCardButton.trigger('click');
    expect(expandedCard.vm.isExpanded).toBeFalsy();

    expandedCardButton.trigger('click');
    expect(expandedCard.vm.isExpanded).toBeTruthy();
  });

  it('passes expanded state to block-expandableSection', () => {
    const blockExpandableSection = expandedCard.find(BlockExpandableSection);

    expect(blockExpandableSection.vm.isExpanded).toBeTruthy();
  });

  it('passes watchResize property to block-expandableSection', () => {
    const cardWatchResize = mountSmartCard({
      cardTitle,
      cardDescription,
      watchResize: true,
    });
    const blockExpandableSection = cardWatchResize.find(BlockExpandableSection);

    expect(blockExpandableSection.vm.watchResize).toBeTruthy();
  });

  it('allows content to be passed into a "card-content" slot', () => {
    const contentContainer = expandedCard.find('.smart-card--content');
    const content = contentContainer.find('.card-content');

    expect(content.text()).toEqual(cardContent);
  });

  it('renders a description for the card', () => {
    const cardDescriptionContainer = expandedCard.find('.smart-card--description');

    expect(cardDescriptionContainer.text()).toEqual(cardDescription);
  });

  it('allows actions to be passed into a "card-actions" slot', () => {
    const cardActionsContainer = expandedCard.find('.smart-card--actions');
    const action = cardActionsContainer.find('.card-action');

    expect(action.html()).toEqual(cardAction);
  });

  it('will not render an action container if no actions are passed into the "card-actions" slot', (done) => {
    const cardWithoutActions = mountSmartCardWithoutActions({
      cardTitle,
      cardDescription,
    });

    // Wait for card's mounted() method to update DOM
    cardWithoutActions.vm.$nextTick(async () => {
      expect(cardWithoutActions.find('.smart-card--actions').exists()).toBeFalsy();
      await done();
    });
  });
});
