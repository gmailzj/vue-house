import axios from "axios";
import configData from "@/configs/index";

const service = axios.create({
  baseURL: configData.apiPrefix,
  timeout: 10e3,
  withCredentials: true
});

export default service;
