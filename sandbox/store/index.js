import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import products from "./modules/products";
import regions from "./modules/regions";
import people from "./modules/people";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage
});

const store = new Vuex.Store({
  strict: true,
  modules: {
    products: products,
    regions: regions,
    people: people
  },
  plugins: [vuexLocalStorage.plugin]
});

if (module.hot) {
  module.hot.accept(
    ["./modules/products", "./modules/regions", "./modules/people"],
    () => {
      store.hotUpdate({
        modules: {
          products: products,
          regions: regions,
          people: people
        }
      });
    }
  );
}

export default store;
