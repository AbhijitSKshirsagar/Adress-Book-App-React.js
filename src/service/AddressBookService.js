import axios from "axios";

class AddressBookService {
  baseUrl = "http://localhost:8080/addressbook";

  addPerson(data) {
    return axios.post(`${this.baseUrl}/create`, data);
  }

  getAllContacts() {
    return axios.get(`${this.baseUrl}/get`);
  }

  getPersonById(personId) {
    return axios.get(`${this.baseUrl}/get/${personId}`);
  }

  updatePerson(personId, data) {
    return axios.put(`${this.baseUrl}/update/${personId}`, data);
  }

  deletePerson(personId) {
    return axios.delete(`${this.baseUrl}/${personId}`);
  }
}

export default new AddressBookService();
