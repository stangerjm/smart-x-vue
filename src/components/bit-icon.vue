<template>
  <!-- Render as link -->
  <a v-if="isLink" :class="iconClass" v-bind="$attrs"></a>

  <!-- Render as text -->
  <span v-else :class="iconClass" v-bind="$attrs"></span>
</template>

<script>
import { getClass } from "../global/mixins/helpers";

/**
 * A component that can render different types of icons.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "bit-icon",
  props: {
    /**
     * Icon type options include:
     * `user, sort, delete, details, edit, search, exit, next, previous`
     */
    iconType: {
      type: String,
      required: true
    },
    /**
     * Flag indicating that the element rendered should be a link
     */
    isLink: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      /**
       * The class attribute for the icon
       */
      iconClass: getClass("bit-icon", this.iconType, [
        "user",
        "sort",
        "delete",
        "details",
        "edit",
        "search",
        "exit"
      ])
    };
  }
};
</script>
<style scoped lang="scss">
@import "../styles/sass/components/bit/icon/bit-icon";
</style>
