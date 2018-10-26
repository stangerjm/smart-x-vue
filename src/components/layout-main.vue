<template>
  <div class="layout-grid layout-main">

    <!-- Header -->
    <header class="layout-main--nav">
      <!-- @slot Placeholder for header content -->
      <slot name="header"></slot>
    </header>

    <!-- Search -->
    <section class="layout-main--search">
      <!-- @slot Placeholder for search content -->
      <slot name="search"></slot>
    </section>

    <!-- Main -->
    <main class="layout-main--content">
      <!-- @slot Placeholder for main content -->
      <slot name="content"></slot>
    </main>

    <!-- Footer -->
    <footer class="layout-main--footer">
      <!-- @slot Placeholder for footer content -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'layout-main',
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/layout/grid/grid';
</style>
