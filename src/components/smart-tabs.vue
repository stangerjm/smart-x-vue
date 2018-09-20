<template>
  <section class="smart-tabs">

    <!-- Tabs -->
    <nav class="smart-tabs--nav">
      <ul class="smart-tabs--tabList">
        <!-- @slot Slot for tab heading elements. Each tab will be mapped to the corresponding item below. -->
        <slot name="tab-list"></slot>
      </ul>
    </nav>

    <!-- Tab content -->
    <article class="smart-tabs--content">
      <!-- @slot Slot for tab content. Each item here will be mapped to the corresponding tab above. -->
      <slot name="tab-items"></slot>
    </article>
  </section>
</template>

<script>
import SmartTable from "./smart-table";

export default {
  name: "smart-tabs",
  components: {
    SmartTable
  },
  /**
   * Add active class to the first tab and the corresponding item.
   */
  mounted() {
    let firstItem = this.$el.querySelector(".smart-tabs--item");
    firstItem.classList.add("smart-tabs--activeItem");

    let firstTab = this.$el.querySelector(".smart-tabs--tab");
    firstTab.classList.add("smart-tabs--activeTab");
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/global/variables";
@import "../styles/sass/config";
@import "../styles/sass/components/smart/tabs/smart-tabs";
</style>
