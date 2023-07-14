import { useLocation, Navigate, Outlet } from "react-router-dom";
import ErrorLogin from '~/page/ErrorLogin'
import useAuth from "~/hooks/useAuth";
import React from "react";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();

    console.log(auth.role);

    console.log(allowedRoles);

    console.log(allowedRoles?.includes(auth.role))

    return (
        (allowedRoles?.includes(auth.role) || [...auth.role].some(role => allowedRoles?.includes(role)) || !allowedRoles)
            ? <Outlet />
            : <ErrorLogin />
    );
}

export default RequireAuth;