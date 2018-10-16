<template>
  <div id="app">
    <layout-main>

      <template slot="header">

        <smart-nav :nav-items="nav"
                   nav-title="Admin"
                   usr="JMST225">
        </smart-nav>

      </template>

      <template slot="content">

        <stack-searchable-table form-title="Test"
                                route-name="test"
                                :table-data="getPeople"
                                default-context="test"
                                :searchModel="searchModel">
        </stack-searchable-table>

      </template>

      <template slot="footer">

        <smart-footer></smart-footer>

      </template>

    </layout-main>
    <!--<smart-form :form-data="formData" :on-submit="submitData"></smart-form>-->
    <!--<smart-table :table-data="devices" default-context="test" :props-to-link="propsToLink"></smart-table>-->
    <!--<bit-input label-text="test" input-type="text" input-name="test" v-model="textModel"></bit-input>-->
    <!--<bit-input label-text="Date Test" input-type="date" input-name="dateTest" v-model="dateModel"></bit-input>-->
  </div>
</template>

<script>
import SmartForm from "../src/components/smart-form";
import SmartTable from "../src/components/smart-table";
import { createLinkToRecord } from "../src/global/mixins";
import { createNamespacedHelpers } from "vuex";
import StackSearchableTable from "../src/components/stack-searchableTable";
import { config } from "../app.config.js";
import SmartSection from "../src/components/smart-section";

const { mapGetters } = createNamespacedHelpers("people");

export default {
  name: "app",
  components: {
    SmartSection,
    SmartNav: () => import("../src/components/smart-nav"),
    SmartFooter: () => import("../src/components/smart-footer"),
    LayoutMain: () => import("../src/components/layout-main"),
    SmartForm,
    SmartTable,
    StackSearchableTable,
    BitInput: () => import("../src/components/bit-input")
  },
  computed: {
    ...mapGetters(["getPeople"]),
    propsToLink() {
      return {
        manufacturerName: createLinkToRecord({
          linkContext: "Manufacturer",
          linkAction: "Details",
          destinationLookupKey: "name",
          destinationTable: this.getPeople,
          destinationIdKey: "_id"
        })
      };
    }
  },
  data() {
    return {
      devices: [
        { id: 1, deviceModel: "TEST", manufacturerName: "James" },
        { id: 2, deviceModel: "ANOTHER", manufacturerName: "James" },
        { id: 3, deviceModel: "More", manufacturerName: "Smart Start" },
        { id: 4, deviceModel: "Device 1", manufacturerName: "Draeger" },
        { id: 5, deviceModel: "Device 2", manufacturerName: "Smart Start" },
        { id: 6, deviceModel: "Device 3", manufacturerName: "Manufacturer 3" }
      ],
      formData: {
        name: String,
        age: Number,
        child: ["James", "Jesse", "Jackson", "Jason"],
        isEmployee: Boolean,
        birthday: Date
      },
      searchModel: {
        name: String
      },
      textModel: "",
      dateModel: new Date(),
      nav: config.nav
    };
  },
  methods: {
    submit(submittedData) {
      console.log(submittedData);
    }
  },
  created() {
    this.$store.dispatch("people/fetchPeopleData");
  }
};
</script>

<style lang="scss">
</style>
