<template>
  <footer class="smart-footer">
    <!-- @slot Placeholder for any footer content -->
    <slot></slot>
    <p class="smart-footer--content">&copy; {{currentYear}} {{organization}}</p>
  </footer>
</template>

<script>
export default {
  name: 'smart-footer',
  props: {
    organization: {
      type: String,
      default: 'Washington State Patrol',
    },
  },
  data() {
    return {
      /**
       * The current year to be displayed in the footer.
       */
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/footer/smart-footer';
</style>
