<template>
  <section class="stack-searchableTable">
    <smart-search :form-title="formTitle"
                  :route-name="routeName"
                  :search-model="modifiedSearchModel"
                  :on-submit="handleSearchSubmit"
                  :is-expanded="isExpanded">
    </smart-search>
    <smart-table :table-data="currentPage"
                 :default-context="defaultContext"
                 :unsearchable-headings="unsearchableHeadings"
                 :allow-delete="allowDelete"
                 :allow-edit="allowEdit"
                 :allow-details="allowDetails"
                 :ignore-fields="ignoreFields"
                 :props-to-link="propsToLink"
                 :table-empty-message="tableEmptyMessage">
    </smart-table>
    <bit-paging v-model="pageIdx"
                class="stack-searchableTable--paging"
                :page-index="pageIdx"
                :paged-data-length="pageData.length">
    </bit-paging>
  </section>
</template>

<script>
import SmartTable from "./smart-table";
import SmartSearch from "./smart-search";
import BitPaging from "./prototypes/bit-paging";
import { getSmartTableProps, getSmartSearchProps } from "./props/index";
import { compare } from "../global/mixins";
import { splitArrayIntoChunks } from "../global/mixins/helpers";

// Use destructuring to ignore smart-search prop "onSubmit" as we will be providing that functionality here.
// eslint-disable-next-line
const { onSubmit, ...smartSearchProps } = getSmartSearchProps();

export default {
  name: "stack-searchable-table",
  components: {
    BitPaging,
    SmartTable,
    SmartSearch
  },
  props: {
    // Include all smart-table props
    ...getSmartTableProps(),
    // Include smart-search props
    ...smartSearchProps,
    resultsPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      /**
       * Local copy of component prop "tableData"
       */
      masterData: this.tableData,
      /**
       * Index of the "pageData" array, representing the requested page
       */
      pageIdx: 0,
      numberOfResultsPerPage: this.resultsPerPage,
      modifiedSearchModel: {
        ...this.searchModel,
        ResultsPerPage: Number
      }
    };
  },
  computed: {
    /**
     * Data that has been split into multiple pages.
     */
    pageData() {
      return splitArrayIntoChunks(this.masterData, this.numberOfResultsPerPage);
    },
    /**
     * Item in the current index of the "pageData" computed property, representing the content of the current page
     */
    currentPage() {
      if (this.pageData == null) {
        return [];
      }
      return this.pageData.length > 0 ? this.pageData[this.pageIdx] : [];
    }
  },
  methods: {
    handleSearchSubmit(submittedData) {
      // Reset data if data is null
      if (submittedData == null) {
        this.resetData();
        return;
      }

      // Set the number of results per page if formData has the corresponding property
      if (
        submittedData.ResultsPerPage != null &&
        Number(submittedData.ResultsPerPage.value) > 0
      ) {
        this.numberOfResultsPerPage = Number(
          submittedData.ResultsPerPage.value
        );
      } else {
        // Otherwise, reset the results per page.
        this.numberOfResultsPerPage = this.resultsPerPage;
      }

      // Reset current page
      this.pageIdx = 0;

      // Extract only the filter data, and ignore the results per page
      // eslint-disable-next-line
      let { ResultsPerPage, ...formData } = submittedData;
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
      let keys = Object.keys(formData);
      // If form data is empty, reset the search
      if (keys.length < 1) {
        this.resetData();
        return;
      }
      // Filter the data based off of the keys and values found in the formData
      this.masterData = this.tableData.filter(item => {
        let found = true;
        keys.forEach(key => {
          // Only continue searching if previous searches have ALL been successful
          if (found) {
            found = compare(
              item[key],
              formData[key].value,
              formData[key].typeConstructor
            );
          }
        });
        return found;
      });
    }
  }
};
</script>

<style scoped>
.stack-searchableTable--paging {
  margin: 15px;
}
</style>
