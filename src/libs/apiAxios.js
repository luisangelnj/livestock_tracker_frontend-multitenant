import axios from "axios";

const apiAxios = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: import.meta.env.VITE_BACKEND_API_URL ?? "http://192.168.1.71:8000/api/v1"
})

export default apiAxios;