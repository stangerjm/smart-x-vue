export const increasePrice = state => {
  state.products.forEach(product => {
    product.price++;
  });
};

export const reducePrice = state => {
  state.products.forEach(product => {
    product.price -= 1;
  });
};
