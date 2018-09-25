export const increasePrice = context => {
  setTimeout(() => {
    context.commit("increasePrice");
  }, 400);
};

export const reducePrice = context => {
  setTimeout(() => {
    context.commit("reducePrice");
  }, 400);
};
