import regionService from "../../../services/regionService";

export const fetchRegionData = async context => {
  let response = await regionService.fetchRegions();
  let regions = response.data.regions;
  context.commit("updateRegions", regions);
};

export const addRegion = async (context, region) => {
  let response = await regionService.addRegion(region);
  let newRegion = response.data;
  context.commit("addRegion", newRegion);
};

export const deleteRegion = async (context, payload) => {
  await regionService.deleteRegion(payload.id);
  context.commit("deleteRegion", payload.id);
};

export const editRegion = async (context, payload) => {
  let response = await regionService.editRegion(payload.region, payload.id);
  context.commit("editRegion", response.data);
};

export const fetchRegion = async (context, id) => {
  let response = await regionService.fetchRegion(id);
  return response.data;
};
