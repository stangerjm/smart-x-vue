<template>
  <tbody>
  <tr class="smart-table--row" v-for="item in typedData" :key="itemId(item)">
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
                      :cell-title="key">
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
          :default-context="defaultContext"
          :item-id="itemId(item)">
        <template slot="actionContainer"
             slot-scope="{ getActionPath, itemId, context }">

          <slot name="bodyActionContainer"
                :getActionPath="getActionPath"
                :itemId="itemId"
                :context="context">
            <!-- FALLBACK CONTENT -->

            <!-- Edit btn -->
            <router-link class="block-tableBody--edit"
                         :to="getActionPath(context, 'edit', itemId)">
              <bit-icon icon-type="edit"></bit-icon>
            </router-link>

            <!-- Delete btn -->
            <router-link class="block-tableBody--delete"
                         :to="getActionPath(context, 'delete', itemId)">
              <bit-icon icon-type="delete"></bit-icon>
            </router-link>

            <!-- Details btn -->
            <router-link class="block-tableBody--details"
                         :to="getActionPath(context, 'details', itemId)">
              <bit-icon icon-type="details"></bit-icon>
            </router-link>

          </slot>

        </template>
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
import BitIcon from './bit-icon.vue';
import EventBus from '../global/EventCenter/EventBus';

export default {
  name: 'block-table-body',
  components: {
    BitTableCell,
    BlockActionContainer,
    BitBtn,
    BitIcon,
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
    idKey: {
      type: String,
      default: null,
    },
  },
  methods: {
    itemId(item) {
      if (this.idKey != null) {
        return item[this.idKey].value;
      }

      const id = getItemId(item);

      if (id == null) {
        return `table-item-${Math.random().toString(36).substr(2, 9)}`;
      }

      return getItemId(item).value;
    },
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
