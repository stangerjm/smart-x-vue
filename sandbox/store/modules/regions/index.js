import * as getters from "./lib/getters";
import * as actions from "./lib/actions";
import * as mutations from "./lib/mutations";

const regions = {
  namespaced: true,
  state: {
    regions: []
  },
  getters,
  actions,
  mutations
};

export default regions;
