<template>
  <div class="block-actionContainer">

    <!-- Scoped slot that exposes "itemId" and "getActionPath" -->
    <slot name="actionContainer" :getActionPath="getActionPath" :itemId="itemId" :context="defaultContext">
      <!-- FALLBACK CONTENT -->

      <!-- Edit btn -->
      <router-link class="block-actionContainer--edit"
                   :to="getActionPath(defaultContext, 'edit', itemId)">
        <bit-icon icon-type="edit"></bit-icon>
      </router-link>

      <!-- Delete btn -->
      <router-link class="block-actionContainer--delete"
                   :to="getActionPath(defaultContext, 'delete', itemId)">
        <bit-icon icon-type="delete"></bit-icon>
      </router-link>

      <!-- Details btn -->
      <router-link class="block-actionContainer--details"
                   :to="getActionPath(defaultContext, 'details', itemId)">
        <bit-icon icon-type="details"></bit-icon>
      </router-link>

    </slot>

  </div>
</template>

<script>
import BitIcon from './bit-icon.vue';

/**
 * A component that renders an action container to be part of a table or other similar structure.
 * Contains action links that handle details, edit, and delete actions.
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/block-actionContainer.md
 * @version 1.0
 */
export default {
  name: 'block-action-container',
  components: {
    BitIcon,
  },
  props: {
    /**
     * Id of the corresponding item.
     */
    itemId: {
      required: true,
    },
    defaultContext: {
      type: String,
      default: '#',
    },
  },
  methods: {
    /**
     * Builds a path out of the context, action, and id parameters
     * @param context
     * @param action
     * @param id
     * @returns {string}
     */
    getActionPath(context, action, id) {
      return `/${context}/${action}/${id}`;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/block/actionContainer/block-actionContainer';
</style>
