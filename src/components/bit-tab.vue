<template>
  <div class="smart-tabs--item" v-if="isTabContent">
    <!-- @slot Placeholder for the content of the element. -->
    <slot></slot>
  </div>
  <li class="smart-tabs--tab" @click="switchTab" v-else>
    <!-- @slot Placeholder for the tab title text -->
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'bit-tab',
  props: {
    isTabContent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Event handler that switches from the previous tab to the clicked on tab
     * @param e
     */
    switchTab(e) {
      const currentTab = e.target;

      if (currentTab.classList.contains('smart-tabs--activeTab')) {
        // don't switch tabs if the current tab is already active
        return;
      }

      // deactivate previously active tab
      this.deactivateItems('smart-tabs--activeTab');

      // activate current tab
      currentTab.classList.add('smart-tabs--activeTab');

      // look up index of current tab
      const tabList = [...currentTab.parentNode.children];
      const index = tabList.indexOf(currentTab);

      // deactivate previously active item
      this.deactivateItems('smart-tabs--activeItem');

      // find item at the same index as the current tab and activate it
      const contentNodes = document.querySelectorAll('.smart-tabs--content > .smart-tabs--item');
      const contentList = [...contentNodes];
      contentList[index].classList.add('smart-tabs--activeItem');
    },
    /**
     * Removes the active class from all the elements matching the class name passed in.
     * @param className
     */
    deactivateItems(className) {
      const currentItems = document.querySelectorAll(`.${className}`);
      currentItems.forEach(this.deactivateItem(className));
    },
    /**
     * Returns a function that removes the passed-in class from the
     * item passed into the inner function.
     * @param className
     * @returns {function}
     */
    deactivateItem(className) {
      return (item) => {
        item.classList.remove(className);
      };
    },
  },
};
</script>

<style scoped>
</style>
