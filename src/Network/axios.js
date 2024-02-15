import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://58a8-102-40-198-253.ngrok-free.app', 
});

Axios.interceptors.response.use(
    response => response,
    error => error.response
)
export default Axios;