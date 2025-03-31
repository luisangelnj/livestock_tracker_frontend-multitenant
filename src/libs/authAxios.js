import axios from "axios";

const authAxios = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: import.meta.env.VITE_AUTH_BACKEND_URL ?? "http://192.168.1.69:8000"
})

export default authAxios;