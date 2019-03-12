import smartSearch from './smartSearch';
import smartTable from './smartTable';

// Use destructuring to ignore smart-search prop 'onSubmit'
// as we will be providing that functionality in the component.
const { onSubmit, ...smartSearchProps } = smartSearch;

export default {
  // Include all smart-table props
  ...smartTable,
  // Include smart-search props
  ...smartSearchProps,
};
