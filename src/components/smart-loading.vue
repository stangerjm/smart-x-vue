<template>
  <!-- Loading container (class "bit-loading-active" conditional on loading flag) -->
  <div class="bit-loading"
       :class="{
          'smart-loading-active' : loading,
       }">

    <!-- Loading spinner that will render conditionally on loading flag -->
    <bit-loading class="smart-loading--spinner" v-if="loading"></bit-loading>

    <!-- @slot Default slot for all content -->
    <slot></slot>

  </div>
</template>

<script>
import BitLoading from './bit-loading.vue';

export default {
  name: 'smart-loading',
  components: {
    BitLoading,
  },
  props: {
    /**
     * Flag indicating the state of the loading spinner
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.smart-loading-active {
  position: relative;

  &:after {
    content: "";
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .smart-loading--spinner {
    position: absolute;
    top: calc(50% - (25px / 2));
    left: calc(50% - (25px / 2));
  }
}
</style>
