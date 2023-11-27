import {useEffect, useState} from "react";
import {AuthProvider} from "../security/user";
import {Link} from "react-router-dom";


export const Navbar = () => {


    const [isUser, setIsUser] = useState(null);
    useEffect(() => {
        const infoUser = async () => {
            try {
                const isAuth = await AuthProvider();
                console.log(isAuth);
                setIsUser(isAuth);
                console.log(isUser)

                // Assuming AuthProvider returns a promise
            } catch (error) {
                // Handle any errors from AuthProvider
                console.error(error);
            }
        };

        infoUser()
        console.log(infoUser())

    }, []);

    return (
        <div>
        {isUser ? (
                <nav>
                    <Link to="/">Home</Link>/
                    <Link to="/profil">Profil</Link>/
                    <Link to="/deconnexion">Se déconnecter</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/Register">Register</Link>/
                    <Link to="/Login">Login</Link>
                </nav>
            )}
        </div>
    );
}
