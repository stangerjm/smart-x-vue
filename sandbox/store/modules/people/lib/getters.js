import { getSortedData } from '../../../../../src/global/mixins';

export const getPeople = state => state.people;

export const getPersonSingle = state => id => state.people.find(person => person._id === id);

export const getDataSortedBy = state =>
  (sortKey, descending) => getSortedData(state.people, sortKey, descending);
