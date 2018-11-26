<template>
  <form :class="[
          centerForm
          ? 'smart-form-centered'
          : 'smart-form',
          working
          ? 'smart-form--loading'
          : ''
        ]"
        v-if="formData"
        v-bind="$attrs">

    <!-- Render title -->
    <header class="smart-form--titleSection" v-if="formTitle">
      <h3 class="smart-form--title">{{formTitle}}</h3>
    </header>

    <section class="smart-form--fieldSection">

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
                    :style="getFlexProp(item.span)"
                    :key="key"
                    v-else-if="Array.isArray(item.value)"
                    :name="key"
                    :label-text="key | toTitleCase"
                    :readonly="item.readonly ? item.readonly : false"
                    :select-data="item.value"
                    v-model="selectData[key]"
                    :stack-elements="true"
                    :errored-field="item.errored">
        </bit-select>

        <!-- Render as a bit-input component if above conditions are false -->
        <bit-input class="smart-form--field"
                   :style="getFlexProp(item.span)"
                   :key="key"
                   v-else-if="isValidField(item, key)"
                   :stack-elements="true"
                   :name="key"
                   :input-type="getInputType(item.typeConstructor)"
                   :label-text="item.displayName ? item.displayName : key | toTitleCase"
                   :readonly="item.readonly ? item.readonly : false"
                   v-model="item.value"
                   :required-field="item.required"
                   :errored-field="item.errored">
        </bit-input>

      </template>

    </section>

    <section class="smart-form--buttonSection">

      <!-- Submit button -->
      <bit-btn type="submit"
               class="smart-form--button"
               @click.native="submit"
               :btn-size="submitBtnSize">
        Submit
      </bit-btn>

      <!-- @slot Placeholder for additional markup after
                 the submit button but before the loading spinner -->
      <slot name="form-buttons"></slot>

    </section>

    <!-- Only render loading spinner if form is loading -->
    <bit-loading class="smart-form--spinner" v-if="working"></bit-loading>

    <!-- @slot Placeholder for any additional markup after the form -->
    <slot name="form-end"></slot>

    <!-- Render errors if any are passed in -->
    <p class="smart-form--error"
       v-if="hasErrors"
       v-for="(error, key) in validationErrors"
       :key="key">
      {{error.message}}
    </p>

  </form>
</template>

<script>
import { createViewModel, getInputType, toTitleCase } from '../global/mixins';
import BitLoading from './bit-loading.vue';
import BitSelect from './bit-select.vue';
import BitBtn from './bit-btn.vue';
import BitInput from './bit-input.vue';

/**
 * A component that renders a dynamic form based on a model.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-form',
  components: {
    BitLoading,
    BitSelect,
    BitBtn,
    BitInput,
  },
  props: {
    /**
     * Function to be executed on form submit.
     * Takes an object that holds the submitted data as a parameter.
     * @param {object} submittedData
     */
    onSubmit: {
      type: Function,
      required: true,
    },
    /**
     * The model that the form should use as a template.
     * Note: any properties containing arrays should only contain primitive values.
     */
    formData: {
      type: [Object, Array],
      default: () => {},
    },
    /**
     * Optional array of strings that represent properties that should be ignored.
     */
    ignoreFields: {
      type: Array,
      default: () => [],
    },
    /**
     * A title that will display at the top of the form.
     */
    formTitle: {
      type: String,
    },
    /**
     * Corresponds to the native HTML attribute 'method'
     */
    formMethod: {
      type: String,
    },
    /**
     * List of validation errors
     */
    validationErrors: {
      type: Array,
      default: () => [],
    },
    /**
     * Flag that will optionally center the form
     */
    centerForm: {
      type: Boolean,
      default: false,
    },
    /**
     * Size of the submit button. Accepts 'small', 'medium', or 'large'
     */
    submitBtnSize: {
      type: String,
      default: 'medium',
    },
  },
  data() {
    const masterData = createViewModel(this.formData);
    return {
      /**
       * Will contain typed schema derived from the 'formData' local property.
       */
      masterData,
      /**
       * Contains all of the data that should be rendered as select elements
       */
      selectData: this.getSelectData(masterData),
      /**
       * Flag indicating that the form is loading
       */
      working: false,
    };
  },
  watch: {
    /**
     * Watch validation errors for changes and map them to the appropriate fields
     */
    validationErrors() {
      this.mapErrors(this.masterData, this.validationErrors);
    },
  },
  computed: {
    hasErrors() {
      return this.validationErrors.length > 0;
    },
  },
  filters: {
    toTitleCase,
  },
  methods: {
    getInputType,
    /**
     * Calculates the flex width of an element based off of the span parameter
     * @param span
     * @returns {string}
     */
    getFlexProp(span) {
      const flexBasis = span != null ? Math.floor((span / 12) * 100) : 100;
      return `flex: 1 1 ${flexBasis}%;`;
    },
    /**
     * Maps errors to the corresponding fields in the passed in data
     * @param masterData
     * @param validationErrors
     */
    mapErrors(masterData, validationErrors) {
      /**
       * Sets the 'errored' property of the data at the propName passed in to true if
       * a corresponding error is found
       * @param propName
       */
      function modifyMatchingField(propName) {
        /**
         * Finds the field name matching the error passed in
         * @param error
         * @returns {boolean}
         */
        function findMatchingField(error) {
          return error.fieldName === propName;
        }
        // Find the matching field name
        const key = validationErrors.find(findMatchingField);
        // Set errored field to true if a matching field name was found, false if otherwise.
        masterData[propName].errored = key != null;
      }
      // Map field names to corresponding errors
      Object.keys(masterData).map(modifyMatchingField);
    },
    /**
     * Ensures that the item passed in is not an array, and that the key passed in
     * has not been marked to be ignored.
     */
    isValidField(item, key) {
      return !Array.isArray(item) && !this.ignoreFields.includes(key);
    },
    /**
     * Checks the key to see if it is an id property.
     */
    isObjectId(key) {
      return key.toLowerCase() === 'id' || key.toLowerCase() === '_id';
    },
    /**
     * Reduces an array of entries into an object with the
     * array properties reduced to the corresponding selected item.
     */
    reduceArrayPropertiesIntoSelectedValues(accumulatorObj, [key, value]) {
      if (Object.keys(this.selectData).includes(key)) {
        // Do not include select data if an item has not been selected
        if (Array.isArray(this.selectData[key])) {
          return accumulatorObj;
        }
        // If property is a list, return an object with the selected list value
        return {
          ...accumulatorObj,
          [key]: this.selectData[key],
        };
      }
      // If value pair property is not a list, return the untransformed key
      return {
        ...accumulatorObj,
        [key]: value,
      };
    },
    /**
     * Format the data passed into the component if necessary. Formats may
     * include reducing arrays into a single user-selected value.
     */
    getSubmitData() {
      const data = this.masterData.simpleVersion;
      if (this.selectData != null) {
        return Object.entries(data).reduce(
          this.reduceArrayPropertiesIntoSelectedValues,
          {},
        );
      }
      return data;
    },
    getSelectData(masterData) {
      const masterDataEntries = Object.entries(masterData);

      if (masterData == null || masterDataEntries.length < 1) {
        return [];
      }

      return masterDataEntries.reduce((accumulator, [formKey, formEntry]) => {
        // If property is an array, include in selectData.
        if (Array.isArray(formEntry.value)) {
          return {
            ...accumulator,
            [formKey]: formEntry.value,
          };
        }
        // Otherwise, ignore.
        return accumulator;
      });
    },
    /**
     * Execute the 'onSubmit' function that was passed into the component and pass
     * properly formatted data to be submitted.
     */
    async submit(e) {
      // Prevent form from submitting
      e.preventDefault();

      // Flag the form as working
      this.working = true;

      // Call the submit function passed into the component and pass in the form data
      await this.onSubmit(this.getSubmitData());

      // Mark the form as having completed
      this.working = false;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/form/smart-form';
</style>
