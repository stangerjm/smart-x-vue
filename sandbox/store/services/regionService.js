import api from "./api/api";

export default {
  fetchRegions() {
    return api().get("region");
  },
  addRegion(params) {
    return api().post("region", params);
  },
  fetchRegion(id) {
    return api().get("region/" + id);
  },
  deleteRegion(id) {
    return api().delete("region/" + id);
  },
  editRegion(params, id) {
    return api().put("region/" + id, params);
  }
};
