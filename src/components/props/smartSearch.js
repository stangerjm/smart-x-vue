export function getSmartSearchProps() {
  return {
    /**
     * The title that will display to the right of the search.
     */
    formTitle: {
      type: String,
      required: true
    },
    /**
     * Name of the route to navigate to when add button is clicked.
     */
    routeName: {
      type: String,
      required: true
    },
    /**
     * Model that should be used to render the search fields.
     */
    searchModel: {
      type: Object,
      required: true
    },
    /**
     * Function to be executed on a search.
     */
    onSubmit: {
      type: Function,
      required: true
    },
    /**
     * Indicates if the search should be expanded
     */
    isExpanded: {
      type: Boolean,
      default: false
    }
  };
}
