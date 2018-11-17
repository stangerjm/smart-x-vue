import { createComponentGenerator } from '../helpers';
import BlockActionContainer from '../../../src/components/block-actionContainer.vue';

const getBlockActionContainer = createComponentGenerator(BlockActionContainer, { stubs: ['router-link'] });

describe('block-actionContainer.vue', () => {
  it('renders a details icon if flagged to do so', () => {
    const blockActionContainer = getBlockActionContainer({
      defaultCtx: 'test',
      itemId: 1,
      detailsBtn: true,
      editBtn: false,
      deleteBtn: false,
    });

    expect(blockActionContainer.find('.bit-icon-details').exists()).toBeTruthy();
    expect(blockActionContainer.find('.bit-icon-edit').exists()).toBeFalsy();
    expect(blockActionContainer.find('.bit-icon-delete').exists()).toBeFalsy();
  });

  it('renders a edit icon if flagged to do so', () => {});

  it('renders a delete icon if flagged to do so', () => {});

  it('renders a details link based off of the details context', () => {});

  it('renders a edit link based off of the details context', () => {});

  it('renders a delete link based off of the details context', () => {});

  it('renders a link link based off the default context if details context is not passed in', () => {});

  it('renders a link link based off the default context if edit context is not passed in', () => {});

  it('renders a link link based off the default context if delete context is not passed in', () => {});
});
