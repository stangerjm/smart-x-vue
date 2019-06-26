<template>
  <section class="stack-searchableTable">

    <!-- Render search -->
    <smart-search :search-model="searchModel"
                  :on-submit="handleSearchSubmit">

      <!-- Preserve action slot -->
      <slot name="search-action" slot="extra-action"></slot>

    </smart-search>

    <!-- Render table -->
    <smart-table :table-data="currentPage"
                 :default-context="defaultContext"
                 :unsearchable-headings="unsearchableHeadings"
                 :include-action-container="includeActionContainer"
                 :id-key="idKey"
                 :ignore-fields="ignoreFields"
                 :props-to-link="propsToLink"
                 :table-empty-message="tableEmptyMessage"
                 :on-sort="sortData"
                 :action-column-name="actionColumnName">

      <!-- Preserve table slot -->
      <template slot="action-container" slot-scope="{ getActionPath, itemId, context }">

        <slot name="table-action"
              :getActionPath="getActionPath"
              :itemId="itemId"
              :context="context">
          <!-- FALLBACK CONTENT -->

          <!-- Edit btn -->
          <router-link :to="getActionPath(context, 'edit', itemId)">
            <bit-icon icon-type="edit"></bit-icon>
          </router-link>

          <!-- Delete btn -->
          <router-link :to="getActionPath(context, 'delete', itemId)">
            <bit-icon icon-type="delete"></bit-icon>
          </router-link>

          <!-- Details btn -->
          <router-link :to="getActionPath(context, 'details', itemId)">

            <bit-icon icon-type="details"></bit-icon>

          </router-link>

        </slot>

      </template>

    </smart-table>

    <!-- Paging section -->
    <div class="stack-searchableTable--pagingWrapper">

      <!-- Display paging -->
      <bit-paging v-model="pageIdx"
                  class="stack-searchableTable--paging"
                  :paged-data-length="pageData.length"
                  :results-per-page="currentResultsPerPage" />

      <!-- Display results per page -->
      <bit-input class="stack-searchableTable--resultsPerPage"
                 input-type="number"
                 label-text="Results Per Page"
                 v-model="currentResultsPerPage"
                 @input="resetCurrentPageIdx"
                 stack-elements />

    </div>

  </section>
</template>

<script>
import { stackSearchableTable } from './props';
import { compare, getDataSortedByColumn } from '../global/mixins';
import { splitArrayIntoChunks, getType } from '../global/mixins/helpers';
import BitPaging from './bit-paging.vue';
import BitIcon from './bit-icon.vue';
import BitInput from './bit-input.vue';
import SmartTable from './smart-table.vue';
import SmartSearch from './smart-search.vue';

const stackSearchableTableProps = stackSearchableTable || {};
const propsMixin = {
  props: {
    ...stackSearchableTableProps,
  },
};

export default {
  name: 'stack-searchable-table',
  components: {
    BitPaging,
    SmartTable,
    SmartSearch,
    BitIcon,
    BitInput,
  },
  mixins: [propsMixin],
  props: {
    /**
     * Number of results that should be displayed for each page
     */
    resultsPerPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      /**
       * Local copy of component prop 'tableData'
       */
      masterData: this.tableData,
      /**
       * Index of the 'pageData' array, representing the requested page
       */
      pageIdx: 0,
      /**
       * Data property based off of the resultsPerPage component
       * prop that will allow the results per page to be mutated
       */
      currentResultsPerPage: this.resultsPerPage,
    };
  },
  watch: {
    /**
     * Watch table data and ensure local data does not get out of sync with prop
     */
    tableData() {
      this.masterData = this.tableData;
    },
  },
  computed: {
    /**
     * Data that has been split into multiple pages.
     */
    pageData() {
      return splitArrayIntoChunks(this.masterData, this.currentResultsPerPage);
    },
    /**
     * Item in the current index of the 'pageData' computed property,
     * representing the content of the current page
     */
    currentPage() {
      if (this.pageData == null) {
        return [];
      }

      return this.pageData.length > 0
        ? this.pageData[this.pageIdx]
        : [];
    },
  },
  methods: {
    /**
     * Handles a search from the smart-search component
     * @param {object} submittedData - Data submitted from the search, injected
     * by smart-search component
     * @returns {void}
     */
    handleSearchSubmit(submittedData) {
      // Reset data if data is null
      if (submittedData == null) {
        this.resetData();
        return;
      }

      // Reset current page
      this.pageIdx = 0;

      this.filterData(submittedData);
    },
    /**
     * Resets the local data to the initial state
     */
    resetData() {
      this.masterData = this.tableData;
    },
    /**
     * Sets the current page index to zero
     */
    resetCurrentPageIdx() {
      this.pageIdx = 0;
    },
    /**
     * Filters the local data based on the passed in formData property, which will
     * be passed in from the smart-search component.
     * @param formData
     */
    filterData(formData) {
      /**
       * Filters list and excludes rows in the table that do not match the data in the search form
       * @param tableRow
       * @returns {boolean}
       */
      function excludeMismatchedData(tableRow) {
        /**
         * Compares the table row at the key passed in with the form data at the key passed
         * in and returns true if the same
         * @param key
         * @returns {boolean}
         */
        function tableRowValueMatchesFormValue(key) {
          return compare(tableRow[key], formData[key], getType(formData[key], true));
        }

        // Return true if every value in the form matches the corresponding table cell
        return Object.keys(formData).every(tableRowValueMatchesFormValue);
      }

      // If form data is empty, reset the search
      if (Object.keys(formData).length < 1) {
        this.resetData();
        return;
      }

      // Filter the data based off of the keys and values found in the formData
      this.masterData = this.tableData.filter(excludeMismatchedData);
    },
    /**
     * Sort functionality to be passed into smart-table component
     */
    sortData(column, isDescending) {
      this.masterData = getDataSortedByColumn(this.masterData, column, isDescending);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../styles/sass/components/stack/searchableTable/stack-searchableTable';
</style>
