import householdAccountManager from './householdAccountManager';
const scopeLeaderToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMDA4MTI4MS0wM2ZhLTRkODMtYmEzZS0yYzA0OTQwYzU3OTEiLCJpYXQiOiIwOS1KYW4tMjMgNzowNzoxNCBBTSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNjc1ZjVjMWItMjBhMC00NGNhLTg2MzAtMDlhNjBkMmJiYWE2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InNjb3BlbGVhZGVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU2NvcGVMZWFkZXIiLCJleHAiOjE3MDQ3ODQwMzQsImlzcyI6Imdyb3VwMS5pdDMwODAub3JnIiwiYXVkIjoiZ3JvdXAxLml0MzA4MC5vcmcifQ.-tSMixcHVnEAWF5slBIS23CzksKuVUnUcIFdz9JGPvs";
const householdToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZTI5MzQwMS0wZWRjLTRjMWYtODI0ZC04ZjMyZmVhMDAyMzgiLCJpYXQiOiIwOS1KYW4tMjMgNzowNzoyOSBBTSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNWMzMjkzMmUtMGM0Zi00NGMyLWI5ZjAtYWI5Y2I5OTljNjkxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImhvdXNlaG9sZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhvdXNlaG9sZCIsImV4cCI6MTcwNDc4NDA0OSwiaXNzIjoiZ3JvdXAxLml0MzA4MC5vcmciLCJhdWQiOiJncm91cDEuaXQzMDgwLm9yZyJ9.xvbu-6MLfT7RcbCNz7YuM-qmmYayHgONSEt2-bjGmeA";

export async function getAllAccountSuccessful() {
    let r = await householdAccountManager.getAllAccounts(scopeLeaderToken);
    console.log(r);
}
export async function NOT_getAllAccountSuccessful() {
    let r = await householdAccountManager.getAllAccounts(householdToken);
    console.log(r);
}
export async function addAccountSuccessful() {
    let r = await householdAccountManager.addAccount(scopeLeaderToken, {
        userName: "household_6",
        fullName: "Nguyen Xa Beng",
        scope: 1,
        note: "This is a test account",
        password: "Linh@123456",
    });
    console.log(r);
}
export async function changeAccountSuccessful() {
    let r = await householdAccountManager.changeAccountInfo(scopeLeaderToken, {
        userName: "household_6",
        note: "This is a hello account"
    });
    console.log(r);
}