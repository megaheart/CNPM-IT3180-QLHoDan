import axios from './axios';
import config from './configHeader';
import {
    API_ACCOUNT_CHANGEPASSWORD_URL,
    API_ACCOUNT_PROFILE_URL,
    API_URL
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
    async updateAvatar(token, file) {
        const response = await axios.post(
            `${API_URL}/changeAvatar`,
            file,
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

    async updateWallpaper(token, file) {
        const response = await axios.post(
            `${API_URL}/changeWallpaper`,
            file,
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
}

const accountApi = new AccountApi();
export default accountApi;

