interface HouseholdAccount {
    userName:string;
    fullName:string;
    scope:number;
    note?:string;
}
interface HouseholdAccountInfoChange {
    userName:string;
    fullName?:string;
    scope?:number;
    note?:string;
}
interface WithPassword {
    password:string;
}
class HouseholdAccountManager {
    async getAccounts(token:string):Promise<HouseholdAccount[]>;
    async addAccount(token:string, account:HouseholdAccount & WithPassword):Promise<void>;
    async changeAccountInfo(token:string, info:HouseholdAccountInfoChange):Promise<void>;
}
const householdAccountManager:HouseholdAccountManager;
export default householdAccountManager;