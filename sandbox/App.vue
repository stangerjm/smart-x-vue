<template>
  <div id="app">
    <layout-main>

      <template slot="header">

        <smart-nav :nav-items="nav"
                   nav-title="Admin"
                   usr="JMST225">
        </smart-nav>

      </template>

      <template slot="content">

        <smart-form :form-data="formModel"
                    :on-submit="submit">
        </smart-form>

      </template>

      <template slot="footer">

        <smart-footer></smart-footer>

      </template>

    </layout-main>

  </div>
</template>

<script>
import { config } from "../app.config.js";
import ModelTypes from "../src/global/constants/ModelType";

export default {
  name: "app",
  components: {
    SmartNav: () => import("../src/components/smart-nav"),
    SmartFooter: () => import("../src/components/smart-footer"),
    SmartForm: () => import("../src/components/smart-form"),
    LayoutMain: () => import("../src/components/layout-main")
  },
  data() {
    return {
      nav: config.nav,
      formModel: {
        name: String,
        password: ModelTypes.Password,
        age: Number,
        birthday: Date,
        phone: ModelTypes.PhoneNumber
      }
    };
  },
  methods: {
    submit(submittedData) {
      let stuff = Object.entries(submittedData);
      stuff.forEach((data) => {
        console.table(data);
      });
    }
  }
};
</script>

<style lang="scss">
</style>
