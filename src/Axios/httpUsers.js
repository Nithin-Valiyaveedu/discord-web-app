import axios from "axios";

const appUrl = "http://concierge.nextp.in:8080/api";

const http = axios.create({
  baseURL: appUrl,
});

export default http;
