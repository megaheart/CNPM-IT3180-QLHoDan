import axios from 'axios';
import { API_REWARDS } from '~/AppConstant';
import config from './configHeader';
class RewardApi {
    async getAllRewardEvent(token) {
        const response = await axios.get(
            API_REWARDS,
            config(token)
        )
        return response.data;
    }

    async getRewardEventById(token, id) {
        const response = await axios.get(
            `${API_REWARDS}/${id}`,
            config(token)
        )
        return response.data;
    }

    async createRewardEvent(token, rewardEvent) {
        const response = await axios.post(
            API_REWARDS,
            rewardEvent,
            config(token)
        )
        return response.data;
    }

    async updateRewardEvent(token, rewardEvent) {
        const response = await axios.put(
            `${API_REWARDS}`,
            rewardEvent,
            config(token)
        )
        return response.data;
    }
    async transferRewardFromAchivement(token, id, request) {
        const response = await axios.post(
            `${API_REWARDS}/setARPairs/${id}`,
            request,
            config(token)
        );
        return response.data;
    }
    async markDoneRewardEvent(token, id) {
        const response = await axios.post(
            `${API_REWARDS}/done/${id}`,
            {},
            config(token)
        );
        return response.data;
    }

    async deleteRewardEvent(token, id) {
        const response = await axios.delete(
            `${API_REWARDS}/${id}`,
            config(token)
        );
        return response.data;
    }
}

const rewardApi = new RewardApi();
export default rewardApi;