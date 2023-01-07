class Account {
    logout = (callback) => {
        callback({});
        localStorage.removeItem('myUserNameReactApp');
    }
}

const accountService = new Account();
export default accountService;