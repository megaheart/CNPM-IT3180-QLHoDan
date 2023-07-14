import axios from 'axios';
// import queryString from 'query-string';
import { SERVER_URL } from '~/AppConstant';

const axiosClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
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
    if (error.response.data.description) alert(error.response.data.description)
    else if (error.response.data.message) alert(error.response.data.message)
    else if (error.response.data.title) alert(error.response.data.title)
    else if (error.response.data.error) alert(error.response.data.error)
    else if (error.response.data) alert(error.response.data)
    else alert(error.response)
    throw error;
});

export default axiosClient;