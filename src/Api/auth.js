import http from "../Axios/httpUsers";

const userSetup = (payload) => http.post(`/users`, payload);
const userCreate = (payload) => http.post(`/users/addUser`, payload);

const setupApi = {
  userSetup,
  userCreate,
};

export default setupApi;
