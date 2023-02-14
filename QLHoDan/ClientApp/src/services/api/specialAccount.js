import { API_ACCOUNT_SPECIAL } from '~/AppConstant';
import config from './configHeader';
import axios from 'axios';

class SpeicalAccount {
    async getAllSpecialAccount(token) {
        const response = await axios.get(
            `${API_ACCOUNT_SPECIAL}/AccountList`,
            config(token)
        );
        if (response.status !== 200) {
            alert(response);
        };
        return response.data;
    }
    async addSpecialAccount(token, account) {
        const response = await axios.post(
            `${API_ACCOUNT_SPECIAL}/addAccount`,
            account,
            config(token)
        );
        if (response.status !== 200) {
            alert(response);
        };
        return response.data;
    }
    async changeSpecialAccountInfo(token, info) {
        const response = await axios.post(
            `${API_ACCOUNT_SPECIAL}/changeAccountProfile`,
            info,
            config(token)
        );
        if (response.status !== 200) {
            alert(response);
        };
        return response.data;
    }
}

const specialAccount = new SpeicalAccount();
export default specialAccount;