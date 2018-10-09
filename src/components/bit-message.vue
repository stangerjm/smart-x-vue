<template>
  <p :class="messageClass">{{messageText}}</p>
</template>

<script>
import { getClass } from "../global/mixins/helpers";

export default {
  name: "bit-message",
  props: {
    /**
     * Type of message the component should render as.
     */
    messageType: {
      type: String,
      required: true
    },
    /**
     * Text the message should render.
     */
    messageText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      /**
       * Calculates the class by using the "getClass" mixin.
       */
      messageClass: getClass("bit-message", this.messageType, ["empty"])
    };
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/bit/message/bit-message";
</style>
