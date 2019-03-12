<template>
  <section class="block-messages">
    <bit-message class="block-messages--message"
                 :class="{ 'block-messages--alignedMessage': alignLeft }"
                 v-if="hasMessages"
                 v-for="message in messages"
                 :key="message"
                 :message-text="message"
                 :message-type="messageType">
    </bit-message>
  </section>
</template>

<script>
import BitMessage from './bit-message.vue';

export default {
  name: 'block-messages',
  props: {
    messages: {
      type: Array,
      required: true,
    },
    messageType: {
      type: String,
      default: 'warning',
    },
    alignLeft: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BitMessage,
  },
  computed: {
    hasMessages() {
      return this.messages.length > 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/block/messages/block-messages";
</style>
