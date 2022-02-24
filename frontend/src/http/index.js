import axios from "axios";

const api = axios.create({
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

const url = process.env.REACT_APP_API_URL || "http://localhost:5000";

const at = localStorage.getItem('at')
const rt = localStorage.getItem('rt')

export const saveUser = (data) => api.post(`${url}/api/saveUser`, data);
export const refreshToken = ()=> rt && api.post(`${url}/api/refresh`,{at,rt})
export const logout = () => at && rt && api.post(`${url}/api/logout`,{at,rt});
export const createRoom = (data) => at && rt && api.post(`${url}/api/createRoom`, {...data, at, rt});
export const getAllRooms = () => at && rt && api.post(`${url}/api/getAllRooms`,{at,rt});
export const getRoom = (data) => api.post(`${url}/api/getRoom`,{...data, at, rt});

export default api;
