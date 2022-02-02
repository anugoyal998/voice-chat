import axios from 'axios'

// const api = axios.create({
//     baseUrl: 'http://localhost:5500',
//     headers: {
//         'Content-type': 'application/json',
//         Accept: 'application/json'
//     }
// })

const url = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const sendOtp = (data)=> axios.post(`${url}/api/send-otp`,data)
export const verifyOtp = (data)=> axios.post(`${url}/api/verify-otp`,data)

// export default api