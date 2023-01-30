import { API_ACCOUNTMANAGEMENT_COMMITTEECHAIRMAN_CHANGEACCOUNTPROFILE_URL, API_ACCOUNTMANAGEMENT_SPECIAL_ADDACCOUNT_URL, API_ACCOUNTMANAGEMENT_SPECIAL_CHANGEACCOUNTPROFILE, API_ACCOUNTMANAGEMENT_SPECIAL_GETACCOUNTLIST_URL } from "~/AppConstant";
class SpecialAccountManager {
    async getAllAccounts(token) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_SPECIAL_GETACCOUNTLIST_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //if(response.status != 200) return Promise.reject(await response.json());
        return await response.json();
    }
    async addAccount(token, account) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_SPECIAL_ADDACCOUNT_URL, {
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
        const response = await fetch(API_ACCOUNTMANAGEMENT_SPECIAL_CHANGEACCOUNTPROFILE, {
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
    async forCommitteeChairman_changeAccountInfo(token, info) {
        const response = await fetch(API_ACCOUNTMANAGEMENT_COMMITTEECHAIRMAN_CHANGEACCOUNTPROFILE_URL, {
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
const specialAccountManager = new SpecialAccountManager;
export default specialAccountManager;