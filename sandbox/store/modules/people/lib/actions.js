import personService from '../../../services/personService';

export const fetchPeopleData = async (context) => {
  function delay(time, value) {
    return new Promise((resolve) => {
      setTimeout(resolve.bind(null, value), time);
    });
  }

  const response = await personService.fetchPeople();

  await delay(1000);

  const { data: { people } } = response;
  context.commit('updatePeople', people);
};

export const addPerson = async (context, person) => {
  const response = await personService.addPerson(person);
  const { data: newPerson } = response;
  context.commit('addPerson', newPerson);
};

export const deletePerson = async (context, payload) => {
  await personService.deletePerson(payload.id);
  context.commit('deletePerson', payload.id);
};

export const editPerson = async (context, payload) => {
  const response = await personService.editPerson(payload.person, payload.id);
  context.commit('editPerson', response.data);
};

export const fetchPerson = async (context, id) => {
  const response = await personService.fetchPerson(id);
  return response.data;
};
