import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // update if needed
  withCredentials: true, // required to send cookies
});

export default api;
