<template>
  <!-- Only show if data length indicates one or more values -->
  <div class="bit-paging" v-if="pagedDataLength > 1">

    <!-- Render the current page and total number of pages -->
    <span class="bit-paging--nav">Page {{currentPage}} of {{pagedDataLength}}</span>

    <div class="bit-paging--x">

      <!-- Previous button -->
      <button class="bit-paging--previous" @click="goToPreviousPage">&lt;</button>

      <div class="bit-paging--numberBox">

        <!-- Render a button for each page that can
            set the current page to the corresponding number -->
        <button class="bit-paging--pageNumber"
                v-for="(pageNumber, idx) in generatePagination"
                :key="idx"
                @click="setCurrentPage(pageNumber)"
                :class="{ 'bit-paging--selectedPage' : pageNumber === currentPage }">
          {{pageNumber}}
        </button>

      </div>

      <!-- Next button -->
      <button class="bit-paging--next" @click="goToNextPage">&gt;</button>
    </div>

  </div>
</template>

<script>
/**
 * A paging component that manages the index of a paged list of data
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-paging.md
 * @version 1.0
 */
export default {
  name: 'bit-paging',
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
    /**
     * Generates an array to be used for pagination
     * @param {number} current - The current page
     * @param {number} last - The last possible page in the paged list
     * @returns {array} List of desired page numbers with ellipsis for unimportant pages
     */
    generatePagination() {
      const current = this.currentPage;
      const last = this.pagedDataLength;
      const offset = 2;
      const leftOffset = current - offset;
      const rightOffset = current + offset + 1;

      /**
       * Reduces a list into the page numbers desired in the pagination
       * @param {array} accumulator - Growing list of desired page numbers
       * @param {*} _ - Throwaway variable to ignore the current value in iteration
       * @param {*} idx - The index of the current iteration
       * @returns {array} The accumulating list of desired page numbers
       */
      function reduceToDesiredPageNumbers(accumulator, _, idx) {
        const currIdx = idx + 1;

        if (
          // Always include first page
          currIdx === 1
          // Always include last page
          || currIdx === last
          // Include if index is between the above defined offsets
          || (currIdx >= leftOffset && currIdx < rightOffset)) {
          return [
            ...accumulator,
            currIdx,
          ];
        }

        return accumulator;
      }

      /**
       * Transforms a list of desired pages and puts ellipsis in any gaps
       * @param {array} accumulator - The growing list of page numbers with ellipsis included
       * @param {number} currentPage - The current page in iteration
       * @param {number} currIdx - The current index
       * @param {array} src - The source array the function was called on
       */
      function transformToPagesWithEllipsis(accumulator, currentPage, currIdx, src) {
        const prev = src[currIdx - 1];

        // Ignore the first number, as we always want the first page
        // Include an ellipsis if there is a gap of more than one between numbers
        if (prev != null && currentPage - prev !== 1) {
          return [
            ...accumulator,
            '...',
            currentPage,
          ];
        }

        // If page does not meet above requirement, just add it to the list
        return [
          ...accumulator,
          currentPage,
        ];
      }

      const pageNumbers = Array(last)
        .fill()
        .reduce(reduceToDesiredPageNumbers, []);

      const pageNumbersWithEllipsis = pageNumbers.reduce(transformToPagesWithEllipsis, []);

      return pageNumbersWithEllipsis;
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
    setCurrentPage(pageNumber) {
      if (typeof pageNumber !== 'number') {
        return;
      }

      this.setCurrentIndex(pageNumber - 1);
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
      this.setCurrentIndex(this.value + 1);
    },
    /**
     * Moves the current page to the previous page
     */
    goToPreviousPage() {
      this.setCurrentIndex(this.value - 1);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/paging/bit-paging';
</style>
