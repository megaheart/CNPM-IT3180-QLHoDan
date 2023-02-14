import { useContext } from "react";
import { AuthContext } from '~/components/AuthenProvider';

/**
 * UseAuth() is a function that returns the useContext() function, which is passed the AuthContext
 * object.
 * @returns The AuthContext object.
 */
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;