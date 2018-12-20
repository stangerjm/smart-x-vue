<template>
  <section class="smart-modal"
           role="dialog"
           style="display: none">
    <div class="smart-modal--content">
      <header class="smart-modal--head">
        <button class="smart-modal--close">CLOSE</button>
        <h2 class="smart-modal--title">{{modalTitle}}</h2>
      </header>
      <main class="smart-modal--body">
        <slot></slot>
      </main>
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
  },
  data() {
    return {
      focusableEls: null,
      firstFocusableEl: null,
      lastFocusableEl: null,
      focusedElBeforeOpen: null,
      selectData: [],
    };
  },
  methods: {
    open() {
      const Dialog = this;

      this.$el.removeAttribute('aria-hidden');
      this.$el.removeAttribute('style');

      this.focusedElBeforeOpen = document.activeElement;

      this.$el.addEventListener('keydown', (e) => {
        Dialog.handleKeyDown(e);
      });

      this.firstFocusableEl.focus();
    },
    close() {
      this.$el.setAttribute('aria-hidden', true);
      this.$el.setAttribute('style', 'display: none');

      if (this.focusedElBeforeOpen) {
        this.focusedElBeforeOpen.focus();
      }
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
          Dialog.close();
          break;
        default:
          break;
      }
    },
    addEventListeners(openDialogSel, closeDialogSel) {
      const Dialog = this;

      const openDialogEls = document.querySelectorAll(openDialogSel);
      for (let i = 0; i < openDialogEls.length; i += 1) {
        openDialogEls[i].addEventListener('click', () => {
          Dialog.open();
        });
      }

      const closeDialogEls = document.querySelectorAll(closeDialogSel);
      for (let i = 0; i < closeDialogEls.length; i += 1) {
        closeDialogEls[i].addEventListener('click', () => {
          Dialog.close();
        });
      }
    },
  },
  mounted() {
    const focusableEls = this.$el.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    this.focusableEls = Array.prototype.slice.call(focusableEls);

    // eslint-disable-next-line
    this.firstFocusableEl = focusableEls[0];
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];

    const navDialogEl = this.$el;

    if (navDialogEl) {
      this.addEventListeners('.open-dialog', '.smart-modal--close');
    }
  },
};
</script>

<style scoped lang='scss'>
@import '../../styles/sass/global/mixins';
@import '../../styles/sass/global/variables';
@import '../../styles/sass/components/smart/modal/smart-modal';
</style>
