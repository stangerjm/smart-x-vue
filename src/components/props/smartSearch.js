export default {
  /**
   * Model that should be used to render the search fields.
   */
  searchModel: {
    type: Object,
    required: true,
  },
  /**
   * Function to be executed on a search.
   */
  onSubmit: {
    type: Function,
    required: true,
  },
  onReset: {
    type: Function,
    default() {},
  },
  defaultFilter: {
    type: String,
  },
};
