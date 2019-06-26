<template>

  <section class="block-messages" v-if="hasMessages">

    <!-- Render a bit-message component for each message -->
    <bit-message class="block-messages--message"
                 :class="{ 'block-messages--alignedMessage': alignLeft }"
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
    /**
     * Messages to display
     */
    messages: {
      type: Array,
      required: true,
    },
    /**
     * Type the message should display as
     * @see {component} bit-message
     */
    messageType: {
      type: String,
      default: 'warning',
    },
    /**
     * Seconds to wait before clearing messages
     */
    messageTimeout: {
      type: Number,
      default: null,
    },
    /**
     * Flag indicating that the messages should be aligned to the left
     */
    alignLeft: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BitMessage,
  },
  watch: {
    /**
     * Start the timeout when the messages are updated
     */
    messages() {
      this.startTimeout();
    },
  },
  data() {
    return {
      /**
       * Flag indicating if messages should be shown
       */
      showMessages: true,
      /**
       * Id of the current timeout if one exists
       */
      timeoutId: null,
    };
  },
  computed: {
    /**
     * Determines if there are messages to show
     */
    hasMessages() {
      return this.visibleMessages.length > 0;
    },
    /**
     * Determines if the component should display messages or not
     */
    visibleMessages() {
      return this.showMessages
        ? this.messages
        : [];
    },
  },
  methods: {
    /**
     * Starts a timeout and clears a previous timeout if one exists
     */
    startTimeout() {
      // Do not start any timeouts if no timeout length is specified
      if (this.messageTimeout == null) {
        return;
      }

      // Indicate it is ok to show messages
      this.showMessages = true;

      // If there is an existing timeout, clear it
      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId);
      }

      // Set a timeout set to the specified length to stop showing the messages
      this.timeoutId = setTimeout(() => {
        this.showMessages = false;
      }, this.messageTimeout * 1000);
    },
  },
  created() {
    // Start the timeout when the comopnent is created
    this.startTimeout();
  },
};
</script>

<style scoped lang="scss">
@import "../styles/sass/components/block/messages/block-messages";
</style>
