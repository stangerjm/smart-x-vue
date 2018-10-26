export const updatePeople = (state, people) => {
  state.people = people;
};

export const addPerson = (state, person) => {
  state.people.push(person);
};

export const deletePerson = (state, id) => {
  // eslint-disable-next-line
  const index = state.people.findIndex(person => person._id === id);
  state.people.splice(index, 1);
};

export const editPerson = (state, newPerson) => {
  const index = state.people.findIndex(person => person._id === newPerson._id);
  state.people.splice(index, 1, newPerson);
};
