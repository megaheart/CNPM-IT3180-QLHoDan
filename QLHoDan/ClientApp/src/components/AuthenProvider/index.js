import { createContext, useEffect, useState } from "react";
import authenticationService from '~/services/account/authentication';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    /* Setting the initial state of the auth context. */
    const [auth, setAuth] = useState(
        () => {
            let a = authenticationService.isAuthenticated();
            console.log(a);
            console.log(authenticationService)
            if (a) {
                return authenticationService.user
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