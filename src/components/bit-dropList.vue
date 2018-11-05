<template>
  <ul class="bit-dropList">

    <!-- Render each item in the dropItems array -->
    <li class="bit-dropList--item" v-for="item in dropItems" :key="item.linkTitle">
      <!-- Point a router-link to the item's linkPath -->
      <router-link :to="item.linkPath" class="bit-link">{{item.linkTitle}}</router-link>
    </li>

  </ul>
</template>

<script>
/**
 * A component that renders a drop-down list to be part of a navigation.
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-dropList.md
 * @version 1.0
 */
export default {
  name: 'bit-drop-list',
  props: {
    /**
     * The items to be rendered as part of the drop-down.
     */
    dropItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/link/bit-link';
@import '../styles/sass/components/bit/dropList/bit-dropList';
</style>
