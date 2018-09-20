<template>
  <div id="app">
    <smart-table default-context="test" :table-data="[{ name: 'James', age: 25 },{ name: 'Jenna', age: 23 }]"></smart-table>
  </div>
</template>

<script>
import SmartTable from "./components/smart-table";
import BitBtn from "./components/bit-btn";

export default {
  name: "app",
  components: {
    BitBtn,
    SmartTable
  }
};
</script>

<style lang="scss">
</style>
