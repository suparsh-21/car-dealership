import axios from 'axios'

// create axios instance with base URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

// before every request, attach the token from localStorage if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export default API