import { getDataSortedByColumn } from '../../../../../src/global/mixins';

export const getRegions = state => state.regions;

export const getRegionSingle = state => id => state.regions.find(region => region._id === id);

export const getDataSortedBy = state =>
  (sortKey, descending) => getDataSortedByColumn(state.regions, sortKey, descending);
