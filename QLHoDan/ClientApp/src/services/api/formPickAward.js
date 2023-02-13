import axios from 'axios';
import config from './configHeader';
const API_REWARD_FOR_CHANCE = '/api/forms/ChoosingPresents'

class FormRewardForChance {
    async getAllFormRewardForChance(token) {
        const response = await axios.get(
            API_REWARD_FOR_CHANCE,
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
            `${API_REWARD_FOR_CHANCE}/?rewardCeremonyId=${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getDetailFormRewardForChanceById(token, id) {
        const response = await axios.get(
            `${API_REWARD_FOR_CHANCE}/${id}`,
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
            API_REWARD_FOR_CHANCE,
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

    // async acceptFormRewardForChance(token, id) {

    //     const response = await axios.post(
    //         `${API_REWARD_FOR_CHANCE}/accept/${id}`,
    //         config(token)
    //     )

    //     if (response && response.data) {
    //         return response.data;
    //     }
    //     else {
    //         return response;
    //     }
    // }

    async deleteFormRewardForChance(token, id) {
        const response = await axios.delete(
            `${API_REWARD_FOR_CHANCE}/${id}`,
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