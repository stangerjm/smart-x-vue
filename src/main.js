if (process.env.NODE_ENV === "development") {
  import("../sandbox").then(init => init.initSandbox());
}

import Vue from "vue";

// Mixins
import {
  parseDateString,
  createViewModel,
  toTitleCase,
  getNonReactiveCopy,
  getItemId,
  createLinkToRecord,
  getSortedData,
  compare,
  getInputType,
  transformIntoFormModel
} from "./global/mixins";

import ModelType from "./global/constants/ModelType";

export {
  parseDateString,
  createViewModel,
  toTitleCase,
  getNonReactiveCopy,
  getItemId,
  createLinkToRecord,
  getSortedData,
  compare,
  getInputType,
  transformIntoFormModel,
  ModelType
};

// Include mixins
Vue.mixin({
  methods: {
    createViewModel: createViewModel,
    getNonReactiveCopy: getNonReactiveCopy,
    getItemId: getItemId,
    createLinkToRecord: createLinkToRecord,
    getInputType: getInputType
  },
  filters: {
    toTitleCase: toTitleCase
  }
});

Vue.use(require("vue-moment"));
