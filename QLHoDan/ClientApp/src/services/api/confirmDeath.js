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

const formEvidenceDeath = new FormEvidenceDeath();
export default formEvidenceDeath;