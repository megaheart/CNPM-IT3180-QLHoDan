import axios from 'axios';
import config from './configHeader';
import { API_ACCOUNT_CHANGEPASSWORD_URL } from '~/AppConstant';
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
    }
}

const accountApi = new AccountApi();
export default accountApi;

