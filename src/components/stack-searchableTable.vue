<template>
  <section class="stack-searchableTable">
    <smart-search :form-title="formTitle"
                  :route-name="routeName"
                  :search-model="searchModel"
                  :on-submit="filterData"
                  :is-expanded="isExpanded">
    </smart-search>
    <smart-table :table-data="masterData"
                 :default-context="defaultContext"
                 :unsearchable-headings="unsearchableHeadings"
                 :allow-delete="allowDelete"
                 :allow-edit="allowEdit"
                 :allow-details="allowDetails"
                 :ignore-fields="ignoreFields"
                 :props-to-link="propsToLink"
                 :table-empty-message="tableEmptyMessage">
    </smart-table>
  </section>
</template>

<script>
import { getSmartTableProps, getSmartSearchProps } from "./props/index";
import { compare } from "../global/mixins";

// Use destructuring to ignore smart-search prop "onSubmit" as we will be providing that functionality here.
// eslint-disable-next-line
const { onSubmit, ...smartSearchProps } = getSmartSearchProps();

export default {
  name: "stack-searchableTable",
  components: {
    SmartTable: () => import("./smart-table"),
    SmartSearch: () => import("./smart-search")
  },
  props: {
    // Include all smart-table props
    ...getSmartTableProps(),
    // Include smart-search props
    ...smartSearchProps
  },
  data() {
    return {
      /**
       * Local copy of component prop "tableData"
       */
      masterData: this.tableData
    };
  },
  methods: {
    /**
     * Filters the local data based on the passed in formData property, which will
     * be passed in from the smart-search component.
     * @param formData
     */
    filterData(formData) {
      let keys = Object.keys(formData);
      // If form data is empty, reset the search
      if (keys.length < 1) {
        this.masterData = this.tableData;
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
</style>
