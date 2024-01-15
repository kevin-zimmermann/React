import {Link, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {AuthProvider, useAuth} from '../security/user';
import {useEffect, useState} from "react";
import InputField from "../components/InputField";
import {Navbar} from "../components/navbar";
import ErrorMessage from "../components/errorMessage";
import Button from "../components/Button";

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

            fetch('http://127.0.0.1/howToVerify/traitement.php', {
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
            <Navbar/>
            <h1 className={"font-bold text-center text-5xl"}>Profil</h1>
            <div className={"w-9/12 h-auto m-auto justify-center"}>
                <form onSubmit={handleSubmit}>
                    <InputField
                        placeholder={"email@email.com"}
                        className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        label="Email:"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <InputField
                        placeholder={"YourLogin"}
                        className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        label="Login:"
                        type="text"
                        value={login}
                        onChange={handleLoginChange}
                    />

                    <InputField
                        placeholder={"YourPassword"}
                        className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        label="Password:"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <ErrorMessage messages={errors}/>

                    <Button
                        className={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded justify-center"}
                        type="submit" innerHTML={"Envoyer"}>
                    </Button>
                </form>
            </div>
        </div>);
    }

};

export default Profil;
