<template>
  <form :class="[
          centerForm
          ? 'smart-form-centered'
          : 'smart-form',
        ]"
        v-if="formData"
        v-bind="$attrs">

    <!-- Loading spinner that keeps track of the loading state of the form -->
    <smart-loading :loading="working">

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
                      :required-field="item.required"
                      :stack-elements="stackInputs"
                      :line-up="lineUpInputs"
                      :errored-field="item.errored">
          </bit-select>

          <!-- Render as a bit-input component if above conditions are false -->
          <bit-input class="smart-form--field"
                     :ref="key.toLowerCase()"
                     :style="getFlexProp(item.span)"
                     :key="key"
                     v-else-if="isValidField(item, key)"
                     :name="key"
                     :input-type="getInputType(item.typeConstructor)"
                     :label-text="item.displayName ? item.displayName : key | toTitleCase"
                     :readonly="item.readonly ? item.readonly : false"
                     v-model="item.value"
                     :required-field="item.required"
                     :stack-elements="stackInputs"
                     :line-up="lineUpInputs"
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
          {{submitBtnText}}
        </bit-btn>

        <!-- @slot Placeholder for additional markup after
                   the submit button but before the loading spinner -->
        <slot name="form-buttons"></slot>

      </section>

      <!-- @slot Placeholder for any additional markup after the form -->
      <slot name="form-end"></slot>

      <!-- Render errors if any are passed in -->
      <block-messages class="smart-form--errors"
                      v-if="hasErrors"
                      :messages="errors.map(error => error.message)"
                      :align-left="!centerMessages"
                      message-type="error">
      </block-messages>

    </smart-loading>

  </form>
</template>

<script>
import { createViewModel, getInputType, toTitleCase } from '../global/mixins';
import BitSelect from './bit-select.vue';
import BitBtn from './bit-btn.vue';
import BitInput from './bit-input.vue';
import BlockMessages from './block-messages.vue';
import SmartLoading from './smart-loading.vue';

/**
 * A component that renders a dynamic form based on a model.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-form',
  components: {
    SmartLoading,
    BitSelect,
    BitBtn,
    BitInput,
    BlockMessages,
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
    /**
     * Allows error messages to be centered
     */
    centerMessages: {
      type: Boolean,
      default: false,
    },
    /**
     * Allows inputs to be stacked
     */
    stackInputs: {
      type: Boolean,
      default: true,
    },
    /**
     * Allows inputs to be lined up
     */
    lineUpInputs: {
      type: Boolean,
      default: false,
    },
    /**
     * Text for the submit button
     */
    submitBtnText: {
      type: String,
      default: 'Submit',
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
      /**
       * Contains all the form errors, both internal and external
       */
      errors: [...this.validationErrors],
    };
  },
  watch: {
    /**
     * Watch validation errors for changes and map them to the appropriate fields
     */
    validationErrors() {
      this.errors = this.validationErrors;
      this.mapErrors(this.masterData, this.errors);
    },
    formData() {
      this.masterData = createViewModel(this.formData);
    },
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
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
      // Calculate the width of the element based off of a 12 column grid
      const flexBasis = span != null ? Math.floor((span / 12) * 100) : 100;

      // Return valid flex-basis prop (see CSS flex-box documentation)
      return `flex: 1 1 ${flexBasis}%;`;
    },
    /**
     * Maps errors to the corresponding fields in the passed in data
     * @param masterData
     * @param validationErrors
     */
    mapErrors(masterData, validationErrors) {
      if (validationErrors.length < 1) {
        return;
      }

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


      const firstErrorFieldName = validationErrors[0].fieldName;
      const firstErrorInput = this.$el.querySelector(`.bit-input--field[name="${firstErrorFieldName}"`);

      firstErrorInput.focus();
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
     * Returns a list of errors for each required field that is not filled out.
     * @param submittedData
     * @returns {array} List of validation errors
     */
    getRequiredValidationMessages(submittedData) {
      const submittedDataKeys = Object.keys(submittedData);

      /**
       * Determines if an item is required
       * @param fieldKey
       * @param fieldData
       * @returns {boolean}
       */
      function isItemRequiredAndEmpty([fieldKey, fieldData]) {
        return fieldData.required && !submittedDataKeys.includes(fieldKey);
      }

      /**
       * Creates a validation error for an empty required field
       * @param fieldKey
       * @returns {{fieldName: *, message: string}}
       */
      function mapEmptyRequiredFieldToError([fieldKey]) {
        return {
          fieldName: fieldKey,
          message: `${fieldKey} is required`,
        };
      }

      const emptyRequiredFields = Object.entries(this.masterData).filter(isItemRequiredAndEmpty);

      return emptyRequiredFields.map(mapEmptyRequiredFieldToError);
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

      const submittedData = this.getSubmitData();

      // Validate that all required fields are filled out
      const requiredValidationMessages = this.getRequiredValidationMessages(submittedData);

      // If any validation errors, render errors and exit submission
      if (requiredValidationMessages.length > 0) {
        this.working = false;
        this.errors = requiredValidationMessages;
        this.mapErrors(this.masterData, this.errors);
        return;
      }

      // Call the submit function passed into the component and pass in the form data
      await this.onSubmit(submittedData);

      // Mark the form as having completed
      this.working = false;
    },
  },
  mounted() {
    // Set validation errors when component mounts
    this.mapErrors(this.masterData, this.errors);
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/form/smart-form';
</style>
