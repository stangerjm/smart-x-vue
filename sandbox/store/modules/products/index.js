import * as getters from "./lib/getters";
import * as actions from "./lib/actions";
import * as mutations from "./lib/mutations";

const products = {
  state: {
    products: [
      {
        name: "Banana",
        price: 2
      },
      {
        name: "Pear",
        price: 3
      },
      {
        name: "Green Pepper",
        price: 2
      },
      {
        name: "Red Pepper",
        price: 1
      }
    ]
  },
  getters,
  actions,
  mutations
};

export default products;
