import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://5942-197-39-188-39.ngrok-free.app/', 
});

Axios.interceptors.response.use(
    response => response,
    error => error.response
)
export default Axios;