import axios from 'axios';
import { API_MANAGE_AWARD_HISTORY } from '~/AppConstant'; // API_MANAGE_AWARD_HISTORY= api/RewardRecords
import config from './configHeader';

class FormManageAwardHistory {
    async getAllFormManageAwardHistory(token) {
        const response = await axios.get(
            `${API_MANAGE_AWARD_HISTORY}/preview`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return [];
        }
    }

    async getFormManageAwardHistoryById(token, id) {
        const response = await axios.get(
            `${API_MANAGE_AWARD_HISTORY}/preview?rewardCeremonyId=${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async saveFormManageAwardHistory(token, data) {
        const response = await axios.post(
            `${API_MANAGE_AWARD_HISTORY}/savePreview?rewardCeremonyId=${id}`,
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

    async getAwardHistoryByRewardCeremonyId(token, id) {
        const response = await axios.get(
            `${API_MANAGE_AWARD_HISTORY}?rewardCeremonyId=${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getAwardHistoryByResidentId(token, id) {
        const response = await axios.get(
            `${API_MANAGE_AWARD_HISTORY}?residentId=${id}`,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return response;
        }
    }

    async getAllAwardHistory(token) {
        const response = await axios.get(
            API_MANAGE_AWARD_HISTORY,
            config(token)
        );
        if (response && response.data) {
            return response.data;
        }
        else {
            return [];
        }
    }


}
const formManageAwardHistory = new FormManageAwardHistory();
export default formManageAwardHistory