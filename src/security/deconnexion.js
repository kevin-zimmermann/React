
export const Deconnexion = () => {

    function Logout() {
        localStorage.removeItem('token');
        window.location.href = '/';

    }
    Logout()
}


