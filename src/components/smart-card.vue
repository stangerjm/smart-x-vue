<template>
  <section class="smart-card">

    <!-- Render the header with title and expand button -->
    <header class="smart-card--header">

      <!-- Render the card title -->
      <p class="smart-card--title">{{cardTitle}}</p>

      <!-- Render the expand button -->
      <bit-btn btn-style="expand"
               v-if="allowExpand"
               class="smart-card--toggle"
               :is-expanded="isExpanded"
               @click.native="toggle">
      </bit-btn>

    </header>

    <!-- Render content section -->
    <block-expandable-section :is-expanded="isExpanded" :watch-resize="watchResize">

      <!-- Allow content to be passed in from outside -->
      <main class="smart-card--content">

        <!-- @slot The content for the card -->
        <slot name="card-content"></slot>

      </main>

      <!-- Render info section -->
      <aside class="smart-card--info" v-if="hasInfo">

        <!-- Render card description -->
        <p class="smart-card--description">{{cardDescription}}</p>

      </aside>

      <!-- Allow actions to be passed in -->
      <footer class="smart-card--actions" ref="actions" v-if="hasActions">

        <!-- @slot Allows content to be passed into the actions container -->
        <slot name="card-actions"></slot>

      </footer>

    </block-expandable-section>

  </section>
</template>

<script>
import BitBtn from './bit-btn.vue';
import BlockExpandableSection from './block-expandableSection.vue';

/**
 * A component that renders a card with content, a title and description, and optional actions
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-card',
  components: {
    BlockExpandableSection,
    BitBtn,
  },
  props: {
    /**
     * Title of the card
     */
    cardTitle: {
      type: String,
    },
    /**
     * Description of the card
     */
    cardDescription: {
      type: String,
    },
    /**
     * Flag indicating that the starting state of the card should be expanded
     */
    expanded: {
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
    /**
     * Flag to optionally omit the expand functionality
     */
    allowExpand: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * Local copy of "isExpanded" property
       */
      isExpanded: this.expanded,
      /**
       * Flag indicating that the actions container should be rendered
       */
      hasActions: true,
    };
  },
  computed: {
    /**
     * Determines if the info container should be rendered
     */
    hasInfo() {
      return this.cardDescription != null && this.cardDescription !== '';
    },
  },
  methods: {
    /**
     * Toggles the content between expanded and collapsed state
     */
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
  },
  mounted() {
    // Checks the actions container for items, and will remove from DOM if nothing is found
    if (this.$refs.actions.childNodes.length < 1) {
      this.hasActions = false;
    }
  },
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/smart/card/smart-card";
</style>
