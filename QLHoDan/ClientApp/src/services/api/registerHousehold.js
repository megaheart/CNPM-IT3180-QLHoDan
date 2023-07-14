// form dang ki ho khau, nhan khau
import axios from './axios';
import { API_HOUSEHOLD_REGISTER_FORM } from '~/AppConstant'; // API_HOUSEHOLD_REGISTER_FORM = /api/forms/Household
import config from './configHeader';


class FormHouseholdRegister {

    async getAllFormHouseholdRegister(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_HOUSEHOLD_REGISTER_FORM, // đường dẫn api, có thể có các query param
            //  data,      request body nếu có
            config(token)
        );
        console.log(response)
        return response.data;
    }

    async getAllCheckFormHouseholdRegister(token, isChecked) {
        const response = await axios.get(
            `${API_HOUSEHOLD_REGISTER_FORM}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormHouseholdRegisterById(token, id) {
        const response = await axios.get(
            `${API_HOUSEHOLD_REGISTER_FORM}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormHouseholdRegister(token, data) {
        const response = await axios.post(
            API_HOUSEHOLD_REGISTER_FORM,
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

    async acceptFormHouseholdRegister(token, id, data) {
        console.log(data)
        const response = await axios.post(
            `${API_HOUSEHOLD_REGISTER_FORM}/accept/${id}`,
            data,
            config(token)
        )
        return response;
    }

}

const formHouseholdRegister = new FormHouseholdRegister();
export default formHouseholdRegister;