import axios from 'axios';
// import queryString from 'query-string';
import { API_ACCOUNT_URL } from '~/AppConstant'
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};
const axiosClient = axios.create({
    baseURL: API_ACCOUNT_URL,
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
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;

export { axiosConfig }