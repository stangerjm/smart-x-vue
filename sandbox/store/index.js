import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import regions from './modules/regions';
import people from './modules/people';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

const store = new Vuex.Store({
  strict: true,
  modules: {
    regions,
    people,
  },
  plugins: [vuexLocalStorage.plugin],
});

if (module.hot) {
  module.hot.accept(
    ['./modules/regions', './modules/people'],
    () => {
      store.hotUpdate({
        modules: {
          regions,
          people,
        },
      });
    },
  );
}

export default store;
