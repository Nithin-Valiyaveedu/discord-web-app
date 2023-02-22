import axios from "axios";

const appUrl = "https://concierge.nextp.in/api";

const http = axios.create({
  baseURL: appUrl,
});

export default http;
