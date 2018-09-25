import { getSortedData } from "../../../shared/getDataSortedBy";

export const getRegions = state => {
  return state.regions;
};

export const getRegionSingle = state => id => {
  return state.regions.find(region => region._id === id);
};

export const getDataSortedBy = state => (sortKey, descending) => {
  return getSortedData(state.regions, sortKey, descending);
};
