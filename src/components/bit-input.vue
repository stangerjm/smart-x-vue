<template>
  <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">
    <!-- Render label regardless of input type -->
    <label class="bit-input--label"
           :class="[
              requiredField ? 'bit-input--required' : '',
              lineUp ? 'bit-input--neatLabel' : '']"
           :for="inputId ? inputId : randomId">
      {{labelText}}
    </label>

    <!-- Render as a checkbox if value is a boolean -->
    <template v-if="inputType === InputType.CHECKBOX">

      <input class="bit-input--field"
             :class="[erroredField ? 'bit-input--error' : '']"
             :id="inputId ? inputId : randomId"
             :type="inputType"
             :value="value"
             :checked="value"
             @change="updateCheckbox"
             v-bind="$attrs">
      <!-- Hidden checkbox for .NET MVC applications -->
      <input type="hidden" value="false">

    </template>

    <template v-else-if="inputType === InputType.DATE">

      <!-- Wrapper for datepicker -->
      <div class="bit-input--dateWrapper">

        <!-- Datepicker icon -->
        <span class="bit-input--datepicker"></span>

        <!-- Actual datepicker element -->
        <input class="bit-input--field bit-input--date"
               :ref="InputType.DATE"
               :class="[erroredField ? 'bit-input--error' : '']"
               :id="inputId ? inputId : randomId"
               @input="updateValue"
               v-bind="$attrs"
               :type="inputType">

      </div>

    </template>

    <!-- Render as an input box if value is any other type -->
    <template v-else>

      <input class="bit-input--field"
             :ref="InputType.PHONE"
             :value="value"
             :class="[erroredField ? 'bit-input--error' : '']"
             :id="inputId ? inputId : randomId"
             @input="updateValue"
             v-bind="$attrs"
             :type="getHtmlInputType(inputType)">

    </template>
  </div>
</template>

<script>
import FlatPickr from 'flatpickr';
import InputMask from 'inputmask';
import 'flatpickr/dist/flatpickr.min.css';
import config from '../../app.config';
import InputType from '../global/constants/InputType';
import { generateRandomId } from '../global/mixins';

/**
 * Determines if a date string is valid
 * *Note: this assums the date string is in the following format: mm/dd/yyyy
 * @param {string} dateString - The date string to vlidate
 * @returns {boolean} Flag indicating if the string is a valid date.
 */
function dateStringIsValid(dateString) {
  if (new Date(dateString).toString() === 'Invalid Date') {
    return false;
  }

  const [month, day, year] = dateString.split('/');
  const testDate = new Date(dateString);

  return testDate.getFullYear() === Number(year)
          && testDate.getMonth() + 1 === Number(month)
          && testDate.getDate() === Number(day);
}

/**
 * A flexible input and label that can be rendered as a text field,
 * number, date-picker, checkbox, password field, or phone number field.
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-input.md
 * @version 1.0
 */
export default {
  name: 'bit-input',
  props: {
    /**
     * The type the input should render as.
     * For example: 'checkbox' will render a checkbox,
     * 'date' will render a date-picker, 'password' will render a password input, etc.
     */
    inputType: {
      type: String,
      required: true,
    },
    /**
     * Display text for the related input label
     */
    labelText: {
      type: String,
      required: true,
    },
    /**
     * Flag to have input and label stack horizontally if set to true
     */
    stackElements: {
      type: Boolean,
      default: false,
    },
    /**
     * Corresponds to the native HTML input attribute 'id'
     */
    inputId: {
      type: String,
    },
    /**
     * Flag to indicate if the field should be required or not
     */
    requiredField: {
      type: Boolean,
      default: false,
    },
    /**
     * Allows component to return the user-updated input value.
     * Value will be cast to specified type before being emitted back to parent.
     */
    value: {},
    /**
     * Flag to indicate if the field has an error associated with it
     */
    erroredField: {
      type: Boolean,
      default: false,
    },
    /**
     * Lines up the input label to a uniform position to be in line with other inputs
     * <br>*Note: if stackElements flag is set, this will have no effect.
     */
    lineUp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * Random id generated for input boxes and their corresponding labels
       */
      randomId: `input-${generateRandomId()}`,
      /**
       * Date-picker configuration
       */
      flatpickrConfig: {
        allowInput: true,
        dateFormat: 'm/d/Y',
        minDate: '01/01/1900',
        maxDate: '12/31/2099',
        clickOpens: false,
        onClose: this.validateField,
      },
      /**
       * Allow imported InputType constant to be accessible in the template.
       */
      InputType,
    };
  },
  methods: {
    /**
     * Maps the passed in InputType to a valid HTML input type
     * @param {InputType} inputType
     * @returns {string}
     */
    getHtmlInputType(inputType) {
      return inputType !== InputType.PHONE ? inputType : 'text';
    },
    /**
     * Event emitter that will update the v-model for a checkbox
     */
    updateCheckbox() {
      this.$emit('input', !this.value);
    },
    /**
     * Mounts a date-picker component
     */
    mountDatePicker() {
      const self = this;

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
       * @param validator
       * @param pickerIcon
       */
      function setDatepickerOptions(datePicker, initialValue, validator, pickerIcon) {
        // Create a copy of the initial value so as not to accidentally override an object property
        let value = initialValue;

        // If value is an empty string, convert into a date.
        if (value === '') {
          value = new Date();
        }

        // Set the flatpickr input element's date value
        datePicker.setDate(value);

        const isReadonly = self.$el.querySelector('input').readOnly;
        if (isReadonly === false) {
          // Set the datepicker icon to open the date picker on click
          pickerIcon.onclick = openDatePicker(datePicker);

          // Validate on focus out (or blur)
          datePicker.element.onblur = () => {
            validator(
              datePicker.selectedDates,
              datePicker.element.value,
              datePicker,
            );
          };
        }
      }

      // Transform date elements into date-pickers
      const datePicker = FlatPickr(this.$refs[InputType.DATE], this.flatpickrConfig);
      const pickerIcon = self.$el.querySelector('.bit-input--datepicker');
      // const datePicker = FlatPickr('.bit-input--date', this.flatpickrConfig);
      // If more than one date picker, set options for each.
      if (datePicker.length > 1) {
        datePicker.forEach((picker) => {
          setDatepickerOptions(picker, this.value, this.validateField, pickerIcon);
        });
      } else if (datePicker.element) {
        // If only one date picker, set the options for this one.
        setDatepickerOptions(datePicker, this.value, this.validateField, pickerIcon);
      }

      // Apply input mask
      const datePickerEl = this.$refs[InputType.DATE];
      const inputMask = new InputMask({
        mask: config.dateInputMask,
        placeholder: config.dateInputPlaceholder,
      });
      inputMask.mask(datePickerEl);
    },
    /**
     * Applies an phone input mask to the input element
     */
    applyPhoneMask() {
      const phoneElement = this.$refs[InputType.PHONE];

      const inputMask = new InputMask({
        mask: config.phoneInputMask,
        placeholder: config.phoneInputPlaceholder,
      });

      inputMask.mask(phoneElement);

      // Reset phone number if input mask is not satisfied
      phoneElement.onblur = () => {
        if (!phoneElement.inputmask.isComplete()) {
          // clear v-model
          this.$emit('input', '');

          // clear physical input
          phoneElement.value = '';
        }
      };
    },
    /**
     * Updates the value passed in only if input mask is completed.
     * @param e
     * @returns {*}
     */
    updateValue(e) {
      /**
       * Casts the passed in value to the type specified.
       * @param value
       * @param type
       * @returns {*}
       */
      function castValue(value, type) {
        // Do not cast if value is empty
        if (value === '') {
          return value;
        }

        switch (type) {
          case InputType.PHONE:
          case InputType.TEXT:
          case InputType.PASSWORD:
            return String(value);
          case InputType.CHECKBOX:
            return Boolean(value);
          case InputType.DATE:
            return dateStringIsValid(value)
              ? new Date(value)
              : null;
          case InputType.NUMBER:
            return Number(value);
          default:
            return value;
        }
      }
      /**
       * Casts the passed in value to the type specified
       * in the component and emits value to parent
       * @param value
       */
      const emit = (value) => {
        const input = this.$el.querySelector('input');
        if (input.readOnly) {
          input.value = '';
          return;
        }

        // Do not emit if phone number is null
        // It will only need to be emitted if it is filled out
        // and will be cleared elsewhere
        if (value == null && this.inputType === InputType.PHONE) {
          return;
        }

        this.$emit('input', castValue(value, this.inputType));
      };

      /**
       * Gets the value to be emitted. Will actively ignore
       * fields that have not completed their input masks.
       * @param inputType
       * @returns {*}
       */
      const getEmitValue = (inputType) => {
        switch (inputType) {
          case InputType.PHONE:
          case InputType.DATE:
            if (this.$refs[inputType].inputmask.isComplete()) {
              return e.target.value;
            }

            // Return undefined important here because if null
            // is emitted, value is not properly cleared
            return undefined;
          default:
            return e.target.value;
        }
      };

      emit(getEmitValue(this.inputType));
    },
    /**
     * Validates a flatpickr component and sets value to null if the value does not validate
     * @param selectedDates
     * @param dateStr
     * @param instance
     */
    validateField(selectedDates, dateStr, instance) {
      // Reset if date is invalid
      if (!dateStringIsValid(dateStr)) {
        instance._input.value = null;
      }
    },
    applyMasks() {
      if (this.inputType === InputType.DATE) {
        this.mountDatePicker();
      } else if (this.inputType === InputType.PHONE) {
        this.applyPhoneMask();
      }
    },
  },
  /**
   * If component should be a date-picker, mount a date picker to the element
   * If data is a phone number, apply the appropriate input mask
   */
  mounted() {
    this.applyMasks();
  },
};
</script>

<style lang='scss'>
@import '../styles/sass/components/bit/input/bit-input';
</style>
