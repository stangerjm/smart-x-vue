<template>
  <section class="smart-card">

    <!-- Render the header with title and expand button -->
    <header class="smart-card--header">

      <!-- Render the card title -->
      <p :class="[isExpanded
                    ? 'smart-card--hiddenTitle'
                    : 'smart-card--collapsedTitle'
                  ]">
        {{cardTitle}}
      </p>

      <!-- Render the expand button -->
      <bit-btn btn-style="expand"
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
      <aside class="smart-card--info">

        <!-- Render card title -->
        <p class="smart-card--title">{{cardTitle}}</p>

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
     * Will display towards bottom of expanded card, and towards the top of collapsed card
     */
    cardTitle: {
      type: String,
      required: true,
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
