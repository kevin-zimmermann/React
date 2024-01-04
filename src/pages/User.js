import {Link, useParams} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {AuthProvider} from "../security/user";
import {Navbar} from "../components/navbar";
const User = () => {
    const params = useParams();

    const [getUser, setUser] = useState(null);
    const infoUser = async () => {
        const token = localStorage.getItem('token');
        const formData = {'id': params.id, 'page': 'getUser'};

        try {
            const response = await fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }, body: JSON.stringify(formData),
            })
            const dataResponse = await response.json();
            return dataResponse

        } catch (err) {
            console.log(err);
        }
    };

    console.log(getUser)

    useEffect(() => {
        const getInfoUser = async () => {
            try {
                const user = await infoUser();
                setUser(user.result);
                // Assuming AuthProvider returns a promise
            } catch (error) {
                // Handle any errors from AuthProvider
                console.error(error);
            }
        };

        getInfoUser()

    }, []);

console.log(typeof  getUser);
    if (getUser === null) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <Header/>
                <h1>User avec ID {params.id}</h1>
                <Navbar/>
                {typeof getUser === 'string' ? (
                    getUser
                ) : (
                    <div>
                        <p>ID: {getUser.id}</p>
                        <p>Email: {getUser.email}</p>
                        <p>Login: {getUser.login}</p>
                    </div>
                )}



            </div>);
    }
};

export default User;
