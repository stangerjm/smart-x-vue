<template>
  <!--
   TODO: Implement
   -->
  <p style="color: red;">block-formBody is not implemented!</p>
</template>

<script>
export default {
  name: "block-form-body"
};
</script>

<style scoped lang="scss">
@import "../../styles/sass/global/variables";
@import "../../styles/sass/global/mixins";

/// Styles a section of the form. Allows a body to be styled using
/// .form-section, a heading to be styled using .form-section--heading
/// , and a footer to be styled using .form-section--footer.
.form-section {
  align-items: center;
  @include format-responsive(row, null, null) {
    grid-template-columns: 125px 1fr;
    justify-content: start;
    @media screen and (max-width: $break-sml) {
      grid-template-columns: auto auto;
    }
  }
}
</style>
