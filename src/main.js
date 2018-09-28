if (process.env.NODE_ENV === "development") {
  import("../sandbox").then(init => init.initSandbox());
}

import Vue from "vue";

// Bit level components
import BitBtn from "./components/bit-btn";
import BitDropList from "./components/bit-dropList";
import BitIcon from "./components/bit-icon";
import BitInput from "./components/bit-input";
import BitLoading from "./components/bit-loading";
import BitTab from "./components/bit-tab";
import BitTableCell from "./components/bit-tableCell";

// Block level components
import BlockActionContainer from "./components/block-actionContainer";
import BlockNavList from "./components/block-navList";
import BlockTabContent from "./components/block-tabContent";
import BlockTableBody from "./components/block-tableBody";
import BlockTableHeading from "./components/block-tableHeading";

// Layout components
import LayoutMain from "./components/layout-main";

// Smart Components
import SmartAccordion from "./components/smart-accordion";
import SmartDetails from "./components/smart-details";
import SmartFooter from "./components/smart-footer";
import SmartForm from "./components/smart-form";
import SmartNav from "./components/smart-nav";
import SmartSearch from "./components/smart-search";
import SmartTable from "./components/smart-table";
import SmartTabs from "./components/smart-tabs";

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

export {
  BitBtn,
  BitDropList,
  BitIcon,
  BitInput,
  BitLoading,
  BitTab,
  BitTableCell,
  BlockActionContainer,
  BlockNavList,
  BlockTabContent,
  BlockTableBody,
  BlockTableHeading,
  LayoutMain,
  SmartAccordion,
  SmartDetails,
  SmartFooter,
  SmartForm,
  SmartNav,
  SmartSearch,
  SmartTable,
  SmartTabs
};
