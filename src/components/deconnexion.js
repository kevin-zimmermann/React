
export const Deconnexion = () => {

    const disconnect = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    disconnect();

};
