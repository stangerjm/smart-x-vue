<template>
  <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">
    <!-- Render label regardless of input type -->
    <label class="bit-input--label" :for="inputId ? inputId : randomId">{{labelText}}</label>

    <!-- Render as a checkbox if value is a boolean -->
    <template v-if="inputType === InputTypes.CHECKBOX">
      <input class="bit-input--field"
             :id="inputName"
             :type="inputType"
             :name="inputName"
             :checked="checked"
             @change="updateCheckbox"
             v-bind="$attrs">
      <!-- Hidden checkbox for .NET MVC applications -->
      <input type="hidden" value="false" :name="inputName">
    </template>

    <template v-else-if="inputType === InputTypes.DATE">
      <input class="bit-input--field bit-input--date"
             :id="inputId ? inputId : randomId"
             :name="inputName"
             @input="$emit('input', $event.target.value)"
             v-bind="$attrs"
             :type="inputType">
    </template>

    <!-- Render as an input box if value is any other type -->
    <template v-else>
      <input class="bit-input--field"
             :id="inputId ? inputId : randomId"
             :value="value"
             :name="inputName"
             @input="$emit('input', $event.target.value)"
             v-bind="$attrs"
             :type="inputType">
    </template>
  </div>
</template>

<script>
import FlatPickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { config } from "../../app.config.js";
import { InputTypes } from "../global/constants/inputTypes";
import InputMask from "inputmask";
import moment from "moment";

/**
 * A component that can be rendered as a text, number, or datepicker input.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "bit-input",
  props: {
    /**
     * Corresponds to the native HTML input attribute "type"
     */
    inputType: {
      type: String,
      required: true
    },
    /**
     * Display text for the related input label
     */
    labelText: {
      type: String,
      required: true
    },
    /**
     * Corresponds to the native HTML input attribute "name"
     */
    inputName: {
      type: String,
      required: true
    },
    /**
     * Flag to have input and label stack horizontally if set to true
     */
    stackElements: {
      type: Boolean,
      default: false
    },
    /**
     * Corresponds to the native HTML input attribute "id"
     */
    inputId: {
      type: String
    },
    /**
     * Allows v-model to return the altered input value
     */
    value: {}
  },
  data() {
    return {
      /**
       * Random id generated for input boxes and their corresponding labels
       */
      randomId:
        "input-" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      /**
       * Date-picker configuration
       */
      flatpickrConfig: {
        allowInput: true,
        dateFormat: "m/d/Y",
        minDate: "01/01/1900",
        maxDate: "12/31/2099",
        clickOpens: false
      },
      /**
       * Allow imported InputTypes constant to be accessible in the template.
       */
      InputTypes: InputTypes,
      /**
       * Flag that keeps track of the state of a checkbox
       */
      checked: this.value
    };
  },
  methods: {
    /**
     * Event emitter that will update the v-model for a checkbox
     */
    updateCheckbox() {
      this.checked = !this.checked;
      this.$emit("input", this.checked);
    },
    /**
     * Mounts a date-picker component
     */
    mountDatePicker() {
      /**
       * Opens a flatpickr component
       * @param picker
       * @returns {open}
       */
      function openDatePicker(picker) {
        return function open() {
          picker.open();
        };
      }

      /**
       * Initializes a flatpickr component by setting options and initial values.
       * @param datePicker
       * @param initialValue
       */
      function setDatepickerOptions(datePicker, initialValue) {
        // Create a copy of the inital value so as not to accidentally override an object property
        let value = initialValue;
        // If value is an empty string, convert into a date.
        if (value === "") {
          value = new Date();
        }

        // Check if value is not null, so that a constructor can be accessed.
        // If the value's constructor is a date, convert to string.
        if (value != null && value.constructor === Date) {
          value = moment(value).format(config.dateFormat);
        }
        // Set the flatpickr input element's date value
        datePicker.setDate(value);
        // Add a click listener so that the date picker will always open on click.
        datePicker._input.onclick = openDatePicker(datePicker);
      }

      // Transform date elements into date-pickers
      let datePicker = FlatPickr(".bit-input--date", this.flatpickrConfig);
      // If more than one date picker, set options for each.
      if (datePicker.length > 1) {
        datePicker.forEach(function(picker) {
          setDatepickerOptions(picker, this.value);
        });
      } else if (datePicker.element) {
        // If only one date picker, set the options for this one.
        setDatepickerOptions(datePicker, this.value);
      }

      // Apply input mask
      let datePickerEl = document.querySelector(
        ".bit-input--field.bit-input--date:not([type=hidden])"
      );
      let inputMask = new InputMask({
        mask: config.inputMask,
        placeholder: config.dateFormat
      });
      inputMask.mask(datePickerEl);
    }
  },
  /**
   * If component should be a date-picker, mount a date picker to the element
   */
  mounted() {
    if (this.inputType === InputTypes.DATE) {
      this.mountDatePicker();
    }
  }
};
</script>

<style lang="scss">
@import "../styles/sass/global/variables";
@import "../styles/sass/global/mixins";
@import "../styles/sass/components/bit/input/bit-input";
</style>
