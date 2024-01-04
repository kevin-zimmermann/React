
// // - page connecté (profil)
// // - page publique (index, etc ...)
// // - page bloqué au connecté (connexion , inscription ...)



import {useEffect, useState} from 'react';
import  {Navigate, Outlet} from 'react-router-dom';
import {AuthProvider, useAuth} from './user';


export const ProtectedRoutes = ({needToConnect, needToNotConnect}) => {
    const { userStatusInfo } = useAuth();
    const isAuthenticated = userStatusInfo?.is_user;


    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }else {
        if (needToConnect && !isAuthenticated && !needToNotConnect) {
            return <Navigate to="/"/>;
        } else if (!needToConnect && isAuthenticated && needToNotConnect) {
            return <Navigate to="/"/>;
        } else {
            return (<Outlet/>);
        }
    }

};
