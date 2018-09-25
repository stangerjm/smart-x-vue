<template>
  <form class="smart-form" v-if="formData">
    <header class="smart-form--titleSection" v-if="formTitle">
      <h3 class="smart-form--title">{{formTitle}}</h3>
    </header>
    <section class="smart-form--fieldSection">
      <!-- @slot Area for extra inputs to be added. -->
      <slot></slot>

      <!-- Render each item in the "masterData" array as an input field with a label. -->
      <template v-for="(item, key) in masterData">
        <!-- If the item is the object's id, render it as a hidden field. -->
        <input v-if="isObjectId(key)"
               :name="key"
               type="hidden"
               :key="key"
               v-model="item.value">

        <!-- Render as a select element if value is a list of items -->
        <bit-select class="smart-form--field"
                    :key="key"
                    v-else-if="Array.isArray(item.value)"
                    :input-name="key"
                    :label-text="key | toTitleCase"
                    :readonly="readonlyInputs.includes(key)"
                    :select-data="item.value"
                    v-model="selectData[key]"
                    :stack-elements="true">
        </bit-select>

        <!-- Render as a bit-input component if above conditions are false -->
        <bit-input class="smart-form--field"
                   :key="key"
                   v-else-if="isValidField(item, key)"
                   :stack-elements="true"
                   :input-name="key"
                   :input-type="getType(item)"
                   :label-text="key | toTitleCase"
                   :readonly="readonlyInputs.includes(key)"
                   v-model="item.value">
        </bit-input>
      </template>
      <bit-btn @click.native="submit">Submit</bit-btn>
    </section>
  </form>
</template>
<script>
import BitBtn from "./bit-btn";
import BitInput from "./bit-input";
import BitSelect from "./bit-select";
import { InputTypes } from "../global/constants/inputTypes";

/**
 * A component that renders a dynamic form based on a model.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "smart-form",
  components: {
    BitSelect,
    BitBtn,
    BitInput
  },
  props: {
    /**
     * Corresponds to the native HTML attribute "action"
     */
    formAction: {
      type: String,
      default: "/"
    },
    /**
     * Function to be executed on form submit.
     * Takes an object that holds the submitted data as a parameter.
     * @param {object} submittedData
     */
    onSubmit: {
      type: Function,
      required: true
    },
    /**
     * The model that the form should use as a template.
     * Note: any properties containing arrays should only contain primitive values.
     */
    formData: {
      type: Object,
      default: () => {}
    },
    /**
     * A list of inputs that should be readonly.
     */
    readonlyInputs: {
      type: Array,
      default: () => []
    },
    /**
     * A list of inputs that should be required.
     */
    requiredInputs: {
      type: Array,
      default: () => []
    },
    /**
     * Optional array of strings that represent properties that should be ignored.
     */
    ignoreFields: {
      type: Array,
      default: () => []
    },
    /**
     * A title that will display at the top of the form.
     */
    formTitle: {
      type: String
    },
    /**
     * Corresponds to the native HTML attribute "method"
     */
    formMethod: {
      type: String
    },
    /**
     * An optional format for the date-picker input field to use.
     */
    dateFormat: {
      type: String,
      default: "MM-dd-yyyy"
    }
  },
  data() {
    let masterData = this.createSchema(this.formData);
    return {
      /**
       * Will contain typed schema derived from the "formData" local property.
       */
      masterData: masterData,
      selectData: this.getSelectData(masterData)
    };
  },
  methods: {
    /**
     * Gets the appropriate input type depending on the value's data type.
     * @param item
     * @returns {string}
     */
    getType: function(item) {
      let type = item.type;
      switch (type) {
        case Array.name:
          return InputTypes.SELECT;
        case Boolean.name:
          return InputTypes.CHECKBOX;
        case Number.name:
          return InputTypes.NUMBER;
        case Date.name:
          return InputTypes.DATE;
        default:
          return InputTypes.TEXT;
      }
    },
    /**
     * Ensures that the item passed in is not an array, and that the key passed in
     * has not been marked to be ignored.
     */
    isValidField(item, key) {
      return !Array.isArray(item) && !this.ignoreFields.includes(key);
    },
    /**
     * Sets the "required" attribute on any elements that correspond to values found in the
     * "requiredInputs" local property.
     */
    setRequiredInputs() {
      for (let requiredInput of this.requiredInputs) {
        let domInput;

        if (this.getType(this.masterData[requiredInput]) === "date") {
          domInput = this.$el.querySelector(
            `.el-date-editor > input[name=${requiredInput}]`
          );
        } else {
          domInput = this.$el.querySelector(`input[name=${requiredInput}]`);
        }

        if (domInput != null) {
          domInput.required = true;
        }
      }
    },
    /**
     * Checks the key to see if it is an id property.
     */
    isObjectId(key) {
      return key.toLowerCase() === "id" || key.toLowerCase() === "_id";
    },
    /**
     * Reduces an array of entries into an object with the array properties reduced to the corresponding selected item.
     */
    reduceArrayPropertiesIntoSelectedValues(accumulatorObj, [key, value]) {
      if (Object.keys(this.selectData).includes(key)) {
        // If property is a list, return an object with the selected list value
        return {
          ...accumulatorObj,
          // If an item has been selected from the list, insert the value into the object.
          // Insert null if nothing has been selected.
          [key]: !Array.isArray(this.selectData[key])
            ? this.selectData[key]
            : null
        };
      }
      //If value pair property is not a list, return the untransformed key
      return {
        ...accumulatorObj,
        [key]: value
      };
    },
    /**
     * Format the data passed into the component if necessary. Formats may
     * include reducing arrays into a single user-selected value.
     */
    getSubmitData() {
      let data = this.masterData.untypedObject;
      if (this.selectData != null) {
        return Object.entries(data).reduce(
          this.reduceArrayPropertiesIntoSelectedValues,
          {}
        );
      }
      return data;
    },
    getSelectData(masterData) {
      return Object.entries(masterData).reduce(function(
        accumulator,
        [formKey, formEntry]
      ) {
        //If property is an array, include in selectData.
        if (Array.isArray(formEntry.value)) {
          return {
            ...accumulator,
            [formKey]: formEntry.value
          };
        }
        //Otherwise, ignore.
        return accumulator;
      });
    },
    /**
     * Execute the "onSubmit" function that was passed into the component and pass
     * properly formatted data to be submitted.
     */
    submit() {
      this.onSubmit(this.getSubmitData());
    }
  },
  /**
   * Set each input specified in the requiredInputs array to have the native HTML attribute "required"
   */
  updated: function() {
    this.setRequiredInputs();
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/global/variables";
@import "../styles/sass/config";
@import "../styles/sass/components/smart/form/smart-form";
</style>
