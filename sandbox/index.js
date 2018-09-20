import Vue from "vue";
import App from "./App";
import Router from "vue-router";

Vue.use(Router);

require("../src/styles/sass/base/_base.scss");

export function initSandbox() {
  new Vue({
    router: new Router({
      routes: [{ path: "*", name: "Home", component: App }]
    }),
    render: h => h(App)
  }).$mount("#app");
}
