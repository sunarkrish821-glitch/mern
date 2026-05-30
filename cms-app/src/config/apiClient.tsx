import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 90000,
  timeoutErrorMessage: "Server timedout...",
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json"
});

// TODO: interceptors (2 types of API)
// public or private 
// UI ----> Axios ----> Interceptor(request)[Optional] ----> Internet ----> Server(API Server)
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("_at_62")
  if(token) {
    config.headers.Authorization = "Bearer "+token
  }
  return config;
})


// API Server ----> Internet ----> Axios ----> Interceptor(response)[optional] ----> Component(UI)
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data
  }, 
  (exception) => {
    // TODO: refresh token implementation
    throw exception?.response || {message: "Server Error"}
  }
)

export default axiosInstance;