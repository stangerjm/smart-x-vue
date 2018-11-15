<template>
  <table class="smart-table" v-if="typedData.length !== 0">

    <!-- Table head -->
    <block-table-heading :table-headings="getTableKeys"
                         :unsearchable-headings="unsearchableHeadings"
                         :sort-method="sortBy"
                         :include-action-container="dataHasIdProperty">
    </block-table-heading>

    <!-- Table body -->
    <block-table-body :typed-data="typedData"
                      :data-keys="getTableKeys"
                      :default-context="defaultContext"
                      :allow-details="allowDetails"
                      :allow-delete="allowDelete"
                      :allow-edit="allowEdit"
                      :include-action-container="dataHasIdProperty"
                      :props-to-link="propsToLink">
    </block-table-body>

  </table>

  <!-- If table data is empty, render an empty message. -->
  <bit-message v-else
               messageType="notice"
               :message-text="tableEmptyMessage">
  </bit-message>
</template>

<script>
import { smartTable } from './props';
import { getDataSortedByColumn, createViewModel, getItemId } from '../global/mixins';
import BlockTableBody from './block-tableBody.vue';
import BlockTableHeading from './block-tableHeading.vue';
import BitMessage from './bit-message.vue';

const getSmartTableProps = smartTable || function smartTableProps() {};
const propsMixin = {
  props: {
    ...getSmartTableProps(),
  },
};

/**
 * A component that renders a responsive table from a data-set.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-table',
  components: {
    BlockTableBody,
    BlockTableHeading,
    BitMessage,
  },
  mixins: [propsMixin],
  computed: {
    /**
     * Retrieves the keys of the first object in the 'typedData' local
     * property, which will act as the headings that should be displayed
     * on the table.
     */
    getTableKeys() {
      if (this.typedData.length > 0) {
        return Object.keys(this.typedData[0]).filter(this.isDisplayHeading);
      }

      return [];
    },
    /**
     * Looks at the first object in the 'typedData' local property
     * and determines if a valid id can be found
     */
    dataHasIdProperty() {
      if (this.typedData.length > 0) {
        return getItemId(this.typedData[0]) != null;
      }

      return false;
    },
    /**
     * Maps each item in the 'localData' property to an array
     * that holds a typed schema based off of the object passed into
     * the 'createViewModel' method.
     * @see createViewModel
     */
    typedData() {
      return this.localData.map(tableItem => createViewModel(tableItem), this);
    },
  },
  data() {
    return {
      /**
       * Flag indicating if the table sort should be descending or ascending.
       * Note: this will change each time a sort is performed.
       */
      descending: true,
      /**
       * The current key the table sort will use as the criteria
       */
      currentKey: undefined,
      /**
       * Copy of the table data passed into the component. This is used as a workaround for the
       * prop mutation anti-pattern described in the Vue documentation.
       */
      localData: this.tableData,
    };
  },
  watch: {
    /**
     * Watcher that ensures the 'localData' property is in sync with the passed in table data.
     */
    tableData() {
      this.localData = this.tableData;
    },
  },
  methods: {
    /**
     * Ignores the detailsContext, editContext, and deleteContext
     * keys needed to build action container
     * @param heading
     * @returns {boolean}
     */
    isDisplayHeading(heading) {
      if (
        this.ignoreFields.includes(heading) ||
        heading[0] === '_' ||
        heading.toLowerCase() === 'id'
      ) {
        return false;
      }

      switch (heading) {
        case 'detailsContext':
        case 'editContext':
        case 'deleteContext':
          return false;
        default:
          return true;
      }
    },
    /**
     * Calls the sort method passed into the component.
     * Note: the local property 'descending' will be mutated here if
     *       the current key is equal to the key passed in.
     * @param key
     */
    sortBy(key) {
      if (this.currentKey === key) {
        this.descending = !this.descending;
      } else {
        this.descending = true;
      }

      this.currentKey = key;
      // Use 'getDataSortedByColumn' mixin to sort data
      this.localData = getDataSortedByColumn(this.localData, key, this.descending);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/table/smart-table';
</style>
