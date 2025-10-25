import axios from "axios";
import { LONG_LIVE_TOKEN } from "../constants/constants";
import { deleteCookie, getCookie } from "../utils/cookie-helper";

let token = getCookie(LONG_LIVE_TOKEN);

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    
})

authAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getCookie(LONG_LIVE_TOKEN);
    console.log(token)
    if(token){
        config.headers.Authorization = `${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    switch(error.response.status){
      case 498:
        deleteCookie(LONG_LIVE_TOKEN);
        window.location.href = "/login";
        break;
      
      case 499:
        window.location.href="/payment";
        break;
      
        default:
          return Promise.reject(error)
    }
  });

  export default authAxios;