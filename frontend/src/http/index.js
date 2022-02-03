import axios from "axios";

const api = axios.create({
  // baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

const url = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export const sendOtp = (data)=> axios.post(`${url}/api/send-otp`,data,{withCredentials: true})
// export const verifyOtp = (data)=> axios.post(`${url}/api/verify-otp`,data,{withCredentials: true})
// export const activate = (data)=> axios.post(`${url}/api/activate`,data,{withCredentials: true})

export const sendOtp = (data) => api.post(`${url}/api/send-otp`, data);
export const verifyOtp = (data) => api.post(`${url}/api/verify-otp`, data);
export const activate = (data) => api.post(`${url}/api/activate`, data);
export const logout = () => api.post(`${url}/api/logout`)

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
      const originalRequest = error.config
      if(error.response.status === 400 && originalRequest && !originalRequest._isRetry){
          originalRequest._isRetry = true
          try {
              const response = await axios.get(`${url}/api/refresh`,{withCredentials: true})
              return api.request(originalRequest)
          } catch (error) {
              console.log(error)
          }
      }
      throw error
  }
);

export default api;
