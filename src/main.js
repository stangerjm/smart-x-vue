// Mixins
import {
  parseDateString,
  createViewModel,
  toTitleCase,
  getItemId,
  createLinkToRecord,
  getDataSortedByColumn,
  compare,
  getInputType,
  transformIntoFormModel,
} from './global/mixins';

import ModelType from './global/constants/ModelType';

export {
  parseDateString,
  createViewModel,
  toTitleCase,
  getItemId,
  createLinkToRecord,
  getDataSortedByColumn,
  compare,
  getInputType,
  transformIntoFormModel,
  ModelType,
};

if (process.env.NODE_ENV === 'development') {
  import('../sandbox').then(init => init.initSandbox());
}
