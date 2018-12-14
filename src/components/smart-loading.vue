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
@import '../styles/sass/components/smart/loading/smart-loading';
</style>
