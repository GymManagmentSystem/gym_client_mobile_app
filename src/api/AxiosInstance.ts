import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://192.168.43.137:8080/api/v1",
    timeout:12000,
    timeoutErrorMessage:"Connection Time Out"  
})

export default axiosInstance;