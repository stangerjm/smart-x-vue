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
  name: "smart-modal",
  props: {
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      focusableEls: undefined,
      firstFocusableEl: undefined,
      lastFocusableEl: undefined,
      focusedElBeforeOpen: undefined,
      selectData: []
    };
  },
  methods: {
    open: function() {
      let Dialog = this;

      this.$el.removeAttribute("aria-hidden");
      this.$el.removeAttribute("style");

      this.focusedElBeforeOpen = document.activeElement;

      this.$el.addEventListener("keydown", function(e) {
        Dialog._handleKeyDown(e);
      });

      this.firstFocusableEl.focus();
    },
    close: function() {
      this.$el.setAttribute("aria-hidden", true);
      this.$el.setAttribute("style", "display: none");

      if (this.focusedElBeforeOpen) {
        this.focusedElBeforeOpen.focus();
      }
    },
    _handleKeyDown: function(e) {
      let Dialog = this;
      let KEY_TAB = 9;
      let KEY_ESC = 27;

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
    addEventListeners: function(openDialogSel, closeDialogSel) {
      let Dialog = this;

      let openDialogEls = document.querySelectorAll(openDialogSel);
      for (let i = 0; i < openDialogEls.length; i++) {
        openDialogEls[i].addEventListener("click", function() {
          Dialog.open();
        });
      }

      let closeDialogEls = document.querySelectorAll(closeDialogSel);
      for (let i = 0; i < closeDialogEls.length; i++) {
        closeDialogEls[i].addEventListener("click", function() {
          Dialog.close();
        });
      }
    }
  },
  mounted: function() {
    let focusableEls = this.$el.querySelectorAll(
      "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex='0']"
    );
    this.focusableEls = Array.prototype.slice.call(focusableEls);

    this.firstFocusableEl = focusableEls[0];
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];

    let navDialogEl = this.$el;

    if (navDialogEl) {
      this.addEventListeners(".open-dialog", ".smart-modal--close");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/sass/global/mixins";
@import "../../styles/sass/global/variables";
@import "../../styles/sass/components/smart/modal/smart-modal";
</style>
