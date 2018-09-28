export function getSmartTableProps() {
  return {
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
    /**
     * Properties that should be rendered as links to another record rather than a value.
     */
    propsToLink: {
      type: Object,
      default: () => {}
    },
    /**
     * Optional message to configure what the table renders when table data is empty.
     */
    tableEmptyMessage: {
      type: String,
      default: "No data found."
    }
  };
}
