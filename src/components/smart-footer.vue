<template>
  <footer class="smart-footer">
    <!-- @slot Placeholder for any footer content -->
    <slot name="footer"></slot>
    <p>&copy; {{currentYear}} Washington State Patrol</p>
  </footer>
</template>

<script>
export default {
  name: 'smart-footer',
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
