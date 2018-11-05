<template>
  <tbody>
  <tr class="smart-table--row" v-for="item in typedData" :key="getItemId(item)">
    <!-- Render a cell for each item in the table data -->
    <template v-for="(key, index) in dataKeys">
      <bit-table-cell v-if="!isLinkedProperty(key)"
                      :key="key"
                      :cell-value="item[key]"
                      :cell-title="key"
                      :is-table-key="index < 2">
      </bit-table-cell>

      <bit-table-cell v-else
                      :key="key"
                      :cell-value="{
                        type: 'Object',
                        value: { link: getLinkValue(key, item[key].value) }
                      }"
                      cell-title="test">
        <template slot-scope="{ obj }">
          <router-link :to="obj.link">
            {{item[key].value}}
          </router-link>
        </template>
      </bit-table-cell>
    </template>

    <!-- Action container cell -->
    <td class="smart-table--cell" v-if="includeActionContainer">
      <block-action-container
          :default-ctx="defaultContext"
          :item-id="getItemId(item)"
          :details-btn="allowDetails"
          :edit-btn="allowEdit"
          :delete-btn="allowDelete">
      </block-action-container>
    </td>

    <!-- Expand button (for mobile) -->
    <td class="smart-table--expand">
      <bit-btn btn-style="expand" @click.native="expandRecord"></bit-btn>
    </td>
  </tr>
  </tbody>
</template>

<script>
import { getItemId } from '../global/mixins';
import BitTableCell from './bit-tableCell.vue';
import BlockActionContainer from './block-actionContainer.vue';
import BitBtn from './bit-btn.vue';
import EventBus from '../global/EventCenter/EventBus';

export default {
  name: 'block-table-body',
  components: {
    BitTableCell,
    BlockActionContainer,
    BitBtn,
  },
  props: {
    /**
     * Typed data to be rendered in the table.
     * @see {mixin} createViewModel
     */
    typedData: {
      type: Array,
      required: true,
    },
    /**
     * Keys to the 'typedData' object
     * @see typedData
     */
    dataKeys: {
      type: Array,
      required: true,
    },
    /**
     * Default context of the action container
     */
    defaultContext: {
      type: String,
      required: true,
    },
    /**
     * Flag to optionally render details button
     */
    allowDetails: {
      type: Boolean,
      default: true,
    },
    /**
     * Flag to optionally render edit button
     */
    allowEdit: {
      type: Boolean,
      default: true,
    },
    /**
     * Flag to optionally render delete button
     */
    allowDelete: {
      type: Boolean,
      default: true,
    },
    /**
     * Flag to optionally include the action container
     */
    includeActionContainer: {
      type: Boolean,
      default: true,
    },
    /**
     * Object containing the properties that should be rendered as a link to another record.
     */
    propsToLink: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getItemId,
    /**
     * Expands record on mobile screen.
     * @param event
     */
    expandRecord(event) {
      const btn = event.target;
      const row = this.findAncestor(btn, 'smart-table--row');
      row.classList.toggle('record-is-expanded');
      /**
       * Emit to parent that a record has been expanded so parent can resize appropriately.
       * @event recordExpanded
       * @type null
       */
      EventBus.$emit('elementResize');
    },
    /**
     * Finds the nearest ancestor that contains the specified class attribute.
     * @param el
     * @param classSelector
     * @returns {object}
     */
    findAncestor(el, classSelector) {
      // eslint-disable-next-line
      while ((el = el.parentElement) && !el.classList.contains(classSelector));
      return el;
    },
    /**
     * Determines if the passed in key is a property that should be linked.
     * @param key
     * @returns {boolean}
     */
    isLinkedProperty(key) {
      if (this.propsToLink == null) {
        return false;
      }
      return (
        Object.keys(this.propsToLink).find(item => item === key) != null
      );
    },
    /**
     * Utilizes the passed-in propsToLink object to get the link to the corresponding record.
     * @param key
     * @param lookupValue
     * @returns {*}
     */
    getLinkValue(key, lookupValue) {
      return this.propsToLink[key](lookupValue);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/table/smart-table';
</style>
