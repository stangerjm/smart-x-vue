<template>
  <div class="bit-paging" v-if="pagedDataLength > 1">
    <button class="bit-paging--previous" @click="goToPreviousPage">&lt;</button>
    <span class="bit-paging--nav">Page {{currentPage}} of {{pagedDataLength}}</span>
    <button class="bit-paging--pageNumber"
            v-for="idx in pagedDataLength"
            :key="idx"
            @click="setCurrentPage(idx - 1)"
            :class="{ 'bit-paging--selectedPage' : idx === currentPage }">
      {{idx}}
    </button>
    <button class="bit-paging--next" @click="goToNextPage">&gt;</button>
  </div>
</template>

<script>
import BitIcon from "./bit-icon";
export default {
  name: "bit-paging",
  components: {
    BitIcon
  },
  props: {
    pagedDataLength: {
      type: Number,
      required: true
    },
    pageIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentPage() {
      return this.pageIndex + 1;
    }
  },
  methods: {
    /**
     * Sets the current page index.
     * @param pageIdx
     */
    setCurrentPage(pageIdx) {
      this.$emit("input", pageIdx);
    },
    /**
     * Moves the current page to the next page
     */
    goToNextPage() {
      if (this.pageIndex < this.pagedDataLength - 1) {
        this.setCurrentPage(this.pageIndex + 1);
      }
    },
    /**
     * Moves the current page to the previous page
     */
    goToPreviousPage() {
      if (this.pageIndex > 0) {
        this.setCurrentPage(this.pageIndex - 1);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/bit/paging/bit-paging";
</style>
