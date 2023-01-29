import { API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL, API_ACCOUNTMANAGEMENT_HOUSEHOLD_CHANGEACCOUNTPROFILE, API_ACCOUNTMANAGEMENT_HOUSEHOLD_GETACCOUNTLIST_URL } from "~/AppConstant";
class HouseholdAccountManager {
    async getAllAccounts(token) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_HOUSEHOLD_GETACCOUNTLIST_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //if(response.status != 200) return Promise.reject(await response.json());
        return await response.json();
    }
    async addAccount(token, account) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_HOUSEHOLD_ADDACCOUNT_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        if (response.status !== 200) return Promise.reject(await response.json());
        //return await response.text();
    }
    async changeAccountInfo(token, info) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_HOUSEHOLD_CHANGEACCOUNTPROFILE, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        if (response.status !== 200) return Promise.reject(await response.json());
        //return await response.json();
    }
}
const householdAccountManager = new HouseholdAccountManager;
export default householdAccountManager;