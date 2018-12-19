export default function smartSearch() {
  return {
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
    /**
     * The title that will display to the right of the search.
     */
    searchTitle: {
      type: String,
      default: '',
    },
    /**
     * Indicates if the search should be expanded
     */
    isExpanded: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets the size of the search button. Accepted values are 'small', 'medium', and 'large'
     */
    searchBtnSize: {
      type: String,
      default: 'medium',
    },
    /**
     * Sets the size of the search button. Accepted values are 'small', 'medium', and 'large'
     */
    searchBtnText: {
      type: String,
    },
  };
}
