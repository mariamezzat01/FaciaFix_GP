import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', 
});

Axios.interceptors.response.use(
    response => response,
    error => error.response
)
export default Axios;