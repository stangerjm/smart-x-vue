<template>
  <!-- Render as link -->
  <a v-if="isLink" :class="iconClass" v-bind="$attrs"></a>

  <!-- Render as text -->
  <span v-else :class="iconClass" v-bind="$attrs"></span>
</template>

<script>
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
     * `user, sort`
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
      iconClass: this.getClass(this.iconType)
    };
  },
  methods: {
    /**
     * Returns the correct class for the string passed into the iconType property
     * @param {string} type - icon style
     */
    getClass: function(type) {
      let allowedTypes = [
        "user",
        "sort",
        "delete",
        "details",
        "edit",
        "search",
        "exit"
      ];
      if (!type) {
        return "bit-icon-error";
      } else if (allowedTypes.includes(type)) {
        return "bit-icon-" + type;
      } else {
        return "bit-icon-error";
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "../styles/sass/global/variables";
@import "../styles/sass/global/mixins";
@import "../styles/sass/components/bit/icon/bit-icon";
</style>
