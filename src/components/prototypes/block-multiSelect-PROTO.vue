<template>
  <div :class="stackElements ? 'block-multiSelect-stacked' : 'block-multiSelect'">
    <!-- Render the parent select element -->
    <label class="block-multiSelect--label" :for="'selectParent-' + inputId">
      {{ parentName | toTitleCase }}
    </label>
    <select class="block-multiSelect--select"
            :name="parentName"
            v-model="selectedParent"
            :id="'selectParent-' + inputId">
      <option disabled>
        Please select a {{ parentName | toTitleCase }}
      </option>
      <option v-for="parentNode in selectData"
              :key="parentNode[parentDisplayKey]"
              :value="parentNode">
        {{parentNode[parentDisplayKey]}}
      </option>
    </select>

    <!-- Render the child select element -->
    <label class="block-multiSelect--label" :for="'selectChild-' + inputId">
      {{ childName | toTitleCase }}
    </label>
    <select class="block-multiSelect--select"
            :name="childName"
            v-model="selectedChild"
            :id="'selectChild-' + inputId">
      <option disabled>
        Please select a {{Object.keys(selectedParent).length !== 0 ? childName : parentName}}
      </option>
      <option v-for="childNode in selectedParent[arrayKey]" :key="childNode[childDisplayKey]">
        {{childNode[childDisplayKey]}}
      </option>
    </select>
  </div>
</template>

<script>
import { toTitleCase } from '../../global/mixins';

/**
 * A component that renders two select elements that have a parent-child relationship.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'block-multi-select',
  props: {
    /**
     * An array of objects that contains both the parent and child data. See object structure below.
     */
    optionsData: {
      type: Array,
      default: () => [],
    },
    /**
     * The title to display before the parent select element.
     */
    parentName: {
      required: true,
      type: String,
    },
    /**
     * The title to display before the child select element.
     */
    childName: {
      required: true,
      type: String,
    },
    /**
     * The object key to use for displaying the parent information.
     */
    parentDisplayKey: {
      required: true,
      type: String,
    },
    /**
     * The object key to use for displaying the child information.
     */
    childDisplayKey: {
      required: true,
      type: String,
    },
    /**
     * Flag indicating if the elements should be rendered horizontally or vertically
     */
    stackElements: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * v-model for the parent object
       */
      selectedParent: {},
      /**
       * v-model for the child object
       */
      selectedChild: {},
      /**
       * Randomly generated id for the input and label elements.
       */
      inputId: Math.random()
        .toString(36)
        .substr(2, 9),
      /**
       * Local copy of the options data passed into the component.
       */
      selectData: this.optionsData,
    };
  },
  filters: {
    toTitleCase,
  },
  computed: {
    /**
     * Gets the key of the first array property in the 'selectData' local prop
     */
    arrayKey() {
      if (this.selectData.length > 0) {
        // const firstData = this.selectData[0];
        // Object.keys(firstData).forEach(option => {
        //   if (Array.isArray(firstData[option])) {
        //     return option;
        //   }
        // });
      }

      return null;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../../styles/sass/global/mixins';
@import '../../styles/sass/global/variables';
@import '../../styles/sass/components/block/multiSelect/block-multiSelect';
</style>
