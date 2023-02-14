








// form xin thay doi ho khau
import axios from 'axios';
import { API_HOUSEHOLD_CHANGE } from '~/AppConstant'; // API_HOUSEHOLD_CHANGE = /api/forms/ChangingHouseholdInfo
import config from './configHeader';


class formHouseholdChange {


    async getAllFormHouseholdChange(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_HOUSEHOLD_CHANGE, // đường dẫn api, có thể có các query param
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

    async getAllCheckFormHouseholdChange(token, isChecked) {
        const response = await axios.get(
            `${API_HOUSEHOLD_CHANGE}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormHouseholdChangeById(token, id) {
        const response = await axios.get(
            `${API_HOUSEHOLD_CHANGE}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormHouseholdChange(token, data) {
        const response = await axios.post(
            API_HOUSEHOLD_CHANGE,
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

    async acceptFormHouseholdChange(token, id, data) {

        const response = await axios.post(
            `${API_HOUSEHOLD_CHANGE}/accept/${id}`,
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

    async undoFormHouseholdChange(token, id) {
        const response = await axios.delete(
            `${API_HOUSEHOLD_CHANGE}/${id}`,
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




// form chuyen ho khau
import axios from 'axios';
import { API_HOUSEHOLD_MOVEMENT } from '~/AppConstant'; // API_HOUSEHOLD_MOVEMENT = /api/forms/ChangingHousehold 
import config from './configHeader';


class formHouseholdMovement {


    async getAllFormHouseholdMovement(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_HOUSEHOLD_MOVEMENT, // đường dẫn api, có thể có các query param
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

    async getAllCheckFormHouseholdMovement(token, isChecked) {
        const response = await axios.get(
            `${API_HOUSEHOLD_MOVEMENT}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormHouseholdMovementById(token, id) {
        const response = await axios.get(
            `${API_HOUSEHOLD_MOVEMENT}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormHouseholdMovement(token, data) {
        const response = await axios.post(
            API_HOUSEHOLD_MOVEMENT,
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

    async acceptFormHouseholdMovement(token, id, data) {

        const response = await axios.post(
            `${API_HOUSEHOLD_MOVEMENT}/accept/${id}`,
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

    async undoFormHouseholdMovement(token, id) {
        const response = await axios.delete(
            `${API_HOUSEHOLD_MOVEMENT}/${id}`,
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