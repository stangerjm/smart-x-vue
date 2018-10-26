<template>
  <section class="smart-tabs">

    <!-- Tabs -->
    <nav class="smart-tabs--nav">
      <ul class="smart-tabs--tabList">
        <!-- @slot Slot for tab heading elements.
                   Each tab will be mapped to the corresponding item below. -->
        <slot name="tab-list"></slot>
      </ul>
    </nav>

    <!-- Tab content -->
    <article class="smart-tabs--content">
      <!-- @slot Slot for tab content. Each item
                 here will be mapped to the corresponding tab above. -->
      <slot name="tab-content"></slot>
    </article>
  </section>
</template>

<script>
export default {
  name: 'smart-tabs',
  components: {
    SmartTable: () => import('./smart-table'),
  },
  /**
   * Add active class to the first tab and the corresponding item.
   */
  mounted() {
    const firstItem = this.$el.querySelector('.smart-tabs--item');
    const firstTab = this.$el.querySelector('.smart-tabs--tab');

    if (firstItem != null) {
      firstItem.classList.add('smart-tabs--activeItem');
      firstTab.classList.add('smart-tabs--activeTab');
    }
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/tabs/smart-tabs';
</style>
