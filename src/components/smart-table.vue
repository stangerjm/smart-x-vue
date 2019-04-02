<template>
  <table class="smart-table" v-if="typedData.length !== 0">

    <!-- Table head -->
    <block-table-heading :table-headings="getTableKeys"
                         :unsearchable-headings="unsearchableHeadings"
                         :sort-method="sortBy"
                         :include-action-container="includeActionContainer">
    </block-table-heading>

    <!-- Table body -->
    <block-table-body :typed-data="typedData"
                      :data-keys="getTableKeys"
                      :default-context="defaultContext"
                      :include-action-container="includeActionContainer"
                      :id-key="idKey"
                      :props-to-link="propsToLink">

      <template slot="bodyActionContainer"
                slot-scope="{ getActionPath, itemId, context }">

        <slot name="action-container"
              :getActionPath="getActionPath"
              :itemId="itemId"
              :context="context">
          <!-- FALLBACK CONTENT -->

          <!-- Edit btn -->
          <router-link class="smart-table--edit" :to="getActionPath(context, 'edit', itemId)">
            <bit-icon icon-type="edit"></bit-icon>
          </router-link>

          <!-- Delete btn -->
          <router-link class="smart-table--delete" :to="getActionPath(context, 'delete', itemId)">
            <bit-icon icon-type="delete"></bit-icon>
          </router-link>

          <!-- Details btn -->
          <router-link class="smart-table--details" :to="getActionPath(context, 'details', itemId)">
            <bit-icon icon-type="details"></bit-icon>
          </router-link>

        </slot>

      </template>

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
import { getDataSortedByColumn, createViewModel } from '../global/mixins';
import BlockTableBody from './block-tableBody.vue';
import BlockTableHeading from './block-tableHeading.vue';
import BitMessage from './bit-message.vue';
import BitIcon from './bit-icon.vue';


const smartTableProps = smartTable || {};
const propsMixin = {
  props: {
    ...smartTableProps,
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
    BitIcon,
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
     * Maps each item in the 'localData' property to an array
     * that holds a typed schema based off of the object passed into
     * the 'createViewModel' method.
     * @see createViewModel
     */
    typedData() {
      return Array.isArray(this.localData)
        ? this.localData.map(tableItem => createViewModel(tableItem), this)
        : [];
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
      currentKey: null,
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
        heading.toLowerCase() === 'id' ||
        heading === this.idKey
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
     * @param column
     */
    sortBy(column) {
      if (this.currentKey === column) {
        this.descending = !this.descending;
      } else {
        this.descending = false;
      }

      this.currentKey = column;

      const defaultSort = () => {
        this.localData = getDataSortedByColumn(this.localData, column, this.descending);
      };

      // Use default sort functionality if none is passed in
      const onSort = this.onSort || defaultSort;

      onSort(column, this.descending);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/table/smart-table';
</style>
