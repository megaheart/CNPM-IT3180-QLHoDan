import { API_ACCOUNT_PROFILE_URL, API_ACCOUNT_LOGIN_URL } from '~/AppConstant';
class Authentication {
    user = null;
    constructor() {
        let token = localStorage.getItem('AuthenticationToken');
        if (token) {
            this.user = this.getUserFromToken(token);
        }
    }

    get User() {
        if (process.env.NODE_ENV === 'development') {
            if (!this.isAuthenticated()) throw new Error("Please check isAuthenticated before using this property");
        }
        return this.user
    }
    signIn(username, password) {
        return new Promise((resolve, reject) => {
            fetch(API_ACCOUNT_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.user = this.getUserFromToken(data.token);
                        localStorage.setItem('AuthenticationToken', data.token);
                        this.onAccountChanged(this.user);
                        resolve();
                    });

                }
                else {
                    console.log(response);
                    response.json().then((data) => {
                        reject(data);
                    })
                        .catch((error) => { reject(error); })
                }
            }).catch((error) => { reject(error); });
        });
    }
    logOut() {
        if (this.isAuthenticated()) {
            localStorage.removeItem('AuthenticationToken');
            this.user = null;
            this.onAccountChanged(this.user);
        }
    }
    fetchProfile() {
        return new Promise((resolve, reject) => {
            fetch(API_ACCOUNT_PROFILE_URL, {
                headers: {
                    Authorization: `Bearer ${this.user.token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        resolve(data);
                    });
                }
                else {
                    console.log(response);
                    response.json().then((data) => {
                        reject(data);
                    })
                        .catch((error) => { reject(error); })
                }
            }).catch((error) => { reject(error); });

        });
    }
    onAccountChanged = (user) => { };
    isAuthenticated() {
        return this.user !== null && this.user.expiration > Date.now();
    }
    getUserFromToken(token) {
        if (token) {
            var o = this.parseJwt(token);
            return {
                username: o['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                expiration: new Date(o.exp * 1000),
                role: o['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                token: token,
            }
        }
        return null;
    }
    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
const authenticationService = new Authentication();
export default authenticationService;