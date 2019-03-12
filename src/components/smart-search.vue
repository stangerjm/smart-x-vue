<template>
  <section class="smart-search">

    <header class="smart-search--header" @click="toggle">
      <!-- Search Title -->
      <h2 class="smart-search--title">{{searchTitle}}</h2>

      <!-- Action Slot -->
      <slot name="extra-action"></slot>

      <!-- Search icon -->
      <bit-icon class="smart-search--action"
                icon-type="search"
                key="search"
                v-if="isHidden">
      </bit-icon>

      <!-- Exit icon -->
      <bit-icon class="smart-search--action"
                icon-type="exit"
                key="exit"
                v-else>
      </bit-icon>
    </header>

    <!-- Expandable section that expands and contracts according to the "isHidden" state -->
    <block-expandable-section :is-expanded="!isHidden"
                              :class="{ 'is-hidden': isHidden }">

      <!-- Container that toggles in and out when search button is toggled -->
      <div class="smart-search--toggleContainer">

        <smart-form :on-submit="submit"
                    :form-data="searchModel"
                    :stack-inputs="false"
                    line-up-inputs
                    :submit-btn-text="searchBtnText"
                    :submit-btn-size="searchBtnSize">
        </smart-form>

      </div>

    </block-expandable-section>

  </section>
</template>

<script>
import { getInputType, toTitleCase } from '../global/mixins';
import { smartSearch } from './props';
import BitIcon from './bit-icon.vue';
import BlockExpandableSection from './block-expandableSection.vue';
import SmartForm from './smart-form.vue';

const smartSearchProps = smartSearch || {};

const propsMixin = {
  props: {
    ...smartSearchProps,
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
    BitIcon,
    BlockExpandableSection,
    SmartForm,
  },
  data() {
    return {
      /**
       * Flag indicating that the search is hidden.
       */
      isHidden: !this.isExpanded,
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
      this.isHidden = !this.isHidden;
    },
    /**
     * Calls the passed-in function 'onSubmit' and passes the data
     * from the fields on the form that have been filled out.
     */
    submit(submittedData) {
      this.onSubmit(submittedData);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/search/smart-search';
</style>
