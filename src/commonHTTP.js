import axios from "axios";

const commonHTTP = axios.create({
  withCredentials: true,
  baseURL: "/api/common",
  headers: {
    "Content-Type": "application/json"
  }
});

export default commonHTTP;
