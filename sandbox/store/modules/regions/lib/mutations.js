export const updateRegions = (state, regions) => {
  state.regions = regions;
};

export const addRegion = (state, region) => {
  state.regions.push(region);
};

export const deleteRegion = (state, id) => {
  let index = state.regions.findIndex(region => region._id === id);
  state.regions.splice(index, 1);
};

export const editRegion = (state, newRegion) => {
  let index = state.regions.findIndex(region => region._id === newRegion._id);
  state.regions.splice(index, 1, newRegion);
};
