<template>
  <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">

    <!-- Select label -->
    <label class="bit-input--label"
           :class="{
              'bit-input--neatLabel': lineUp,
              'bit-input--required' : requiredField
           }"
           :for="randomId">{{labelText}}</label>

    <!-- Select element -->
    <select class="bit-input--field"
            :class="[erroredField ? 'bit-input--error' : '']"
            :id="randomId"
            v-bind="$attrs"
            @change="$emit('input', $event.target.value)">

      <!-- Default option -->
      <option selected disabled>Please select an option</option>

      <!-- Render an option for each item in the list -->
      <option v-for="(option, key) in selectData"
              :key="key"
              :value="option">
        {{option}}
      </option>

    </select>
  </div>
</template>

<script>
/**
 * A dynamic select element that will render options based off of an array passed in
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-select.md
 * @version 1.0
 */
export default {
  name: 'bit-select',
  props: {
    /**
     * Data that will be rendered as the select options.
     */
    selectData: {
      type: Array,
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
     * Flag to indicate if the field has an error associated with it
     */
    erroredField: {
      type: Boolean,
      default: false,
    },
    /**
     * Flag to indicate if the field should be required or not
     */
    requiredField: {
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
      selectedValue: '',
      randomId: `input-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/input/bit-input';
</style>
