<template>
  <!--
      TODO: Implement
  -->
  <p style="color: red;">block-formFooter is not implemented!</p>
</template>

<script>
export default {
  name: "block-form-footer"
};
</script>

<style scoped lang="scss">
@import "../../styles/sass/global/mixins";
@import "../../styles/sass/global/variables";

.form-section--footer {
  border-radius: 0 0 10px 10px;

  @include format-responsive(row, space-between, wrap) {
    grid-auto-flow: column;
    @media screen and (max-width: $break-med) {
      grid-auto-flow: row;
    }
  }
}

/// Styles a footer segment to allow a footer to be broken up into
/// multiple flexible sections. Ensures correct layout.
.footer-segment {
  @media screen and (max-width: $break-med) {
    @include format-responsive(column, null, null) {
      grid-auto-flow: row;
    }
  }
}
</style>
