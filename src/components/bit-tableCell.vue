<template>
  <td :class="{
    'smart-table--cell': true,
    'smart-table--key': isTableKey,
    'smart-table--centeredCell': isCentered(cellValue.type)
  }"
      :title="cellValue.value">

    <!-- Inline heading (for mobile) -->
    <span class="smart-table--inlineHeading">
      {{ cellTitle | toTitleCase }}:
    </span>

    <!-- Render value as checkbox if boolean -->
    <input v-if="cellValue.type === Boolean.name"
           type="checkbox"
           :checked="cellValue.value"
           disabled>

    <!-- Render as date if cellValue is a date -->
    <template v-else-if="cellValue.type === Date.name">
      {{ cellValue.value | formatDate }}
    </template>

    <template v-else-if="cellValue.type === Object.name">
      <slot :obj="cellValue.value"></slot>
    </template>

    <!-- Render value as text if anything else -->
    <template v-else>
      {{ cellValue.value }}
    </template>
  </td>
</template>

<script>
import { toTitleCase, formatDate } from '../global/mixins';


/**
 * A dynamic table cell that will display data in a uniform way
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-tableCell.md
 * @version 1.0
 */
export default {
  name: 'bit-table-cell',
  props: {
    /**
     * The value to be rendered in the cell
     */
    cellValue: {
      type: Object,
      required: true,
    },
    /**
     * The title to be rendered as the inline, mobile title
     */
    cellTitle: {
      type: String,
      required: true,
    },
    /**
     * Flag indicating if the cell should be treated as a table key
     * and displayed on all screen sizes
     */
    isTableKey: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    toTitleCase,
    formatDate,
  },
  methods: {
    /**
     * Returns true if value should be centered in the table.
     */
    isCentered(value) {
      return value === Number.name || value === Boolean.name;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/table/smart-table';
</style>
