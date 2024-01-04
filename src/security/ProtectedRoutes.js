
// // - page connecté (profil)
// // - page publique (index, etc ...)
// // - page bloqué au connecté (connexion , inscription ...)



import {useEffect, useState} from 'react';
import  {Navigate, Outlet} from 'react-router-dom';
import {AuthProvider, useAuth} from './user';


export const ProtectedRoutes = ({needToConnect, needToNotConnect}) => {
    const { userStatusInfo } = useAuth();
    console.log(userStatusInfo.is_user);


        if (needToConnect && !userStatusInfo.is_user && !needToNotConnect) {
            return <Navigate to="/"/>;
        } else if (!needToConnect && userStatusInfo.is_user && needToNotConnect) {
            return <Navigate to="/"/>;
        } else {
            return (<Outlet/>);
        }

};
