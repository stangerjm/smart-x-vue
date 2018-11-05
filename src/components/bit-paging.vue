<template>
  <!-- Only show if data length indicates one or more values -->
  <div class="bit-paging" v-if="pagedDataLength > 1">

    <!-- Previous button -->
    <button class="bit-paging--previous" @click="goToPreviousPage">&lt;</button>

    <!-- Render the current page and total number of pages -->
    <span class="bit-paging--nav">Page {{currentPage}} of {{pagedDataLength}}</span>

    <!-- Render a button for each page that can set the current page to the corresponding number -->
    <button class="bit-paging--pageNumber"
            v-for="idx in pagedDataLength"
            :key="idx"
            @click="setCurrentIndex(idx - 1)"
            :class="{ 'bit-paging--selectedPage' : idx === currentPage }">
      {{idx}}
    </button>

    <!-- Next button -->
    <button class="bit-paging--next" @click="goToNextPage">&gt;</button>
  </div>
</template>

<script>
import BitIcon from './bit-icon.vue';

/**
 * A paging component that manages the index of a paged list of data
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-paging.md
 * @version 1.0
 */
export default {
  name: 'bit-paging',
  components: {
    BitIcon,
  },
  props: {
    /**
     * Length of the paged data
     */
    pagedDataLength: {
      type: Number,
      required: true,
    },
    /**
     * Allows v-model to be passed in and updated.
     * <br>*Note: indices outside of the bounds of the pagedDataLength passed in or below 0 will be
     * converted to a valid index and emitted back
     * @model
     */
    value: {
      type: Number,
    },
  },
  computed: {
    /**
     * Computes the current page based off of the current set index
     */
    currentPage() {
      return this.getValidIndex(this.value) + 1;
    },
  },
  methods: {
    /**
     * Checks the index passed in, and returns either the passed in index or the minimum
     * or maximum index depending on the parameter
     * @param idx
     */
    getValidIndex(idx) {
      if (idx < 1) {
        return 0;
      }

      if (idx > this.pagedDataLength - 1) {
        return this.pagedDataLength - 1;
      }

      return idx;
    },
    /**
     * Sets the current page index.
     * @param pageIdx
     */
    setCurrentIndex(pageIdx) {
      this.$emit('input', this.getValidIndex(pageIdx));
    },
    /**
     * Moves the current page to the next page
     */
    goToNextPage() {
      if (this.value < this.pagedDataLength - 1) {
        this.setCurrentIndex(this.value + 1);
      }
    },
    /**
     * Moves the current page to the previous page
     */
    goToPreviousPage() {
      if (this.value > 0) {
        this.setCurrentIndex(this.value - 1);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/paging/bit-paging';
</style>
