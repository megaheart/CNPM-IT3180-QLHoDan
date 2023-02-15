interface SpecialAccount {
    userName:string;
    fullName:string;
    scope:number;
    role:1|2|3|4;
    note?:string;
}
interface SpecialAccountInfoChange {
    userName:string;
    fullName?:string;
    scope?:number;
    note?:string;
}
interface WithPassword {
    password:string;
}
class SpecialAccountManager {
    async getAccounts(token:string):Promise<SpecialAccount[]>;
    async addAccount(token:string, account:SpecialAccount & WithPassword):Promise<void>;
    async changeAccountInfo(token:string, info:SpecialAccountInfoChange):Promise<void>;
    async forCommitteeChairman_changeAccountInfo(token:string, info:SpecialAccountInfoChange):Promise<void>;
}
const householdAccountManager:SpecialAccountManager;
export default householdAccountManager;