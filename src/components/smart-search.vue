<template>
  <form class="smart-search">

    <header class="smart-search--heading">
      <!-- Search Title -->
      <h2 class="smart-search--title">{{formTitle}}</h2>

      <!-- Action -->
      <router-link class="bit-btn bit-btn-add" :to="{ name: routeName }">Add</router-link>

      <!-- Search icon -->
      <bit-icon class="smart-search--action" icon-type="search" v-show="isHidden"
                @click.native="toggle()"></bit-icon>

      <!-- Exit icon -->
      <bit-icon class="smart-search--action" icon-type="exit" v-show="!isHidden"
                @click.native="toggle()"></bit-icon>
    </header>

    <!-- Search fields container -->
    <div :class="['smart-search--fieldContainer', isHidden ? 'is-hidden' : '']">
      <div class="smart-search--toggleContainer">

        <!-- Fields -->
        <bit-input
            class="smart-search--field"
            :disabled="isHidden"
            input-type="text"
            label-text="Find by ID/Name"
            input-name="searchField">
        </bit-input>
        <bit-input
            class="smart-search--field"
            :disabled="isHidden"
            input-type="number"
            label-text="Number of Results Per Page"
            input-name="pageNumber">
        </bit-input>

        <!-- Search button -->
        <bit-btn :disabled="isHidden" type="submit" btn-style="search">Search</bit-btn>

      </div>
    </div>

  </form>
</template>

<script>
import BitBtn from "./bit-btn";
import BitInput from "./bit-input";
import BitIcon from "./bit-icon";
/**
 * A component that renders a mobile oriented search bar.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: "smart-search",
  components: {
    BitBtn,
    BitInput,
    BitIcon
  },
  data() {
    return {
      /**
       * Flag indicating that the search is hidden.
       */
      isHidden: !this.isExpanded
    };
  },
  props: {
    /**
     * Indicates if the search should be expanded
     */
    isExpanded: {
      type: Boolean,
      default: false
    },
    /**
     * Name of the route to navigate to when add button is clicked.
     */
    routeName: {
      type: String,
      required: true
    },
    /**
     * Corresponds to the native HTML form attribute "method"
     */
    method: {
      type: String,
      required: true
    },
    /**
     * The title that will display to the right of the search.
     */
    formTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * Toggles the search bar visibility.
     */
    toggle: function() {
      if (this.isHidden) {
        this.isHidden = false;
        this.resize();
      } else {
        this.isHidden = true;
        this.$el.querySelector(
          ".smart-search--fieldContainer"
        ).style.minHeight = 0;
      }
    },
    /**
     * Event handler for the resize event. Dynamically set the height of the search container, and change
     * the style of the toggle buttons on smaller screens.
     */
    resize: function() {
      if (!this.isHidden) {
        let search = this.$el.querySelector(".smart-search--toggleContainer");
        let fieldContainer = this.$el.querySelector(
          ".smart-search--fieldContainer"
        );

        //do not add search height if screen is less than breakpoint
        let searchHeight = search.offsetHeight;

        fieldContainer.style.minHeight = `${searchHeight}px`;
      }
    }
  },
  /**
   * Sets up an event listener and the above handler for the "resize" event
   */
  created: function() {
    window.addEventListener("resize", this.resize);
  },
  /**
   * Resize component when first mounted to ensure full size.
   */
  mounted: function() {
    if (this.isExpanded) {
      this.resize();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/sass/global/mixins";
@import "../styles/sass/global/variables";
@import "../styles/sass/components/smart/search/smart-search";
@import "../styles/sass/components/bit/btn/bit-btn";
</style>
