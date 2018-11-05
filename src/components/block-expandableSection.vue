<template>
  <section class="block-expandableSection" ref="content">
    <slot></slot>
  </section>
</template>

<script>
import EventBus from '../global/EventCenter/EventBus';

export default {
  name: 'block-expandableSection',
  props: {
    /**
     * Flag indicating if the section should be expanded
     */
    isExpanded: {
      type: Boolean,
      required: true,
    },
    /**
     * Flag indicating that the component should resize frequently
     */
    watchResize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * Height of the previous rendering of the accordion
       */
      previousHeight: 0,
    };
  },
  methods: {
    /**
     * Expands the accordion relative to the combined height of each of its children.
     */
    expand() {
      this.previousHeight = this.expandElement(this.$refs.content, this.previousHeight);
    },
    /**
     * Expands an element by calculating the total height of all its children.
     * Returns the height the element was set to.
     * @param contentContainer
     * @param previousHeight
     * @returns {number}
     */
    expandElement(contentContainer, previousHeight) {
      if (contentContainer == null) {
        return 0;
      }

      /**
       * Reducing function that calculates the total height of an element and its children
       * @param accumulator
       * @param contentItem
       * @returns {*}
       */
      function getHeight(accumulator, contentItem) {
        const itemHeight = contentItem.offsetHeight;
        if (itemHeight != null) {
          return accumulator + itemHeight;
        }

        return accumulator;
      }

      const totalHeight = [...contentContainer.childNodes].reduce(getHeight, 0);

      // do not update DOM unless the height needs to be updated
      if (previousHeight !== totalHeight) {
        contentContainer.style.height = `${totalHeight}px`;
      }

      return totalHeight;
    },
    /**
     * Collapses the accordion by setting the container to have no height.
     */
    collapseData() {
      const contentContainer = this.$refs.content;
      contentContainer.style.height = '0px';
      this.previousHeight = 0;
    },
    /**
     * Event handler that will continually resize the container if it is expanded.
     */
    handleResize() {
      if (this.isExpanded) {
        this.expand();
      }
    },
    toggle() {
      if (this.isExpanded) {
        this.expand();
      } else {
        this.collapseData();
      }
    },
    /**
     * Starts a loop that will resize the element every 500ms
     */
    watchForResize() {
      this.toggle();
      setTimeout(() => { this.watchForResize(); }, 500);
    },
  },
  watch: {
    isExpanded() {
      this.toggle();
    },
  },
  /**
   * Setup an event listener on window resize to resize the UI if needed.
   */
  created() {
    window.addEventListener('resize', this.handleResize);
    EventBus.$on('elementResize', this.handleResize);
  },
  mounted() {
    // Resize immediately to ensure all components are proper size.
    this.toggle();

    // Set up loop to watch for resize if "watchResize" flag is set to true
    if (this.watchResize) {
      this.watchForResize();
    }
  },
  updated() {
    // Resize whenever a DOM update is triggered.
    this.toggle();
  },
};
</script>

<style scoped lang="scss">
@import '../styles/sass/components/block/expandableSection/block-expandableSection';
</style>
