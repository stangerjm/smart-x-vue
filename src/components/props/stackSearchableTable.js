import smartSearch from './smartSearch';
import smartTable from './smartTable';

// Use destructuring to ignore smart-search prop 'onSubmit'
// as we will be providing that functionality here.
const { onSubmit, ...smartSearchProps } = smartSearch();

export default function stackSearchableTable() {
  return {
    // Include all smart-table props
    ...smartTable(),
    // Include smart-search props
    ...smartSearchProps,
  };
}
