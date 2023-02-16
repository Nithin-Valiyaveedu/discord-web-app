import http from "../Axios/httpUsers";

const userSetup = (payload) => http.post(`/users`, payload);

const setupApi = {
  userSetup,
};

export default setupApi;
