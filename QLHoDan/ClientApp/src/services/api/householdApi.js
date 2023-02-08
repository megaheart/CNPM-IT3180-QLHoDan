import { API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL, API_ACCOUNTMANAGEMENT_HOUSEHOLD_CHANGEACCOUNTPROFILE, API_ACCOUNTMANAGEMENT_HOUSEHOLD_GETACCOUNTLIST_URL } from "~/AppConstant";
import axios from 'axios';
class HouseholdAccountManager {
    async getAllAccounts(token) {
        const response = await axios.get(API_ACCOUNTMANAGEMENT_HOUSEHOLD_GETACCOUNTLIST_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //if(response.status != 200) return Promise.reject(await response.json());
        return response.data;
    }
    async addAccount(token, account) {
        const response = await axios.post(API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL,
            account,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.status !== 200) {
            return response.data;
        }
        else {
            console.log("Lỗi xảy ra khi thêm tài khoản");
            return response.status;
        }
    }
    async changeAccountInfo(token, info) {
        const response = await axios.post(API_ACCOUNTMANAGEMENT_HOUSEHOLD_CHANGEACCOUNTPROFILE,
            info,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        if (response.status !== 200) {
            return response.data;
        }
        else {
            console.log("Lỗi xảy ra khi sửa tài khoản");
        }
    }
}
const householdAccountManager = new HouseholdAccountManager();
export default householdAccountManager;