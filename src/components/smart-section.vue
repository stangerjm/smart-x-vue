<template>
  <section class="smart-section">

    <h2 class="smart-section--title" v-if="sectionTitle != null">{{sectionTitle}}</h2>

    <!-- @slot default slot for all content -->
    <slot></slot>

  </section>
</template>

<script>
export default {
  name: 'smart-section',
  props: {
    sectionTitle: {
      type: String,
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/section/smart-section';
</style>
