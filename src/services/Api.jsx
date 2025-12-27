import axios from "axios";

const api = axios.create({
    baseURL: 'https://churninsight-backend-h12-25b.onrender.com/',
});

export default api;