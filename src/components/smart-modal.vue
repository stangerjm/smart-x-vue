<template>

  <!-- Modal wrapper -->
  <section class="smart-modal"
           role="dialog"
           v-if="value">

    <!-- Container for all modal content -->
    <div class="smart-modal--content"
         :class="{ 'smart-modal--centeredContent': centerModal }">

      <!-- Modal header -->
      <section class="smart-modal--head">

        <!-- Close button -->
        <button class="smart-modal--close" @click="closeModal">CLOSE</button>

        <!-- Modal title -->
        <h2 class="smart-modal--title" v-if="modalTitle">{{modalTitle}}</h2>
      </section>

      <!-- Modal body -->
      <section class="smart-modal--body">

        <!-- Slot for content -->
        <slot></slot>

      </section>

    </div>

  </section>

</template>

<script>
export default {
  name: 'smart-modal',
  props: {
    modalTitle: {
      type: String,
    },
    value: {
      type: Boolean,
      required: true,
    },
    centerModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focusableEls: null,
      firstFocusableEl: null,
      lastFocusableEl: null,
      focusedElBeforeOpen: null,
      modal: null,
    };
  },
  watch: {
    value(isOpen) {
      if (isOpen) {
        this.$nextTick(() => {
          this.onOpen();
        });
        return;
      }

      this.onClose();
    },
  },
  methods: {
    onOpen() {
      if (this.$el.querySelectorAll == null) {
        return;
      }

      const focusableEls = this.$el
        .querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

      this.focusableEls = [...focusableEls];

      const [firstFocusableEl] = this.focusableEls;
      const [lastFocusableEl] = this.focusableEls.slice(-1);

      this.firstFocusableEl = firstFocusableEl;
      this.lastFocusableEl = lastFocusableEl;

      this.focusedElBeforeOpen = document.activeElement;

      this.firstFocusableEl.focus();

      this.$el.addEventListener('keydown', (e) => {
        this.handleKeyDown(e);
      });
    },
    onClose() {
      if (this.focusedElBeforeOpen) {
        this.focusedElBeforeOpen.focus();
      }
    },
    closeModal() {
      this.$emit('input', !this.value);
    },
    handleKeyDown(e) {
      const Dialog = this;
      const KEY_TAB = 9;
      const KEY_ESC = 27;

      function handleBackwardTab() {
        if (document.activeElement === Dialog.firstFocusableEl) {
          e.preventDefault();
          Dialog.lastFocusableEl.focus();
        }
      }

      function handleForwardTab() {
        if (document.activeElement === Dialog.lastFocusableEl) {
          e.preventDefault();
          Dialog.firstFocusableEl.focus();
        }
      }

      switch (e.keyCode) {
        case KEY_TAB:
          if (Dialog.focusableEls.length === 1) {
            e.preventDefault();
            break;
          }
          if (e.shiftKey) {
            handleBackwardTab();
          } else {
            handleForwardTab();
          }
          break;

        case KEY_ESC:
          Dialog.closeModal();
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.$nextTick(() => {
      // Get modal from template
      const modal = this.$el;

      // Remove modal from this context
      this.$el.remove();

      // Append to body
      document.body.appendChild(modal);
    });
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/modal/smart-modal';
</style>
