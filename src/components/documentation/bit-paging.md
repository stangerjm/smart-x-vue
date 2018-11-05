Examples:

*Note: the &lt;template&gt; and &lt;script&gt; tags are for demonstration purposes and only to provide
a valid v-model for the example.

For a full example, see <a href="#stacksearchabletable">stack-searchable-table</a>
```vue
<template>
  <bit-paging v-model="number" :paged-data-length="5"></bit-paging>
</template>
<script>
export default {
  data() {
    return {
      number: 0
    }
  }
}
</script>
```