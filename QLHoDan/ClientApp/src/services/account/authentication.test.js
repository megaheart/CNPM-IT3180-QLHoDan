const Authentication = require('./authentication');
//Avalivable until 2024/01/10 00:00
let availableToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OWJiYTAxOC1hMWVkLTQ2Y2EtOWEzNC0xYjc0NzYwYTdjNDMiLCJpYXQiOiIwOS1KYW4tMjMgNzowNjo0NiBBTSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzgwMmU5M2MtMDQ0Ny00OTkyLTkxZDgtNjdkNTUxYmJiODY1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ29tbWl0dGVlQ2hhaXJtYW4iLCJleHAiOjE3MDQ3ODQwMDYsImlzcyI6Imdyb3VwMS5pdDMwODAub3JnIiwiYXVkIjoiZ3JvdXAxLml0MzA4MC5vcmcifQ.UjGZ9Qtu5lDN3IWTfhcIva41HVZX5CwpOdUcJcNpiwQ`;
class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

//start up test
test('start up when user has NOT signed in before', () => {
    global.localStorage = new LocalStorageMock;
    let authenticationService = new Authentication;
    expect(authenticationService.isAuthenticated()).toBe(false);
});
test('start up when user has signed in before', () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('AuthenticationToken', availableToken);
    let authenticationService = new Authentication();
    expect(authenticationService.User.username).toBe("admin");
});
//Log in test
test('log in event username', () => {
    global.localStorage = new LocalStorageMock;
    let authenticationService = new Authentication();
    authenticationService.onAccountChanged = (user) => {
        expect(user.username).toBe("admin");
    };
    authenticationService.signIn("admin", "Linh@123456");
});

test('log in local storage test', () => {
    global.localStorage = new LocalStorageMock;
    let authenticationService = new Authentication();
    authenticationService.onAccountChanged = (user) => {
        let token = localStorage.getItem('AuthenticationToken');
        expect(token).not.toBe(null);
    };
    authenticationService.signIn("admin", "Linh@123456");
});
//Log out test
test('log out event', () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('AuthenticationToken', availableToken);
    let authenticationService = new Authentication();
    authenticationService.onAccountChanged = (user) => {
        expect(user).toBe(null);
    };
    authenticationService.logOut();
});
test('log out local storage test', () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('AuthenticationToken', availableToken);
    let authenticationService = new Authentication();
    authenticationService.logOut();
    let token = localStorage.getItem('AuthenticationToken');
    expect(token).toBe(null);
});
