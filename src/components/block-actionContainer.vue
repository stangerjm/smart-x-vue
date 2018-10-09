<template>
  <div class="block-actionContainer">

    <!-- Render the details button if flagged to show -->
    <template v-if="detailsBtn">
      <router-link class="bit-icon-details" :to="getActionPath(detailsContext, 'Details', itemId)"></router-link>
    </template>

    <!-- Render the edit button if flagged to show -->
    <template v-if="editBtn">
      <router-link class="bit-icon-edit" :to="getActionPath(editContext, 'Edit', itemId)"></router-link>
    </template>

    <!-- Render the delete button if flagged to show -->
    <template v-if="deleteBtn">
      <router-link class="bit-icon-delete" :to="getActionPath(deleteContext, 'Delete', itemId)"></router-link>
    </template>

  </div>
</template>

<script>
/**
 * A component that renders an action container to be part of a table or other such structure.
 * The action container should be linked to a record or item in a table-like structure.
 * Contains action links that handle details, edit, and delete actions.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "block-action-container",
  props: {
    /**
     * Default context for action links. If an action link context is omitted in the data object, this will be used.
     */
    defaultCtx: {
      type: String,
      required: true
    },
    /**
     * Id of the corresponding item.
     */
    itemId: {
      required: true
    },
    /**
     * Flag to optionally omit the details button.
     */
    detailsBtn: {
      type: Boolean,
      default: true
    },
    /**
     * Flag to optionally omit the edit button.
     */
    editBtn: {
      type: Boolean,
      default: true
    },
    /**
     * Flag to optionally omit the delete button.
     */
    deleteBtn: {
      type: Boolean,
      default: true
    },
    /**
     * Context for the edit button.
     */
    editCtx: {
      type: String
    },
    /**
     * Context for the details button.
     */
    detailsCtx: {
      type: String
    },
    /**
     * Context for the delete button.
     */
    deleteCtx: {
      type: String
    }
  },
  data() {
    return {
      /**
       * The context for the edit button. Will either be the value passed into the "editCtx" prop, or the
       * value passed into the required "defaultCtx" prop if the former is undefined.
       */
      editContext: this.editCtx ? this.editCtx : this.defaultCtx,
      /**
       * The context for the delete button. Will either be the value passed into the "deleteCtx" prop, or the
       * value passed into the required "defaultCtx" prop if the former is undefined.
       */
      deleteContext: this.deleteCtx ? this.deleteCtx : this.defaultCtx,
      /**
       * The context for the details button. Will either be the value passed into the "detailsCtx" prop, or the
       * value passed into the required "defaultCtx" prop if the former is undefined.
       */
      detailsContext: this.detailsCtx ? this.detailsCtx : this.defaultCtx
    };
  },
  methods: {
    /**
     * Builds a path out of the context, action, and id parameters
     * @param context
     * @param action
     * @param id
     * @returns {string}
     */
    getActionPath: function(context, action, id) {
      return `/${context}/${action}/${id}`;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/block/actionContainer/block-actionContainer";
@import "../styles/sass/components/bit/icon/bit-icon";
</style>
