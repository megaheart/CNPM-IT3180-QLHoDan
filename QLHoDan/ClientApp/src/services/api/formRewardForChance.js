import axios from 'axios';
import config from './configHeader';
import { API_CHOOSE_AWARD } from '~/AppConstant';

class FormRewardForChance {
    async getAllFormRewardForChance(token) {
        const response = await axios.get(
            API_CHOOSE_AWARD,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return [];
        }
    }

    async getFormRewardForChanceByrewardCeremonyId(token, id) {
        const response = await axios.get(
            `${API_CHOOSE_AWARD}?rewardCeremonyId=${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        return response;
    }

    async getDetailFormRewardForChanceById(token, id) {
        const url = `${API_CHOOSE_AWARD}/${id}`;
        console.log(url)
        const response = await axios.get(
            url,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async sendFormRewardForChance(token, data) {
        const response = await axios.post(
            API_CHOOSE_AWARD,
            data,
            {
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

    async deleteFormRewardForChance(token, id) {
        const response = await axios.delete(
            `${API_CHOOSE_AWARD}/${id}`,
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
const formRewardForChance = new FormRewardForChance();
export default formRewardForChance