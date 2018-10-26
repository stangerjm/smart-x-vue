import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Store from './store';

Vue.use(Router);

require('../src/styles/sass/base/_base.scss');

// eslint-disable-next-line
export function initSandbox() {
  new Vue({
    router: new Router({
      routes: [{ path: '*', name: 'Home', component: App }],
    }),
    store: Store,
    render: h => h(App),
  }).$mount('#app');
}
