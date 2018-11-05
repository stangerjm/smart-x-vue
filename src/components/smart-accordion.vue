<template>
  <section class="smart-accordion">
    <button :class="[
              'smart-accordion--toggle',
              centerTitle ? 'smart-accordion--centerToggle' : '',
              isExpanded ? 'is-expanded' : '',
            ]"
            type="button"
            @click="toggleExpand">
      {{title}}
    </button>
    <block-expandable-section class="smart-accordion--content"
                              :is-expanded="isExpanded"
                              :watch-resize="watchResize">
      <slot></slot>
    </block-expandable-section>
  </section>
</template>

<script>
// import { fillCustomEvent } from '../polyfill';
// const fill = fillCustomEvent || function fillEvent() {};
// fill();
/* Force page to re-render height. This prevents a bug on
 * small screens where the width causes the scroll bar to
 * interfere with the height. This causes the container to
 * render short and the inner content is hidden.
 */
// setTimeout(() => {
//   window.dispatchEvent(new CustomEvent('resize'));
// }, 500);
import BlockExpandableSection from './block-expandableSection.vue';
/**
 * A component that renders a responsive accordion that can contain any HTML content.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-accordion',
  components: {
    BlockExpandableSection,
  },
  props: {
    /**
     * The title that will display before the accordion.
     */
    title: {
      type: String,
      default: 'Click to expand',
    },
    /**
     * Flag to optionally center title
     */
    centerTitle: {
      type: Boolean,
      default: false,
    },
    /**
     * Flag indicating that the content container should watch for resize
     */
    watchResize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    /**
     * Toggles the accordion to expand or collapse.
     */
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/accordion/smart-accordion';
</style>
