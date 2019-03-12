export default {
  /**
   * The data that will render as a table.
   */
  tableData: {
    type: Array,
    required: true,
  },
  /**
   * The default context passed into the action container component
   * @see block-actionContainer
   */
  defaultContext: {
    type: String,
    required: true,
  },
  /**
   * An array of key names that will render each
   * heading associated with the key as literal text and not a searchable link.
   */
  unsearchableHeadings: {
    type: Array,
    default: () => [],
  },
  /**
   * Flag to optionally render the action container
   */
  includeActionContainer: {
    type: Boolean,
    default: false,
  },
  /**
   * List of fields to ignore
   */
  ignoreFields: {
    type: Array,
    default: () => [],
  },
  /**
   * Properties that should be rendered as links to another record rather than a value.
   */
  propsToLink: {
    type: Object,
    default: () => {},
  },
  /**
   * Optional message to configure what the table renders when table data is empty.
   */
  tableEmptyMessage: {
    type: String,
    default: 'No data found.',
  },
  idKey: {
    type: String,
    default: null,
  },
};
