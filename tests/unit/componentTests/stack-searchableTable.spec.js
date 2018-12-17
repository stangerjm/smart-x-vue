import { createComponentGenerator } from '../helpers';
import StackSearchableTable from '../../../src/components/stack-searchableTable.vue';

const mountStackSearchableTable = createComponentGenerator(StackSearchableTable);

describe('stack-searchableTable.vue', () => {
  it('passes all available props into a smart-table component', () => {});

  it('passes all available props into a smart-search component', () => {});

  it('allows smart-search slot content to be passed in', () => {});

  it('allows smart-table slot content to be passed in with the appropriate default', () => {});

  it('adds a "ResultsPerPage" entry into the search model', () => {});

  it('pages the data with the specified number of results per page', () => {});

  it('renders a bit-paging element to keep track of paging', () => {});

  it('filters the data according to the search model criteria', () => {});

  it('allows the data to be sorted using the current page', () => {});

  it('allows the data to be sorted using the entire data set', () => {});
});
