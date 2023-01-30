import { createContext, useEffect, useState } from "react";
import authenticationService from '~/services/account/authentication';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        () => {
            console.log('hello')
            let a = authenticationService.isAuthenticated();
            console.log(a)
            if (a) {
                return authenticationService.User
            }
            else {
                return {}
            }
        });
    console.log(auth);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }