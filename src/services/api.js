import axios from "axios";
import { getAccessToken, clearAccessToken } from "./tokenStore";
import { toast } from "react-toastify";
import ErrorLoggerService from "./ErrorLoggerService";
// import { logout } from "./auth.service";
// import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
let setGlobalLoading;
export function setLoaderSetter(setter) {
  setGlobalLoading = setter;
}
function showMessage(message){
  toast.error(message);
}
function handleApiError(error){
  const status = error.response?.status
  
  switch(status){
    case 401:
      showMessage("Session expired")
     break

     case 404:
     showMessage("Resource not found")
     break
     
     case 500:
       showMessage("Server error")
 }
}
let requestQueue = [];
let requestsInWindow = 0;
const MAX_REQUESTS = 3;
const WINDOW_TIME = 10000;

function processQueue() {
  while (requestsInWindow < MAX_REQUESTS && requestQueue.length > 0) {
    const { resolve } = requestQueue.shift();
    requestsInWindow++;
    resolve();
  }
}

setInterval(() => {
  requestsInWindow = 0;
  processQueue();
}, WINDOW_TIME);


// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (setGlobalLoading) setGlobalLoading(true);
    const token = getAccessToken();
    console.log(token)
    // if (!token) {
    //     window.location.href = "/";
    // }
    if (token) config.headers.Authorization = `Bearer ${token}`;
    
    return new Promise((resolve) => {
      requestQueue.push({
        resolve: () => resolve(config),
      });
  
      processQueue();
    });
  },
  (error) => {
    if (setGlobalLoading) setGlobalLoading(false);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (res) => {
    
  console.log(res);
    if (setGlobalLoading) setGlobalLoading(false);
    return res;
  },
  (error) => {
    // const navigate=useNavigate()
    if (setGlobalLoading) setGlobalLoading(false);
    handleApiError(error);
        ErrorLoggerService.log(error, "API Response Error");

    if (error.response?.status === 404) {
      clearAccessToken();
      // window.location.href = "/login";
      // navigate("/Login");
      console.log("154");
      return Promise.reject(error);
    }
      // window.location.href = "/login";
    return Promise.reject(error);
  },
);

export default api;
