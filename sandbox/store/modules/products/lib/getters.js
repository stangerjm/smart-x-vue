export const saleProducts = state => {
  return state.products.map(product => {
    return {
      name: `${product.name}`,
      price: product.price / 2
    };
  });
};
