

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

// form chung tu
import axios from 'axios';
import { API_EVIDENCE_DEATH } from '~/AppConstant'; // API_EVIDENCE_DEATH = /api/forms/Dead
import config from './configHeader';


class FormEvidenceDeath {


    async getAllFormEvidenceDeath(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_EVIDENCE_DEATH, // đường dẫn api, có thể có các query param
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

    async getAllCheckFormEvidenceForm(token, isChecked) {
        const response = await axios.get(
            `${API_EVIDENCE_DEATH}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormEvidenceFormById(token, id) {
        const response = await axios.get(
            `${API_EVIDENCE_DEATH}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormEvidenceDeath(token, data) {
        const response = await axios.post(
            API_EVIDENCE_DEATH,
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

    async acceptFormEvidenceDeath(token, id, data) {

        const response = await axios.post(
            `${API_EVIDENCE_DEATH}/accept/${id}`,
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

    async undoFormEvidenceDeath(token, id) {
        const response = await axios.delete(
            `${API_EVIDENCE_DEATH}/${id}`,
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

// form xin thay doi thong tin nhan khau
import axios from 'axios';
import { API_RESIDENT_CHANGE } from '~/AppConstant'; // API_RESIDENT_CHANGE = /api/forms/ChangingResidentInfo
import config from './configHeader';


class formResidentChange {


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