<template>
  <div class="block-navList" v-if="listItems.length > 0">

    <!-- Mobile expand button -->
    <div class="block-navList--expand" @click="isExpanded = !isExpanded">
      <div class="block-navList--expandLine"></div>
      <div class="block-navList--expandLine"></div>
      <div class="block-navList--expandLine"></div>
    </div>

    <ul :class="[isExpanded ? 'nav-show' : '', 'block-navList--list']">

      <!-- Render each item in the nav list -->
      <li class="block-navList--item" v-for="item in listItems" :key="item.linkTitle">

        <!-- Render a router link based on the linkPath -->
        <router-link :to="item.linkPath"
                     :class="['bit-link', item.inlineItems ? 'block-navList--sublistHeading' : '']">
          {{item.linkTitle}}
        </router-link>

        <!-- Render sub-items if they exist -->
        <bit-drop-list v-if="item.inlineItems" :drop-items="item.inlineItems"></bit-drop-list>
      </li>

    </ul>
  </div>
</template>

<script>
import BitDropList from './bit-dropList.vue';

/**
 * A component that renders a flexible and mobile responsive list with drop-down capability.
 * @author James Stanger
 * @example ./documentation/block-navList.md
 * @version 1.0
 */
export default {
  name: 'block-nav-list',
  props: {
    /**
     * An array containing the items and subsequent drop-down items to render.
     */
    listItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    BitDropList,
  },
  data() {
    return {
      /**
       * Flag indicating if nav is expanded
       */
      isExpanded: false,
    };
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/link/bit-link';
@import '../styles/sass/components/block/navList/block-navList';
</style>
