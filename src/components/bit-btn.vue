<template>

  <button type="button" :class="btnClass" v-if="btnStyle === 'expand'" @click="toggle">
    {{ expanded ? '-' : '+' }}
  </button>

  <!-- Render as a button -->
  <button type="button" :class="btnClass" v-bind="$attrs" v-else>
    <!-- @slot Button text -->
    <slot></slot>
  </button>

</template>

<script>
/**
 * A dynamic button that can be used to render various types of buttons.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 * @example ./documentation/bit-btn.md
 */
export default {
  name: 'bit-btn',
  props: {
    /**
     * Indicates the type of button that should be rendered. Options include:
     * `add, exit, expand, reset, search, clear`
     */
    btnStyle: {
      type: String,
    },
    /**
     * Size of the button. Acceptable button sizes: 'small,' 'medium,' and 'large'
     */
    btnSize: {
      type: String,
      default: '',
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClass() {
      /**
       * Class attribute for the button or link
       */
      return `bit-btn ${this.getClass(this.btnStyle)}`;
    },
  },
  data() {
    return {
      /**
       * Possible button types
       */
      buttonTypes: ['add', 'exit', 'expand', 'reset', 'search', 'clear'],
      /**
       * Default class attribute for the button
       */
      defaultClass: 'bit-btn-clickable',
      expanded: this.isExpanded,
    };
  },
  methods: {
    /**
     * Returns the correct class for the string passed into the btnStyle property
     * @param {string} type - button style
     * @returns {string} class for button
     */
    getClass(type) {
      const defaultClass = `${this.defaultClass} ${this.getSize(this.btnSize)}`;

      if (type == null) {
        return defaultClass;
      }

      if (this.buttonTypes.includes(type)) {
        return `bit-btn-${type} ${this.getSize(this.btnSize)}`;
      }

      return defaultClass;
    },
    /**
     * Returns the size corresponding to the size passed in
     * @param {string} size - the size of the button
     * @returns {string}
     */
    getSize(size) {
      if (size == null) {
        return '';
      }

      return `bit-btn-${size}`;
    },
    toggle() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/bit/btn/bit-btn';
</style>
