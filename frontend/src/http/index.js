import axios from 'axios'

const api = axios.create({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
})

const url = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const sendOtp = (data)=> axios.post(`${url}/api/send-otp`,data,{withCredentials: true})
export const verifyOtp = (data)=> axios.post(`${url}/api/verify-otp`,data,{withCredentials: true})
export const activate = (data)=> axios.post(`${url}/api/activate`,data,{withCredentials: true})

// export const sendOtp = (data)=> api.post(`/api/send-otp`,data)
// export const verifyOtp = (data)=> api.post(`/api/verify-otp`,data)

export default api