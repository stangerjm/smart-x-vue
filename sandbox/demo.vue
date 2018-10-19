<template>
  <div>
    <h1>Loading</h1>
    <bit-loading></bit-loading>

    <h1>Accordion</h1>
    <smart-accordion>
      <h2>Hello</h2>
    </smart-accordion>

    <h1>Details</h1>
    <smart-details :detail-data="{ name: 'James' }"></smart-details>

    <h1>Form</h1>
    <smart-form :form-data="{ Name: String, Age: Number }"
                :form-loading="working"
                :on-submit="submit"
                :validation-errors="errors">
    </smart-form>

    <h1>Searchable Table</h1>
    <stack-searchable-table form-title="Test"
                            route-name="test"
                            :table-data="[
                                  { id: 1, Name: 'James', Age: 25 },
                                  { id: 2, Name: 'Joel', Age: 20 },
                                  { id: 3, Name: 'Jenna', Age: 23 }
                                ]"
                            default-context="test"
                            :searchModel="searchModel">
    </stack-searchable-table>

    <h1>Section</h1>
    <smart-section section-title="Test">
      <h2>Hello</h2>
    </smart-section>

    <h1>Tabs</h1>
    <smart-tabs>

      <bit-tab slot="tab-list">Tab 1</bit-tab>
      <bit-tab slot="tab-list">Tab 2</bit-tab>

      <bit-tab slot="tab-content" :is-tab-content="true">Asdf</bit-tab>
      <bit-tab slot="tab-content" :is-tab-content="true">
        <smart-details :detail-data="{ name: 'James' }"></smart-details>
      </bit-tab>

    </smart-tabs>
  </div>
</template>

<script>
import SmartSection from "../src/components/smart-section";
import BitLoading from "../src/components/bit-loading";
import SmartAccordion from "../src/components/smart-accordion";
import SmartDetails from "../src/components/smart-details";
import SmartTabs from "../src/components/smart-tabs";
import BitTab from "../src/components/bit-tab";
import SmartForm from "../src/components/smart-form";
import SmartTable from "../src/components/smart-table";
import StackSearchableTable from "../src/components/stack-searchableTable";

export default {
  name: "demo",
  components: {
    BitTab,
    SmartTabs,
    SmartDetails,
    SmartAccordion,
    BitLoading,
    SmartSection,
    SmartNav: () => import("../src/components/smart-nav"),
    SmartFooter: () => import("../src/components/smart-footer"),
    LayoutMain: () => import("../src/components/layout-main"),
    SmartForm,
    SmartTable,
    StackSearchableTable,
    BitInput: () => import("../src/components/bit-input")
  },
  // computed: {
  //   propsToLink() {
  //     return {
  //       manufacturerName: createLinkToRecord({
  //         linkContext: "Manufacturer",
  //         linkAction: "Details",
  //         destinationLookupKey: "name",
  //         destinationTable: this.getPeople,
  //         destinationIdKey: "_id"
  //       })
  //     };
  //   }
  // },
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
      errors: [],
      formData: {
        name: String,
        age: Number,
        child: ["James", "Jesse", "Jackson", "Jason"],
        isEmployee: Boolean,
        birthday: Date
      },
      searchModel: {
        Name: String,
        Age: Number
      },
      textModel: "",
      dateModel: new Date(),
      working: false,
      count: 0
    };
  },
  methods: {
    async submit(submittedData) {
      this.working = true;
      await this.delay(3000);
      if (this.count > 0) {
        this.count--;
        this.errors = [
          {
            fieldName: "Name",
            message: "Name must be ten million characters in length."
          },
          {
            fieldName: "Age",
            message: "You must be this old to play the game"
          },
          {
            fieldName: null,
            message: "Network Error"
          }
        ];
      } else {
        this.count++;
        this.errors = [
          {
            fieldName: "Age",
            message: "You must be this old to play the game"
          }
        ];
      }
      this.working = false;
    },
    delay(time, value) {
      return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, value), time);
      });
    }
  }
};
</script>

<style scoped>
</style>
