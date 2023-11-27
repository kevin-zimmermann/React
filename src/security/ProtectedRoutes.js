
// // - page connecté (profil)
// // - page publique (index, etc ...)
// // - page bloqué au connecté (connexion , inscription ...)



import {useEffect, useState} from 'react';
import  {Navigate, Outlet} from 'react-router-dom';
import { AuthProvider } from './user';


export const ProtectedRoutes = ({needToConnect, needToNotConnect}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isAuth = await AuthProvider();
           // Assuming AuthProvider returns a promise
                setIsAuthenticated(isAuth.is_user)
                console.log(isAuth)

            } catch (error) {
                // Handle any errors from AuthProvider
                console.error(error);
                setIsAuthenticated(false)
            }
            return isAuthenticated;
        };
        checkAuth()
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }else {
        console.log(isAuthenticated, needToConnect, needToNotConnect)
        if (needToConnect && !isAuthenticated && !needToNotConnect) {
            return <Navigate to="/"/>;
        } else if (!needToConnect && isAuthenticated && needToNotConnect) {
            return <Navigate to="/"/>;
        } else {
            return (<Outlet/>);
        }
    }

};
