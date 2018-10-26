import regionService from '../../../services/regionService';

export const fetchRegionData = async (context) => {
  const response = await regionService.fetchRegions();
  const { data: { regions } } = response;
  context.commit('updateRegions', regions);
};

export const addRegion = async (context, region) => {
  const response = await regionService.addRegion(region);
  const newRegion = response.data;
  context.commit('addRegion', newRegion);
};

export const deleteRegion = async (context, payload) => {
  await regionService.deleteRegion(payload.id);
  context.commit('deleteRegion', payload.id);
};

export const editRegion = async (context, payload) => {
  const response = await regionService.editRegion(payload.region, payload.id);
  context.commit('editRegion', response.data);
};

export const fetchRegion = async (context, id) => {
  const response = await regionService.fetchRegion(id);
  return response.data;
};
