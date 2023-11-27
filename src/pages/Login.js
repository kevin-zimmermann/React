import {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import InputField from "../components/InputField";
import ErrorMessage from "../components/errorMessage";


const Login = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    // const [email, setEmail] = useState('');
    const [errors , setErrors] = useState([]);
    const [data,setData] = useState([]);


    useEffect(() => {
        // This effect runs whenever 'data' state changes
        // Check if there's a token in the response and navigate if it exists
        if (data.token) {
            navigate('/');
        }
    }, [data.token, navigate]);

    const fetchData = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1/howToVerify/traitement.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Update the Content-Type
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setData(data);
            localStorage.setItem('token', data.token);
            setErrors(data.err);
            return data;
        } catch (error) {
            // Handle error, e.g., set an error state to display a message to the user
            console.error('Error fetching data:', error);
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (login !== '' && password !== '') {

            const formData = {'login': login, 'password': password, 'page': 'connexion'};

            fetchData(formData)

            setPassword("");
            setLogin("");
            // setEmail("");


        }

    };

    return (
        <form onSubmit={handleSubmit}>
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
    );
};

export default Login;

