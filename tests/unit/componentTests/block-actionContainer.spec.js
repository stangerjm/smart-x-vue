import { createComponentGenerator } from '../helpers';
import BlockActionContainer from '../../../src/components/block-actionContainer.vue';

const getBlockActionContainerWithCustomActions = createComponentGenerator(BlockActionContainer, {
  stubs: ['router-link'],
  scopedSlots: {
    actionContainer:
      `<div class="custom-action" slot-scope="{ getActionPath, itemId, context }">
        <a class="custom-action--edit" :href="getActionPath(context, 'edit', itemId)">Edit</a>
        <a class="custom-action--delete" :href="getActionPath(context, 'delete', itemId)">Delete</a>
        <a class="custom-action--details" :href="getActionPath(context, 'details', itemId)">Details</a>
       </div>`,
  },
});

const getBlockActionContainer = createComponentGenerator(BlockActionContainer, { stubs: ['router-link'] });

const actionContainer = getBlockActionContainer({
  itemId: 1,
  defaultContext: 'asdf',
});

describe('block-actionContainer.vue', () => {
  it('renders edit, details, and delete buttons by default', () => {
    const editBtn = actionContainer.find('.block-actionContainer--edit');
    const deleteBtn = actionContainer.find('.block-actionContainer--delete');
    const detailsBtn = actionContainer.find('.block-actionContainer--details');

    expect(editBtn.attributes('to')).toEqual('/asdf/edit/1');
    expect(deleteBtn.attributes('to')).toEqual('/asdf/delete/1');
    expect(detailsBtn.attributes('to')).toEqual('/asdf/details/1');
  });

  it('renders content in an "actionContainer" slot which exposes the item id, and a link building function', () => {
    const customActionContainer = getBlockActionContainerWithCustomActions({
      itemId: 1,
      defaultContext: 'test',
    });

    const editBtn = customActionContainer.find('.custom-action--edit');
    const deleteBtn = customActionContainer.find('.custom-action--delete');
    const detailsBtn = customActionContainer.find('.custom-action--details');

    expect(editBtn.attributes('href')).toEqual('/test/edit/1');
    expect(deleteBtn.attributes('href')).toEqual('/test/delete/1');
    expect(detailsBtn.attributes('href')).toEqual('/test/details/1');
  });
});
