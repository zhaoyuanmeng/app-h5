import axios from "axios";

// console.log("--------", import.meta.env.MODE);
// console.log("--------1", import.meta.env.VITE_APP_API);

const useHttp = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  // 超时时间
  timeout: 20000,
});

useHttp.defaults.withCredentials = true;

// request 事先统一处理
// useHttp.interceptors.request.use(config => {
//   const token = Vue.ls.get('ACCESS_TOKEN')
//   if (token) {
//     config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }
//   return config
// })

// 拦截response 事先统一处理
useHttp.interceptors.response.use(
  function (response) {
    if (Number(response.data.code) === 0) {
      return response.data;
    } else {
      return Promise.reject({
        err: response.data,
        msg: response.data.msg,
      });
    }
  },
  function (error) {
    // Do something with response error
    return Promise.reject({
      err: error.data,
      msg: error.data.msg,
    });
  }
);

export default useHttp;
