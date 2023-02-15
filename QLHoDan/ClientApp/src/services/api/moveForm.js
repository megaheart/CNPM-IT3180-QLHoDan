// form xin chuyen di

import axios from 'axios';
import { API_MOVEMENT_FORM } from '~/AppConstant'; // API_MOVEMENT_FORM = /api/forms/MovingOut
import config from './configHeader';


class FormMovement {


    async getAllFormMovement(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_MOVEMENT_FORM, // đường dẫn api, có thể có các query param
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

    async getAllCheckFormMovement(token, isChecked) {
        const response = await axios.get(
            `${API_MOVEMENT_FORM}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormMovementById(token, id) {
        const response = await axios.get(
            `${API_MOVEMENT_FORM}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormMovement(token, data) {
        const response = await axios.post(
            API_MOVEMENT_FORM,
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

    async acceptFormMovement(token, id, data) {

        const response = await axios.post(
            `${API_MOVEMENT_FORM}/accept/${id}`,
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

    async undoFormMovement(token, id) {
        const response = await axios.delete(
            `${API_MOVEMENT_FORM}/${id}`,
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

const formMovement = new FormMovement();
export default formMovement;