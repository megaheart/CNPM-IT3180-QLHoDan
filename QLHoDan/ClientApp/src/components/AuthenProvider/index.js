import { createContext, useEffect, useState } from "react";
import authenticationService from '~/services/account/authentication';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    /* Setting the initial state of the auth context. */
    const [auth, setAuth] = useState(
        () => {
            let a = authenticationService.isAuthenticated();
            if (a) {
                return authenticationService.user
            }
            else {
                return {}
            }
        });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }