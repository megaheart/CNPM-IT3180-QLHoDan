interface UserState{
    username:string;
    token:string;
    expiration: Date,
    role: "CommitteeChairman" | "Accountant" | "ScopeLeader" | "Household",
    //fullName?:string
}
interface UserProfile{
    fullName:string,
    scope:number
}
class Authentication{
    signIn(username:string, password:string):Promise<void>;
    logOut():void;
    onAccountChanged: (user:UserState) => void;
    fetchProfile():Promise<UserProfile>;
    get User():UserState;
    isAuthentication():boolean;
}