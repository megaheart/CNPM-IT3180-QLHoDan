import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('myUserNameReactApp')) || {});
    useEffect(() => {
        localStorage.setItem('myUserNameReactApp', JSON.stringify(auth));
    }, [auth])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }