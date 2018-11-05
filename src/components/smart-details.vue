<template>
  <div :class="[
    outlined ? 'smart-details-outlined' : 'smart-details'
  ]">
    <header class="smart-details--header">
      <h3 class="smart-details--heading">{{title ? title : 'Details'}}</h3>
    </header>
    <div class="smart-details--listContainer">

      <!-- Render each column -->
      <dl v-for="(column, index) in detailColumns" :key="index" class="smart-details--list">

        <!-- Render each item in the column -->
        <div v-for="[key, detail] in column" :key="key" class="smart-details--detail">

          <!-- Render detail title -->
          <dt class="smart-details--detailKey">{{ key | toTitleCase }}</dt>

          <!-- Render value as checkbox if boolean -->
          <dd class="smart-details--detailValue" v-if="detail.type === Boolean.name">
            <input type="checkbox" :checked="detail.value" disabled>
          </dd>

          <!-- Render as date if detail is a date -->
          <dd class="smart-details--detailValue" v-else-if="detail.type === Date.name">
            {{ detail.value | moment(config.dateFormat) }}
          </dd>

          <!-- Render value as text if anything else -->
          <dd class="smart-details--detailValue" v-else>
            {{ detail.value }}
          </dd>

        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import config from '../../app.config';
import { splitArrayIntoChunks } from '../global/mixins/helpers';
import { createViewModel, toTitleCase } from '../global/mixins';

Vue.use(require('vue-moment'));

/**
 * A component that renders a model as a list of details.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-details',
  props: {
    /**
     * The object that will be displayed as a list of properties.
     */
    detailData: {
      type: Object,
      required: true,
    },
    /**
     * The title to display before the details list.
     */
    title: {
      type: String,
    },
    /**
     * Number indicating how many details should display before forcing the next
     * details to the next column.
     */
    detailsPerColumn: {
      type: Number,
      default: 8,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * User-defined app configuration
       */
      config,
      /**
       * Array that will hold the objects containing
       * properties that have been broken up into columns.
       */
      detailColumns: [],
    };
  },
  filters: {
    toTitleCase,
  },
  computed: {
    /**
     * Typed schema object derived from the local 'detailData' property.
     */
    typedDetails() {
      return createViewModel(this.detailData);
    },
  },
  methods: {
    /**
     * Returns true if the passed in type is an Array or an Object
     * @param type
     */
    isObjectOrArray(type) {
      return type === Array.name && type === Object.name;
    },
    /**
     * Returns true if the value should be hidden
     * @param value
     */
    isHiddenField(value) {
      return value.startsWith('_');
    },
  },
  /**
   * Filter out associated records and break main details object into objects representing columns.
   */
  created() {
    const details = Object.entries(this.typedDetails);

    // create filter to filter out objects and arrays
    const filterOutOfScopeData = (item) => {
      const [key, value] = item;
      if (!this.isObjectOrArray(value.type)) {
        return !this.isHiddenField(key);
      }

      return false;
    };

    // Filter data to exclude objects and arrays
    const filteredEntries = details.filter(filterOutOfScopeData);

    // Split the array into chunks with equal elements and assign it to detailColumns
    this.detailColumns = splitArrayIntoChunks(
      filteredEntries,
      this.detailsPerColumn,
    );
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/details/smart-details';
</style>
