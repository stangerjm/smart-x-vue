<template>
  <p :class="messageClass">{{messageText}}</p>
</template>

<script>
import { getClass } from '../global/mixins/helpers';

/**
 * A generic message that can be rendered as notification, warning, or error messages
 * @author James Stanger, Washington State Patrol
 * @example ./documentation/bit-message.md
 * @version 1.0
 */
export default {
  name: 'bit-message',
  props: {
    /**
     * Type of message the component should render as.
     * Allowed types include 'success', 'notice', 'error', and 'warning'
     */
    messageType: {
      type: String,
      required: true,
    },
    /**
     * Text the message should render.
     */
    messageText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      /**
       * Calculates the class by using the 'getClass' mixin.
       */
      messageClass: getClass('bit-message', this.messageType, ['notice', 'error', 'warning', 'success']),
    };
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/message/bit-message';
</style>
