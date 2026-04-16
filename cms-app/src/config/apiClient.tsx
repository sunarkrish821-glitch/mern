import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 90000,
    timeoutErrorMessage: "Request timed out. Please try again.",
    headers: {
        "Content-Type": "application/json",
    },
    responseType: "json",
});

    axiosInstance.interceptors.request.use((request) => {
    const token = Cookies.get("_at_62")
    if(token) {
        request.headers.Authorization = "Bearer " + token
    }
    return request;
})
        axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (exception) => {
        // TODO: refresh token implementation
       throw exception.response || {message: "An error occurred. Please try again."};
    }
);
export default axiosInstance


// TODO: interceptors (2 types of API)
// public API (login, register) and private API (dashboard, profile, etc)

// response data

// UI ---------> Axios ------> Interceptors(request)[Optional] ----------->Internet -------------> Server(API Server)
// axiosInstance.interceptors.request.use(() => {
//     const token = Cookies.get("_at_62")
//     if(token) {
//         config.headers.Authorization = "Bearer" + token
//     }
//     return config;
// })




// API Server ---------> Internet ----------> Axios ------------->Interceptors(response)[Optional] ---------> Components(UI)

