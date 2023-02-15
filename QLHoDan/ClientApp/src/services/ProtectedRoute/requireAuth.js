import { useLocation, Navigate, Outlet } from "react-router-dom";
import ErrorLogin from '~/page/ErrorLogin'
import useAuth from "~/hooks/useAuth";
import React from "react";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    // console.log(allowedRoles)
    // console.log(auth)
    // console.log(allowedRoles.includes(auth.role))
    // return <Outlet />;
    return (
        (allowedRoles?.includes(auth.role))
            ? <Outlet />
            : <ErrorLogin />
    );
}

export default RequireAuth;