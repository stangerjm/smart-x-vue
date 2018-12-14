<template>
  <div class="stack-tableCollapsible">
    <smart-accordion :title="title">
      <smart-table
          v-on:recordExpanded="updateAccordionHeight"
          :table-data="tableData"
          :default-context="defaultContext"
          :unsearchable-headings="Object.keys(tableData)">
      </smart-table>
    </smart-accordion>
  </div>
</template>

<script>
import SmartTable from '../smart-table.vue';
import SmartAccordion from '../smart-accordion.vue';

/**
 * A component that renders a smart-table inside of a smart-accordion.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 * @see See [smart-table](#smarttable) for more info about defaultContext and tableData props
 * @see See [smart-accordion](#smartaccordion)
 */
export default {
  name: 'stack-table-collapsible',
  components: {
    SmartTable,
    SmartAccordion,
  },
  props: {
    /**
     * Data that will be passed to the smart-table.
     */
    tableData: {
      type: Array,
      required: true,
    },
    /**
     * The default context to set for the smart-table.
     */
    defaultContext: {
      type: String,
      required: true,
    },
    /**
     * Title for the smart-accordion.
     */
    title: {
      type: String,
      default: 'Associated Data',
    },
  },
  methods: {
    /**
     * Event handler for smart-table's recordExpanded event.
     */
    updateAccordionHeight() {
      // call the smart-accordion component's expandData method
      this.$children[0].expandData();
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
