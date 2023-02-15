// form xin thay doi thong tin nhan khau
import axios from 'axios';
import { API_RESIDENT_CHANGE } from '~/AppConstant'; // API_RESIDENT_CHANGE = /api/forms/ChangingResidentInfo
import config from './configHeader';


class FormResidentChange {


    async getAllFormResidentChange(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_RESIDENT_CHANGE, // đường dẫn api, có thể có các query param
            //  data,      request body nếu có
            config(token)
        );


        // hàm nào cũng có phần này
        if (response && response.data) {
            return response.data;
        }
        else {
            return [];  // trả về nếu request lỗi, có thể là null hay bất cứ cái j
        }
    }

    async getAllCheckFormResidentChange(token, isChecked) {
        const response = await axios.get(
            `${API_RESIDENT_CHANGE}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormResidentChangeById(token, id) {
        const response = await axios.get(
            `${API_RESIDENT_CHANGE}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormResidentChange(token, data) {
        const response = await axios.post(
            API_RESIDENT_CHANGE,
            data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        )

        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async acceptFormResidentChange(token, id, data) {

        const response = await axios.post(
            `${API_RESIDENT_CHANGE}/accept/${id}`,
            data,
            config(token)
        )

        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async undoFormResidentChange(token, id) {
        const response = await axios.delete(
            `${API_RESIDENT_CHANGE}/${id}`,
            config(token)
        )

        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }
}

const formResidentChange = new FormResidentChange();
export default formResidentChange;