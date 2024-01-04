import { Link } from "react-router-dom";
import { useAuth } from "../security/user";
import {Deconnexion} from "./deconnexion";

export const Navbar = () => {
    const { userStatusInfo } = useAuth();

    return (
        <div>
            {userStatusInfo && userStatusInfo.is_user === true ? (
                <nav>
                    <Link to="/">Home</Link>/
                    <Link to="/profil">Profil</Link>/
                    <Link to="/" onClick={Deconnexion}>Se déconnecter</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/Register">Register</Link>/
                    <Link to="/Login">Login</Link>
                </nav>
            )}
        </div>
    );
};


