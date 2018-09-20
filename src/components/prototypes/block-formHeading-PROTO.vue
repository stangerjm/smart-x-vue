<template>
  <!--
      TODO: Implement
  -->
  <p style="color: red;">block-formHeading is not implemented!</p>
</template>

<script>
export default {
  name: "block-form-heading"
};
</script>

<style scoped lang="scss">
@import "../../styles/sass/global/mixins";
@import "../../styles/sass/global/variables";

.form-section--heading {
  border-radius: 10px 10px 0 0;
  align-items: center;
  @include format-responsive(row, space-between, wrap) {
    grid-auto-flow: column;
  }
}

.form-title {
  margin: 0 10px;
}

.heading-segment {
  display: flex;
  align-items: center;
}

.toggle-container {
  overflow: hidden;
}

.search-container {
  display: flex;
  align-items: center;
  transition: transform 700ms ease-in-out;
  right: 75px;
  top: 0;

  &.is-hidden {
    transform: translateX(1000px);
  }
}

@media screen and (max-width: 950px) {
  .form-section--heading {
    position: relative;
  }

  .search-container {
    flex-direction: column;
    align-items: start;
  }

  .toggle-container {
    position: absolute;
    left: 0;
    top: 50px;
  }
}
</style>
