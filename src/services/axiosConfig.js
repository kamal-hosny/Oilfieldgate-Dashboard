import axios from "axios";
import Cookies from "js-cookie";


const apiUrl = import.meta.env.VITE_API_URL
const authCookie = JSON.parse(Cookies.get("auth"));


const adminToken = authCookie.token


const BASE_URL = apiUrl;
const axiosConfig = axios.create({
    baseURL: BASE_URL,
    
})

export default adminToken

export { axiosConfig }