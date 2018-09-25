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
</template>

<script>
import BlockTableBody from "./block-tableBody";
import BlockTableHeading from "./block-tableHeading";

/**
 * A component that renders a responsive table from a data-set.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "smart-table",
  components: {
    BlockTableBody,
    BlockTableHeading
  },
  props: {
    /**
     * The data that will render as a table.
     */
    tableData: {
      type: Array,
      required: true
    },
    /**
     * The default context passed into the action container component
     * @see block-actionContainer
     */
    defaultContext: {
      type: String,
      required: true
    },
    /**
     * The method that will be called when a sort button on the table is clicked.
     * Takes a property key and descending flag, and returns an array of sorted objects.
     * Should be ordered by the property key, and descending if the 'descending' flag is true.
     * @param {string} key
     * @param {boolean} descending
     * @returns {array}
     */
    sortMethod: {
      type: Function,
      default: function() {
        return this.localTableData;
      }
    },
    /**
     * An array of key names that will render each
     * heading associated with the key as literal text and not a searchable link.
     */
    unsearchableHeadings: {
      type: Array,
      default: () => []
    },
    /**
     * Optionally renders the delete action link if true
     * @see block-actionContainer
     */
    allowDelete: {
      type: Boolean,
      default: true
    },
    /**
     * Optionally renders the edit action link if true
     * @see block-actionContainer
     */
    allowEdit: {
      type: Boolean,
      default: true
    },
    /**
     * Optionally renders the details action link if true
     * @see block-actionContainer
     */
    allowDetails: {
      type: Boolean,
      default: true
    },
    /**
     * List of fields to ignore
     */
    ignoreFields: {
      type: Array,
      default: () => []
    },
    propsToLink: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    /**
     * Retrieves the keys of the first object in the "typedData" local
     * property, which will act as the headings that should be displayed
     * on the table.
     */
    getTableKeys() {
      if (this.typedData.length > 0) {
        return Object.keys(this.typedData[0]).filter(this.isDisplayHeading);
      }
    },
    /**
     * Looks at the first object in the "typedData" local property
     * and determines if a valid id can be found
     */
    dataHasIdProperty() {
      if (this.typedData.length > 0) {
        return this.getItemId(this.typedData[0]) != null;
      }
    },
    /**
     * Maps each item in the "localTableData" property to an array
     * that holds a typed schema based off of the object passed into
     * the "createSchema" method.
     * @see createSchema
     */
    typedData() {
      return this.localTableData.map(function(tableItem) {
        return this.createSchema(tableItem);
      }, this);
    }
  },
  data() {
    return {
      /**
       * Local copy of the "tableData" property
       */
      localTableData: this.tableData,
      /**
       * Flag indicating if the table sort should be descending or ascending.
       * Note: this will change each time a sort is performed.
       */
      descending: true,
      /**
       * The current key the table sort will use as the criteria
       */
      currentKey: undefined
    };
  },
  methods: {
    /**
     * Ignores the detailsContext, editContext, and deleteContext keys needed to build action container
     * @param heading
     * @returns {boolean}
     */
    isDisplayHeading(heading) {
      if (this.ignoreFields.includes(heading) || heading[0] === "_") {
        return false;
      }

      switch (heading) {
        case "detailsContext":
        case "editContext":
        case "deleteContext":
          return false;
        default:
          return true;
      }
    },
    /**
     * Calls the sort method passed into the component.
     * Note: the local property "descending" will be mutated here if
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

      this.localTableData = this.sortMethod(key, this.descending);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/global/mixins";
@import "../styles/sass/global/variables";
@import "../styles/sass/components/smart/table/smart-table";
</style>
