if (process.env.NODE_ENV === "development") {
  import("../sandbox").then(init => init.initSandbox());
}

import Vue from "vue";

// Mixins
import {
  parseDateString,
  createSchema,
  toTitleCase,
  getNonReactiveCopy,
  getItemId,
  createLinkToRecord,
  getSortedData,
  compare,
  getInputType
} from "./global/mixins";

export {
  parseDateString,
  createSchema,
  toTitleCase,
  getNonReactiveCopy,
  getItemId,
  createLinkToRecord,
  getSortedData,
  compare,
  getInputType
};

// Include mixins
Vue.mixin({
  methods: {
    createSchema: createSchema,
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
