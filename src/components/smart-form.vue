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

/**
 * A component that renders a dynamic form based on a model.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "smart-form",
  components: {
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
    return {
      /**
       * Will contain typed schema derived from the "formData" local property.
       */
      masterData: this.createSchema(this.formData)
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
        case "Boolean":
          return "checkbox";
        case "Number":
          return "number";
        case "Date":
          return "date";
        default:
          return "text";
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
     * Execute the "onSubmit" function that was passed into the component and pass
     * the local typed schema object's "untypedObject" property, which is the untyped
     * version of the typed schema object.
     */
    submit() {
      this.onSubmit(this.masterData.untypedObject);
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
