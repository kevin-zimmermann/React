import InputField from "../components/InputField";
import {useState} from "react";
import ErrorMessage from "../components/errorMessage";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const Navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors]=useState([]);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

            const formData = {'login': login, 'password': password, 'email': email, 'page':'register'};

            fetch('http://127.0.0.1/howToVerify/traitement.php?valider=1', {
                method: 'POST', headers: {'Content-Type': 'multipart/form-data'}, // Modifier l'en-tête Content-Type
                body: JSON.stringify(formData),
            })
                .then(response => {return response.json()})
                .then(data => {
                    // Traitez la réponse
                    console.log(data.err);
                    setErrors(data.err)
                    if (data.err.status){
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

    return (<form onSubmit={handleSubmit}>
        <InputField
            label="Login:"
            type="text"
            value={login}
            onChange={handleLoginChange}
        />
        <InputField
            label="Email:"
            type="email"
            value={email}
            onChange={handleEmailChange}
        />
        <InputField
            label="Mot de passe:"
            type="password"
            value={password}
            onChange={handlePasswordChange}
        />
        <ErrorMessage messages={errors}/>
        <button type="submit">Envoyer</button>
    </form>);
};

export default Register;
