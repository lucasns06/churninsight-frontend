import axios from "axios";

const api = axios.create({
    // baseURL: 'https://churninsight-backend-h12-25b.onrender.com',
    baseURL: 'http://localhost:8080/',
    // headers: {
    //     "X-API-KEY": import.meta.env.VITE_API_KEY
    // }
});

export default api;