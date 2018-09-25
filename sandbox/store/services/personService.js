import api from "./api/api";

export default {
  fetchPeople() {
    return api().get("people");
  },
  addPerson(params) {
    return api().post("people", params);
  },
  fetchPerson(id) {
    return api().get("people/" + id);
  },
  deletePerson(id) {
    return api().delete("people/" + id);
  },
  editPerson(params, id) {
    return api().put("people/" + id, params);
  }
};
