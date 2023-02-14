import axios from 'axios';
import { API_ENVIDENCE_AWARD } from '~/AppConstant';
import config from './configHeader';


class FormEnvidenceAward {


    async getAllFormEnvidenceAward(token) {  // tên hàm cùng với các tham số, token bắt buộc 
        const response = await axios.get(  // phương thức get, post, put, delete, patch
            API_ENVIDENCE_AWARD, // đường dẫn api, có thể có các query param
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

    async getFormAwardFromCeremoryById(token, id) {
        const response = await axios.get(
            `${API_ENVIDENCE_AWARD}?rewardCeremonyId=${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getAllCheckFormAward(token, isChecked) {
        const response = await axios.get(
            `${API_ENVIDENCE_AWARD}?isChecked=${isChecked}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormAwardById(token, id) {
        const response = await axios.get(
            `${API_ENVIDENCE_AWARD}/${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormAward(token, data) {
        const response = await axios.post(
            API_ENVIDENCE_AWARD,
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

    async acceptAwardForm(token, id, data) {

        const response = await axios.post(
            `${API_ENVIDENCE_AWARD}/accept/${id}`,
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

    async deleteAward(token, id) {
        const response = await axios.delete(
            `${API_ENVIDENCE_AWARD}/${id}`,
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
const formEnvidenceAward = new FormEnvidenceAward();
export default formEnvidenceAward