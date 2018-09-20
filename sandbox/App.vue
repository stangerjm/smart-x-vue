<template>
  <div id="app">
    <smart-table default-context="test" :table-data="tableData"></smart-table>
  </div>
</template>

<script>
import SmartTable from "../src/components/smart-table";
import BitBtn from "../src/components/bit-btn";

export default {
  name: "app",
  components: {
    BitBtn,
    SmartTable
  },
  data() {
    return {
      tableData: [
        { id: 1, name: "James", age: 25, child: { name: "James" } },
        { id: 2, name: "Joel", age: 23, child: { name: "Lilly" } }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
