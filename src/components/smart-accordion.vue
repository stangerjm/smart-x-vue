<template>
  <section class="smart-accordion">
    <button :class="['smart-accordion--toggle', isExpanded ? 'is-expanded' : '']"
            type="button"
            @click="toggleExpand">
      {{title}}
    </button>
    <article class="smart-accordion--content">
      <!-- @slot Allows content to be passed into the expanded portion. -->
      <slot></slot>
    </article>
  </section>
</template>

<script>
import { fillCustomEvent } from '../polyfill/polyfill';

fillCustomEvent();
/**
 * A component that renders a responsive accordion that can contain any HTML content.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-accordion',
  props: {
    /**
     * The title that will display before the accordion.
     */
    title: {
      type: String,
      default: 'Click to expand',
    },
  },
  data() {
    return {
      /**
       * Flag indicating if the accordion is expanded
       */
      isExpanded: false,
      /**
       * Reference to the accordion's content container element
       */
      contentContainer: undefined,
      /**
       * Height of the previous rendering of the accordion
       */
      previousHeight: 0,
    };
  },
  methods: {
    /**
     * Toggles the accordion to expand or collapse.
     */
    toggleExpand() {
      if (!this.isExpanded) {
        this.isExpanded = true;
        this.expandData();

        /* Force page to re-render height. This prevents a bug on
         * small screens where the width causes the scroll bar to
         * interfere with the height. This causes the container to
         * render short and the inner content is hidden.
         */
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('resize'));
        }, 500);
      } else {
        this.collapseData();
        this.isExpanded = false;
      }
    },
    /**
     * Expands the accordion relative to the combined height of each of its children.
     */
    expandData() {
      const { contentContainer } = this;

      // loop through each child and add the height of each
      const totalHeight = [...contentContainer.childNodes].reduce((accumulator, contentItem) => {
        const itemHeight = contentItem.offsetHeight;
        if (itemHeight != null) {
          return accumulator + itemHeight;
        }

        return accumulator;
      }, 0);

      // do not update DOM unless the height needs to be updated
      if (this.previousHeight !== totalHeight) {
        contentContainer.style.height = `${totalHeight}px`;
        this.previousHeight = totalHeight;
      }
    },
    /**
     * Collapses the accordion by setting the container to have no height.
     */
    collapseData() {
      const { contentContainer } = this;
      contentContainer.style.height = '0px';
      this.previousHeight = 0;
    },
    /**
     * Event handler that will continually resize the container if it is expanded.
     */
    handleResize() {
      if (this.isExpanded) {
        this.expandData();
      }
    },
  },
  /**
   * Setup an event listener on window resize to resize the UI if needed.
   */
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.contentContainer = this.$el.querySelector('.smart-accordion--content');
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/accordion/smart-accordion';
</style>
