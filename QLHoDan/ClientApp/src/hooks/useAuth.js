import { useContext } from "react";
import { AuthContext } from '~/components/AuthenProvider';

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;