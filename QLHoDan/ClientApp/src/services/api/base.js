import axios from 'axios';
import { API_BASEMENT_MODULE } from '~/AppConstant';
import config from './configHeader';

class BasementModule {
    // async getAllImage(token) {
    //     const response = await axios.get(
    //         API_BASEMENT_MODULE,
    //         config(token)
    //     );
    //     if (response && response.data) {
    //         return response.data;
    //     }
    //     else {
    //         return [];
    //     }
    // }

    getImageById(id) {
        return `https://localhost:7265/static/img/${id}`;
    }

}
const basementModule = new BasementModule();
export default basementModule

// module quan ly tai khoan
