import { createContext, useEffect, useState } from "react";
import authenticationService from '~/services/account/authentication';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        () => {
            if (authenticationService.isAuthenticated()) {
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