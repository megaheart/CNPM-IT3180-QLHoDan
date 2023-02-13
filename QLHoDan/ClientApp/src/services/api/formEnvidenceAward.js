import axios from 'axios';
import { API_ENVIDENCE_AWARD } from '~/AppConstant';
import config from './configHeader';

class FormEnvidenceAward {
    async getAllFormEnvidenceAward(token) {
        const response = await axios.get(
            API_ENVIDENCE_AWARD,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return [];
        }
    }

    async getFormAwardFromCeremoryById(token, id) {
        const response = await axios.get(
            `${API_ENVIDENCE_AWARD}/?rewardCeremonyId=${id}`,
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
            `${API_ENVIDENCE_AWARD}/?isChecked=${isChecked}`,
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

    async acceptAwardForm(token, id) {

        const response = await axios.post(
            `${API_ENVIDENCE_AWARD}/accept/${id}`,
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
            `${API_ENVIDENCE_AWARD}/accept/${id}`,
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