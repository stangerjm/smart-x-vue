<template>
  <div id="app">
    <!--<smart-form :form-data="formData" :on-submit="submitData"></smart-form>-->
    <!--<smart-table :table-data="devices" default-context="test" :props-to-link="propsToLink"></smart-table>-->
    <stack-searchable-table form-title="Test"
                            route-name="test"
                            :table-data="getPeople"
                            default-context="test"
                            :searchModel="searchModel">
    </stack-searchable-table>
    <!--<bit-input label-text="test" input-type="text" input-name="test" v-model="textModel"></bit-input>-->
    <!--<bit-input label-text="Date Test" input-type="date" input-name="dateTest" v-model="dateModel"></bit-input>-->
  </div>
</template>

<script>
import SmartForm from "../../src/components/smart-form";
import SmartTable from "../../src/components/smart-table";
import { createLinkToRecord } from "../../src/global/mixins";
import { createNamespacedHelpers } from "vuex";
import StackSearchableTable from "smart-x-vue";

const { mapGetters } = createNamespacedHelpers("people");

export default {
  name: "app",
  components: {
    SmartForm,
    SmartTable,
    StackSearchableTable,
    BitInput: () => import("../../src/components/bit-input")
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
      dateModel: new Date()
    };
  },
  created() {
    this.$store.dispatch("people/fetchPeopleData");
  }
};
</script>

<style lang="scss">
</style>
