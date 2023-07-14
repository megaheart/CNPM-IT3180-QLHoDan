import axios from 'axios';
// import queryString from 'query-string';
import { SERVER_URL } from '~/AppConstant'
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
};
const axiosClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
    },
    // paramsSerializer: params => queryString.stringify(params),
},
)

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
}, (error) => {
    // Handle errors
    if (error.response.data) alert(error.response.data)
    throw error;
});

export default axiosClient;

export { axiosConfig }