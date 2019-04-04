import { mount } from '@vue/test-utils';

import { Click } from '../helpers';
import SmartModal from '../../../src/components/smart-modal.vue';

const modalWrapper = mount({
  components: {
    SmartModal,
  },
  template: `
    <div class="modal-test">
      <smart-modal modal-title="test" v-model="isOpen">
        <h1 class="modal-test--content">Hello</h1>

        <button class="modal-test--btn">Test</button>
      </smart-modal>

      <button class="modal-test--open" @click="openModal">Open</button>
    </div>
  `,
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
  },
}, {
  attachToDocument: true,
});

function openModal(smartModal) {
  const openModalBtn = smartModal.find('.modal-test--open');

  Click(openModalBtn);
}

describe('smart-modal.vue', () => {
  it('allows open state to be managed internally and externally', () => {
    // Modal can be opened from the outside
    const openModalBtn = modalWrapper.find('.modal-test--open');

    Click(openModalBtn);

    const modal = modalWrapper.find('.smart-modal');

    expect(modal.exists()).toEqual(true);

    // Modal can be closed from the inside, and the outside value updates
    const closeModalBtn = modalWrapper.find('.smart-modal--close');

    Click(closeModalBtn);

    const closedModal = modalWrapper.find('.smart-modal');

    expect(closedModal.exists()).toEqual(false);
    expect(modalWrapper.vm.isOpen).toEqual(false);
  });

  it('allows content to be passed in', () => {
    openModal(modalWrapper);

    const content = modalWrapper.find('.modal-test--content');

    expect(content.exists()).toEqual(true);
  });

  it('sets focus to the first focusable element in the modal', () => {
    openModal(modalWrapper);

    const closeBtn = modalWrapper.find('.smart-modal--close');

    expect(document.activeElement).toEqual(closeBtn.element);
  });
});
