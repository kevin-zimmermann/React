import InputField from "../components/InputField";
import {useState} from "react";
import ErrorMessage from "../components/errorMessage";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../security/user";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
    const Navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        //Vérification login existant
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {'login': login, 'password': password, 'email': email, 'page': 'register'};


        fetch('http://127.0.0.1/ReactApi-/traitement.php?valider=1', {
            method: 'POST', // Modifier l'en-tête Content-Type
            body: JSON.stringify(formData),
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                // Traitez la réponse
                console.log(data.err);
                setErrors(data.err)
                if (data.err.status) {
                    Navigate('/');
                }
            })
            .catch(error => {
                // Gérez les erreurs
                console.log(error);
            });

        setEmail("")
        setPassword("");
        setLogin("");


    };

    return (

        <div>
            <Header/>
            <h1 className={"font-bold text-center text-5xl mt-10"}>Inscription</h1>
            <div className={"h-screen flex items-center justify-center"}>
                <div className={"w-9/12 h-auto m-auto justify-center content-center"}>
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
                            value={"envoyer"} type="submit" innerHTML={"Envoyer"}></Button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
        ;
};

export default Register;
