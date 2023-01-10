import {UserState} from './authentication';
interface HouseholdAccount {
    userName:string;
    fullName:string;
    scope:string;
    note?:string;
}
interface HouseholdAccountInfoChange {
    userName:string;
    fullName?:string;
    scope?:string;
    note?:string;
}
class HouseholdAccountManager {
    async getHouseholdAccounts(token:string):Promise<HouseholdAccount[]>;
    async addHouseholdAccount(token:string, account:HouseholdAccount):Promise<void>;
    async changeHouseholdAccountInfo(token:string, info:HouseholdAccountInfoChange):Promise<void>;
}
const householdAccountManager:HouseholdAccountManager;
export default householdAccountManager;