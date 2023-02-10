import axios from 'axios';
import config from './configHeader';
import {
    API_ACCOUNT_CHANGEPASSWORD_URL,
    API_ACCOUNT_PROFILE_URL
} from '~/AppConstant';
class AccountApi {
    changePassword = async (token, oldPassword, newPassword) => {
        return axios.post(
            API_ACCOUNT_CHANGEPASSWORD_URL,
            {
                oldPassword,
                newPassword
            },
            config(token)
        );
    };
    async getProfile(token) {
        const res = await axios.get(
            API_ACCOUNT_PROFILE_URL,
            config(token)
        )
        return res.data
    }
}

const accountApi = new AccountApi();
export default accountApi;

