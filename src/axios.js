import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1234/v1",
  // baseURL: "http://erp.frc.mn:1234/v1",
});

export default instance;
