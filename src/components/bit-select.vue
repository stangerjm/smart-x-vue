<template>
  <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">
    <label class="bit-input--label" :for="randomId">{{labelText}}</label>
    <select class="bit-input--field"
            :id="randomId"
            :name="inputName"
            v-bind="$attrs"
            @input="$emit('input', $event.target.value)">

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
export default {
  name: "bit-select",
  props: {
    /**
     * Data that will be rendered as the select options.
     */
    selectData: {
      type: Array,
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
     * Display text for the related input label
     */
    labelText: {
      type: String,
      required: true
    },
    /**
     * Flag to have input and label stack horizontally if set to true
     */
    stackElements: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: "",
      randomId:
        "input-" +
        Math.random()
          .toString(36)
          .substr(2, 9)
    };
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/bit/input/bit-input";
</style>
