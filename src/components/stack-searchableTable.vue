<template>
  <section class="stack-searchableTable">
    <smart-search :search-model="modifiedSearchModel"
                  :on-submit="handleSearchSubmit"
                  :search-title="searchTitle"
                  :search-btn-size="searchBtnSize"
                  :search-btn-text="searchBtnText"
                  :is-expanded="isExpanded">
      <slot name="search-action" slot="extra-action"></slot>
    </smart-search>
    <smart-table :table-data="currentPage"
                 :default-context="defaultContext"
                 :unsearchable-headings="unsearchableHeadings"
                 :include-action-container="includeActionContainer"
                 :id-key="idKey"
                 :ignore-fields="ignoreFields"
                 :props-to-link="propsToLink"
                 :table-empty-message="tableEmptyMessage">

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
      <bit-paging v-model="pageIdx"
                class="stack-searchableTable--paging"
                :paged-data-length="pageData.length">
    </bit-paging>
  </section>
</template>

<script>
import { stackSearchableTable } from './props';
import { compare } from '../global/mixins';
import { splitArrayIntoChunks, getType } from '../global/mixins/helpers';
import BitPaging from './bit-paging.vue';
import SmartTable from './smart-table.vue';
import SmartSearch from './smart-search.vue';
import BitIcon from './bit-icon.vue';

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
      numberOfResultsPerPage: this.resultsPerPage,
      modifiedSearchModel: {
        ...this.searchModel,
        ResultsPerPage: Number,
      },
    };
  },
  watch: {
    tableData() {
      this.masterData = this.tableData;
    },
  },
  computed: {
    /**
     * Data that has been split into multiple pages.
     */
    pageData() {
      return splitArrayIntoChunks(this.masterData, this.numberOfResultsPerPage);
    },
    /**
     * Item in the current index of the 'pageData' computed property,
     * representing the content of the current page
     */
    currentPage() {
      if (this.pageData == null) {
        return [];
      }
      return this.pageData.length > 0 ? this.pageData[this.pageIdx] : [];
    },
  },
  methods: {
    handleSearchSubmit(submittedData) {
      // Reset data if data is null
      if (submittedData == null) {
        this.resetData();
        return;
      }

      // Set the number of results per page if formData has the corresponding property
      const resultsPerPage = Number(submittedData.ResultsPerPage);
      if (resultsPerPage > 0) {
        this.numberOfResultsPerPage = resultsPerPage;
      } else {
        // Otherwise, reset the results per page.
        this.numberOfResultsPerPage = this.resultsPerPage;
      }

      // Reset current page
      this.pageIdx = 0;

      // Extract only the filter data, and ignore the results per page
      const { ResultsPerPage, ...formData } = submittedData;

      this.filterData(formData);
    },
    resetData() {
      this.masterData = this.tableData;
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
  },
};
</script>

<style scoped>
.stack-searchableTable--paging {
  margin: 15px;
}
</style>
