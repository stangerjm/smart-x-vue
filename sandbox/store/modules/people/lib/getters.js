import { getSortedData } from "../../../shared/getDataSortedBy";

export const getPeople = state => {
  return state.people;
};

export const getPersonSingle = state => id => {
  return state.people.find(person => person._id === id);
};

export const getDataSortedBy = state => (sortKey, descending) => {
  return getSortedData(state.people, sortKey, descending);
};
