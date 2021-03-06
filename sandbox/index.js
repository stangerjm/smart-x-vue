import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Store from './store';

Vue.use(Router);

require('../src/styles/sass/base/_base.scss');

console.obj = function logObject(object) { console.log(JSON.parse(JSON.stringify(object))); };

// eslint-disable-next-line
export function initSandbox() {
  new Vue({
    router: new Router({
      routes: [{ path: '*', name: 'Home', component: App }],
    }),
    store: Store,
    render: h => h(App),
    created() {
      // this.$store.dispatch('people/fetchPeopleData');
    },
  }).$mount('#app');
}
