import axios from "axios";

const baseURL = "/api/persons";

const create = (newEntry) => {
  return axios.post(baseURL, newEntry).then((response) => response.data);
};

const read = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const update = (id, payload) => {
  return axios
    .put(`${baseURL}/${id}`, payload)
    .then((response) => response.data);
};

const del = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((response) => response.data);
};

export default { create, read, update, del };
