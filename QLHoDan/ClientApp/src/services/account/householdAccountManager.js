import { API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL, API_ACCOUNTMANAGEMENT_HOUSEHOLD_CHANGEACCOUNTPROFILE, API_ACCOUNTMANAGEMENT_HOUSEHOLD_GETACCOUNTLIST_URL } from "~/AppConstant";
class HouseholdAccountManager {
    async getAllHouseholdAccounts(token) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_HOUSEHOLD_GETACCOUNTLIST_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //if(response.status != 200) return Promise.reject(await response.json());
        return await response.json();
    }
    async addHouseholdAccount(token, account) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(account)
        });
        //if (response.status != 200) return Promise.reject(await response.json());
        return await response.json();
    }
    async changeHouseholdAccountInfo(token, info) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(info)
        });
        //if (response.status != 200) return Promise.reject(await response.json());
        return await response.json();
    }
}
module.exports = HouseholdAccountManager;
const householdAccountManager = new HouseholdAccountManager;
export default householdAccountManager;