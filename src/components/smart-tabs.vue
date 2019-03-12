<template>
  <section class="smart-tabs">

    <!-- Tab navigation -->
    <nav class="smart-tabs--nav">

      <!-- List of tabs -->
      <ul class="smart-tabs--tabList">

        <!-- Render each tab passed into the tabs property and set active tab -->
        <li class="smart-tabs--tab"
            :class="[ tab === activeTab ? 'smart-tabs--activeTab' : '' ]"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="changeTab(index)">
          {{tab | toTitleCase}}
        </li>

      </ul>

    </nav>

    <!-- Container for all content -->
    <article class="smart-tabs--content">

      <!-- @slot Default slot which contains content shared between all tabs -->
      <slot></slot>

      <!-- Render a slot corresponding to each tab above.
          Only render if the current tab is the active tab -->
      <slot v-for="tab in tabs" :name="tab" v-if="tab === activeTab"></slot>

    </article>

  </section>
</template>

<script>
import { toTitleCase } from '../global/mixins';

export default {
  name: 'smart-tabs',
  props: {
    /**
     * List of tabs names that should be rendered
     */
    tabs: {
      type: Array,
      required: true,
    },
    /**
     * Optionally allow the outside to set the current tab
     */
    currentTab: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      /**
       * Local mapping of currentTab property to an array index
       */
      currentIdx: this.currentTab - 1,
    };
  },
  watch: {
    /**
     * Keep currentIdx local property up to date with currentTab passed in property
     */
    currentTab() {
      this.currentIdx = this.currentTab - 1;
    },
  },
  computed: {
    /**
     * Returns the name of the current tab
     * @returns {string}
     */
    activeTab() {
      const currentTabIdx = this.getValidIndex(this.tabs, this.currentIdx);
      return this.tabs[currentTabIdx];
    },
  },
  methods: {
    /**
     * Returns a valid index to access the tabs array.
     * Will return 0 if a valid index cannot be computed.
     * @returns {number}
     */
    getValidIndex(array, index) {
      if (array[index] != null) {
        return index;
      }

      return 0;
    },
    /**
     * Changes the current index to the passed in value
     * @param index
     */
    changeTab(index) {
      this.currentIdx = index;
    },
  },
  filters: {
    toTitleCase,
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/tabs/smart-tabs';
</style>
