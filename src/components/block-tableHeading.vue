<template>
  <thead>
      <tr class="smart-table--row smart-table--head">

        <!-- Render each heading -->
        <th class="smart-table--heading"
            v-for="heading in tableHeadings"
            :key="heading">

          <!-- Render the heading as a sort button if heading is not flagged to be unsearchable -->
          <template v-if="!unsearchableHeadings.includes(heading)">
            <a class="smart-table--link"
               :class="[ `smart-table--sortBy${capitalize(heading)}` ]"
               @click="sortMethod(heading)"
               :title="`Sort by ${heading}`">
              {{ heading | toTitleCase }}
              <bit-icon icon-type="sort"></bit-icon>
            </a>
          </template>

          <!-- Otherwise, simply render the heading as text -->
          <template v-else>
            {{ heading | toTitleCase }}
          </template>

        </th>

        <!-- Include the Actions heading if "includeActionContainer" flag is set -->
        <th class="smart-table--heading" v-if="includeActionContainer">Actions</th>

      </tr>
  </thead>
</template>

<script>
import { toTitleCase } from '../global/mixins';
import { capitalize } from '../global/mixins/helpers';
import BitIcon from './bit-icon.vue';

export default {
  name: 'block-table-heading',
  components: {
    BitIcon,
  },
  props: {
    /**
     * List of headings to be rendered
     */
    tableHeadings: {
      type: Array,
      required: true,
    },
    /**
     * List of headings that should not trigger a search
     */
    unsearchableHeadings: {
      type: Array,
      default: () => [],
    },
    /**
     * Method that should be called as a result of clicking a sortable heading
     */
    sortMethod: {
      type: Function,
      required: true,
    },
    /**
     * Flag to optionally include the action container
     */
    includeActionContainer: {
      type: Boolean,
      default: true,
    },
  },
  filters: {
    toTitleCase,
  },
  methods: {
    capitalize,
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/table/smart-table';
</style>
