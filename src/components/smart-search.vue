<template>

  <section class="smart-search">

    <!-- Action Slot -->
    <slot name="extra-action"></slot>

    <!-- Search field container -->
    <div class="smart-search--searchContainer">

      <!-- Search icon -->
      <bit-icon icon-type="search" class="smart-search--icon" />

      <!-- Render filter options -->
      <bit-select class="smart-search--filterList"
                  :select-data="filterOptions"
                  v-model="selectedFilter"
                  stack-elements
                  @input="search"
                  label-text="Search" />

      <!-- Only render search if an option has been selected -->
      <template v-if="filterHasBeenSelected">

        <!-- If search is a multi-search render a search input for each desired property -->
        <template v-if="currentInputType === 'multiple'">

          <!-- Render an input for each property in the multiple search -->
          <template v-for="filter in multipleFilterProperties">

            <!-- Render any select data -->
            <bit-select v-if="getCurrentFilterInputType(filter) === 'select'"
                        class="smart-search--searchField"
                        :key="`${selectedFilter}-${filter}`"
                        :input-type="getCurrentFilterInputType(filter)"
                        :select-data="getCurrentSelectData(filter)"
                        :label-text="filter | toTitleCase"
                        stack-elements
                        v-model="selectData[selectedFilter][filter]"
                        ref="select-data"
                        @input="search(filter)" />

            <!-- Render any other type of input -->
            <bit-input v-else
                       class="smart-search--searchField"
                       :key="`${selectedFilter}-${filter}`"
                       :input-type="getCurrentFilterInputType(filter)"
                       :label-text="filter | toTitleCase"
                       stack-elements
                       v-model="searchData[selectedFilter].value[filter].value"
                       @input="search(filter)" />

          </template>

        </template>

        <!-- Render select element if current type is a list -->
        <bit-select v-else-if="currentInputType === 'select'"
                    class="smart-search--searchField"
                    :select-data="currentSelectData"
                    :label-text="selectedFilter | toTitleCase"
                    :key="selectedFilter"
                    stack-elements
                    v-model="selectData[selectedFilter]"
                    @input="search"
                    ref="select-data" />

        <!-- Render normal input otherwise -->
        <bit-input class="smart-search--searchField"
                  v-else
                  :input-type="currentInputType"
                  :label-text="selectedFilter | toTitleCase"
                  :key="selectedFilter"
                  stack-elements
                  v-model="searchData[selectedFilter].value"
                  @input="search" />

        <!-- Reset button -->
        <span class="smart-search--reset" @click="reset">
          Reset <bit-icon class="smart-search--resetIcon" icon-type="reset" />
        </span>

      </template>

    </div>

  </section>

</template>

<script>
import { getInputType, createViewModel, toTitleCase } from '../global/mixins';
import { isObject } from '../global/mixins/helpers';
import { smartSearch } from './props';
import BitIcon from './bit-icon.vue';
import BitSelect from './bit-select.vue';
import BitInput from './bit-input.vue';
import BitBtn from './bit-btn.vue';

const smartSearchProps = smartSearch || {};

const propsMixin = {
  props: {
    ...smartSearchProps,
  },
};

function getSelectData(masterData) {
  const masterDataEntries = Object.entries(masterData);

  if (masterData == null || masterDataEntries.length < 1) {
    return [];
  }

  function reduceIntoSelectData(accumulator, [formKey, formEntry]) {
    // If property is an array, include in selectData.
    if (Array.isArray(formEntry.value)) {
      return {
        ...accumulator,
        [formKey]: formEntry.value,
      };
    }

    // If property is object, recurse and add subsequent array properties in selectData
    if (isObject(formEntry.value)) {
      return {
        ...accumulator,
        [formKey]: {
          ...Object.entries(formEntry.value).reduce(reduceIntoSelectData, {}),
        },
      };
    }

    // Otherwise, ignore.
    return accumulator;
  }

  return masterDataEntries.reduce(reduceIntoSelectData, {});
}

/**
 * A component that renders a mobile oriented search bar.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-search',
  components: {
    BitIcon,
    BitSelect,
    BitInput,
    BitBtn,
  },
  computed: {
    /**
     * Search keys that should be rendered as options in the filter drop-down list
     */
    filterOptions() {
      return Object.keys(this.searchModel);
    },
    /**
     * Determines if a filter has been selected
     */
    filterHasBeenSelected() {
      return this.selectedFilter != null && this.selectedFilter !== '';
    },
    /**
     * Retrieves the current property from the search data
     */
    currentProperty() {
      const { selectedFilter = '' } = this;

      const {
        [selectedFilter]:
          currentProperty = {},
      } = this.searchData;

      return currentProperty;
    },
    /**
     * Determines the input type
     */
    currentInputType() {
      if (this.currentProperty.typeConstructor === Object) {
        return 'multiple';
      }

      return getInputType(this.currentProperty.typeConstructor);
    },
    /**
     * Grabs data from the current property if the current input type is 'select'
     */
    currentSelectData() {
      if (this.currentInputType !== 'select') {
        return [];
      }

      return this.currentProperty.value;
    },
    /**
     * Retrieves the filter properties when a multi-filter is selected
     */
    multipleFilterProperties() {
      return Object.keys(this.currentProperty.value);
    },
  },
  data() {
    const searchData = createViewModel(this.searchModel);

    return {
      /**
       * The model to use to render the search fields
       */
      searchData,
      /**
       * The filter selected by the user
       */
      selectedFilter: '',
      /**
       * Contains any properties from the search data that are array
       * properties and should be rendered as select elements
       */
      selectData: getSelectData(searchData),
    };
  },
  /**
   * Include all smart-search props
   */
  mixins: [propsMixin],
  filters: {
    /** Grab toTitleCase mixin and use it as a filter */
    toTitleCase,
  },
  methods: {
    /** Grab getInputType mixin and include it as a method */
    getInputType,
    /**
     * Determines the current input type based off of a filter name
     * @param {string} filterName - The name of the selected filter
     * @returns {string} The determined input type
     */
    getCurrentFilterInputType(filterName) {
      const filterProperty = this.currentProperty.value[filterName];

      if (filterProperty == null) {
        return 'text';
      }

      return getInputType(filterProperty.typeConstructor);
    },
    /**
     * Retrieves a value from the select data
     * @param {string} filterName - The name of the filter to use as an accessor
     * @returns {array} The select data to use in the dropdown list
     */
    getCurrentSelectData(filterName) {
      const filterProperty = this.currentProperty.value[filterName];

      if (filterProperty == null) {
        return [];
      }

      return filterProperty.value;
    },
    /**
     * Extracts selected data by handling multiple search fields and reducing array
     * values into the value selected by the user
     * @param {*} rawData - The raw data submitted from the form
     * @returns {object} The data that has been selected and submitted
     */
    extractSelectedData(rawData) {
      const searchKey = this.selectedFilter;

      /**
       * Reducing function that does the actual retrieval of array properties from
       * the "selectData" object
       * @param {object} rawSubmittedData - The object containing the raw
       * properties from search data
       * @param {string} currentKey - The current "submittedData" property at
       * the time of iteration
       * @returns {object} The mapped object after potential array properties have been handled
       */
      const handleArrayData = (rawSubmittedData, currentKey) => {
        /* If the submitted data is an array AND the corresponding property in the select data
         * is NOT an array, this means the user has selected a value and this property should
         * be included in the search
         */
        if (Array.isArray(rawSubmittedData[currentKey])
            && !Array.isArray(this.selectData[searchKey][currentKey])) {
          return {
            ...rawSubmittedData,
            [currentKey]: this.selectData[searchKey][currentKey],
          };
        }

        /* If the data does not meet the above criteria, but it is still an array then remove
         * the property from the submitted data object so it will not be submitted
         */
        if (Array.isArray(rawSubmittedData[currentKey])) {
          const { [currentKey]: _, ...rest } = rawSubmittedData;

          return rest;
        }

        // If data is not an array, we do not care about transforming it, so just return
        return rawSubmittedData;
      };

      // If rawData is a multi-search, handle this
      if (isObject(rawData)) {
        return Object.keys(rawData).reduce(handleArrayData, rawData);
      }

      // If rawData is an array, retrive the corresponding property from the select data
      if (Array.isArray(rawData)) {
        return {
          [searchKey]: this.selectData[searchKey],
        };
      }

      // Otherwise, just include in the data
      return {
        [searchKey]: rawData,
      };
    },
    /**
     * Called on search. Handles multiple-search fields as well as single field searches
     * Responsible for determining the currently selected property and extracting the selected
     * data from the appropriate fields
     * @param {string} currentFilter - The current filter selected by the user
     * @returns {void}
     */
    search(currentFilter = '') {
      const {
        [this.selectedFilter]:
          selectedValue,
      } = this.searchData.simpleVersion;

      if (selectedValue == null) {
        this.onSubmit(null);
        return;
      }

      const selectedData = this.extractSelectedData(selectedValue, currentFilter);

      if (Array.isArray(selectedData[currentFilter])) {
        this.onSubmit(null);
        return;
      }

      this.onSubmit(selectedData);
    },
    /**
     * Resets the search fields and calls the passed in onReset function
     */
    reset() {
      this.searchData = createViewModel(this.searchModel);
      this.selectData = getSelectData(this.searchData);

      // TODO: investigate why date-pickers do not reset and need manual clearing
      this.$el.querySelectorAll('.bit-input--date').forEach((input) => { input.value = ''; });

      this.onSubmit(null);
      this.onReset();
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/search/smart-search';
</style>
