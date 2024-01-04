import {Link, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {AuthProvider, useAuth} from '../security/user';
import {useEffect, useState} from "react";
import InputField from "../components/InputField";
import {Navbar} from "../components/navbar";
import ErrorMessage from "../components/errorMessage";

const Profil = () => {
    const { userStatusInfo } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(userStatusInfo.infoUser.login);
    const [email, setEmail] = useState(userStatusInfo.infoUser.email);
    const [errors, setErrors] = useState([]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (login !== '' && password !== '') {

            const formData = {'login': login, 'password': password, 'email': email, 'page': 'profil'};

            fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                method: 'POST', headers: {'Content-Type': 'multipart/form-data', Authorization: token}, // Modifier l'en-tête Content-Type
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    localStorage.removeItem('token');
                    if (data.status !== true) {
                        setErrors(data)
                        navigate('/deconnexion');

                    }
                })
                .catch(error => {
                    // Gérez les erreurs
                    console.log(error);
                });

            setPassword("");
            setLogin("");
            setEmail("");

        }

    };


    if (userStatusInfo === null) {
        return <div>Loading...</div>;
    } else {
        return (<div>
            <Header/>
            <h1>Profil</h1>
            <Navbar/>

            <div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email:"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <InputField
                        label="Login:"
                        type="text"
                        value={login}
                        onChange={handleLoginChange}
                    />

                    <InputField
                        label="Password:"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <ErrorMessage messages={errors}/>

                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>);
    }

};

export default Profil;
