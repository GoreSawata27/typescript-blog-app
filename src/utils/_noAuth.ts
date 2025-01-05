import axios from "axios";

const _noAuth = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://deploy-backend-h9zt.onrender.com/",
});

export default _noAuth;
