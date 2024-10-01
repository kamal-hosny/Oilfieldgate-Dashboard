import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL


const BASE_URL = apiUrl;
const axiosConfig = axios.create({
    baseURL: BASE_URL,
    
})

export { axiosConfig }