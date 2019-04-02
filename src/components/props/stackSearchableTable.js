import smartSearch from './smartSearch';
import smartTable from './smartTable';

// Use destructuring to ignore smart-search prop 'onSubmit' and 'onReset'
// as we will be providing that functionality in the component.
const { onSubmit, onReset, ...smartSearchProps } = smartSearch;

// Ignore smart-table prop 'onSort' as stack-searchableTable will override this
const { onSort, ...smartTableProps } = smartTable;

export default {
  // Include all smart-table props
  ...smartTableProps,
  // Include smart-search props
  ...smartSearchProps,
};
