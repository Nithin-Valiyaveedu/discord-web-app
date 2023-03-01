import http from "../Axios/httpUsers";

const userSetup = (payload) => http.post(`/users`, payload);
const userCreate = (payload) => http.post(`/users/addUser`, payload);
const checkUser = (id) => http.get(`/users/${id}`);

const setupApi = {
  userSetup,
  userCreate,
  checkUser,
};

export default setupApi;
