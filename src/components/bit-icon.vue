<template>
  <!-- Render as text -->
  <span :class="iconClass" v-bind="$attrs"></span>
</template>

<script>
import { getClass } from '../global/mixins/helpers';

/**
 * A component that can render different types of icons.
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-icon.md
 * @version 1.0
 */
export default {
  name: 'bit-icon',
  props: {
    /**
     * Icon type options include:
     * `user, sort, delete, details, edit, search, exit`
     */
    iconType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      /**
       * The class attribute for the icon
       */
      iconClass: getClass('bit-icon', this.iconType, [
        'user',
        'sort',
        'delete',
        'details',
        'edit',
        'search',
        'exit',
      ]),
    };
  },
};
</script>
<style scoped lang='scss'>
@import '../styles/sass/components/bit/icon/bit-icon';
</style>
