import axios from "axios";
import configData from "@/configs/index";

const service = axios.create({
  baseURL: configData.apiPrefix,
  timeout: 10e3,
  withCredentials: true
});

//添加响应拦截器
// service.interceptors.response.use((response) => {
//   let config = response.config,
//     ret = response.data;
//   let apiLockIndex = config.url.replace(config.baseURL, '');
//   console.log(apiLockIndex);
//   if (ret.code === 200) {
//     return ret
//   } else {
//     if (ret.code === 302) {
//       window.location.href = ret.data
//     }
//     return Promise.reject(ret);
//   }
// }, error => Promise.reject(error))

export default service;
