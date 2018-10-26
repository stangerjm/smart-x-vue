if (process.env.NODE_ENV === "development") {
  import("../sandbox").then(init => init.initSandbox());
}

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
