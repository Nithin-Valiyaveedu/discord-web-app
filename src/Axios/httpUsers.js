import axios from "axios";

const appUrl = "http://13.233.151.212/api";

const http = axios.create({
  baseURL: appUrl,
});

export default http;
