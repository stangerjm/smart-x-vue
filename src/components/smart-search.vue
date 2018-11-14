<template>
  <form class="smart-search" v-on:submit.prevent="submit">

    <header class="smart-search--heading">
      <!-- Search Title -->
      <h2 class="smart-search--title">{{formTitle}}</h2>

      <!-- Action Slot -->
      <slot name="extra-action"></slot>

      <!-- Search icon -->
      <bit-icon class="smart-search--action"
                icon-type="search"
                v-show="isHidden"
                @click.native="toggle()">
      </bit-icon>

      <!-- Exit icon -->
      <bit-icon class="smart-search--action"
                icon-type="exit"
                v-show="!isHidden"
                @click.native="toggle()">
      </bit-icon>
    </header>

    <!-- Search fields container -->
    <div :class="['smart-search--fieldContainer', isHidden ? 'is-hidden' : '']">
      <div class="smart-search--toggleContainer">

        <!-- Fields -->
        <bit-input class="smart-search--field"
                   v-for="[modelProp, modelValue] in Object.entries(typedSearchModel)"
                   :key="modelProp"
                   :label-text="modelProp | toTitleCase"
                   :input-type="getInputType(modelValue.typeConstructor)"
                   :name="modelProp"
                   v-model="modelValue.value"
                   line-up>
        </bit-input>

        <!-- Search button -->
        <bit-btn :disabled="isHidden"
                 type="button"
                 btn-style="search"
                 btn-size="medium"
                 @click.native="submit">
          Search
        </bit-btn>

      </div>
    </div>

  </form>
</template>

<script>
import { getDefaultValue } from '../global/mixins/helpers';
import { createViewModel, getInputType, toTitleCase } from '../global/mixins';
import { smartSearch } from './props';
import BitBtn from './bit-btn.vue';
import BitInput from './bit-input.vue';
import BitIcon from './bit-icon.vue';

const getSmartSearchProps = smartSearch || function smartSearchProps() {};
const propsMixin = {
  props: {
    ...getSmartSearchProps(),
  },
};

/**
 * A component that renders a mobile oriented search bar.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-search',
  components: {
    BitBtn,
    BitInput,
    BitIcon,
  },
  data() {
    return {
      /**
       * Flag indicating that the search is hidden.
       */
      isHidden: !this.isExpanded,
      typedSearchModel: this.searchModel
        ? createViewModel(this.searchModel)
        : {},
    };
  },
  mixins: [propsMixin],
  filters: {
    toTitleCase,
  },
  methods: {
    getInputType,
    /**
     * Toggles the search bar visibility.
     */
    toggle() {
      if (this.isHidden) {
        this.isHidden = false;
        this.resize();
      } else {
        this.isHidden = true;
        this.$el.querySelector('.smart-search--fieldContainer').style.minHeight = '0';
      }
    },
    /**
     * Event handler for the resize event. Dynamically set the height of the search container,
     * and change the style of the toggle buttons on smaller screens.
     */
    resize() {
      if (!this.isHidden) {
        const search = this.$el.querySelector('.smart-search--toggleContainer');
        const fieldContainer = this.$el.querySelector('.smart-search--fieldContainer');

        // do not add search height if screen is less than breakpoint
        const searchHeight = search.offsetHeight;

        fieldContainer.style.minHeight = `${searchHeight}px`;
      }
    },
    /**
     * Reducing function that collects only values that have been filled out.
     * @param accumulator
     * @param key
     * @returns {Object}
     */
    reduceToFilledOutValues(accumulator, key) {
      const currentValue = this.typedSearchModel[key];
      // If user fills in a number or date and removes it, the value will be an empty string.
      // Ignore the empty value for these types.
      if (
        (currentValue.typeConstructor === Number ||
          currentValue.typeConstructor === Date) &&
        currentValue.value === ''
      ) {
        return accumulator;
      }
      // If the value is filled out, include the value in the filled out values.
      // Note: A value is considered to be filled out if it is not equal to the
      // default value for the corresponding type.
      // Note: Booleans should always be included.
      if (
        currentValue.value !== getDefaultValue(currentValue.typeConstructor) ||
        currentValue.typeConstructor === Boolean
      ) {
        return {
          ...accumulator,
          [key]: currentValue,
        };
      }
      return accumulator;
    },
    /**
     * Calls the passed-in function 'onSubmit' and passes the data
     * from the fields on the form that have been filled out.
     */
    submit() {
      const filledOutFieldValues = Object.keys(this.typedSearchModel).reduce(
        this.reduceToFilledOutValues,
        {},
      );
      this.onSubmit(filledOutFieldValues);
    },
  },
  /**
   * Sets up an event listener and the above handler for the 'resize' event
   */
  created() {
    window.addEventListener('resize', this.resize);
  },
  /**
   * Resize component when first mounted to ensure full size.
   */
  mounted() {
    if (this.isExpanded) {
      this.resize();
    }
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/search/smart-search';
</style>
