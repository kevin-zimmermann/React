import {Link} from "react-router-dom";
import {useAuth} from "../security/user";

export const Deconnexion = () => {

    const disconnect = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    disconnect();

};
