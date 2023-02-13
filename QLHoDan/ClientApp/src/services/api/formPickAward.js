import { API_CHOOSE_AWARD } from '~/AppConstant';
import axios from 'axios';
import config from '~/config';

class FormChooseAward {
    async chooseAward(token, data, id) {
        const response = await axios.post(
            `${API_CHOOSE_AWARD}?rewardCeremonyId=${id}}`,
            data,
            config(token)
        );
        return response.data;
    }
}