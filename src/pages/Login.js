import {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import InputField from "../components/InputField";
import ErrorMessage from "../components/errorMessage";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";


const Login = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    // const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        if (data.token) {
            navigate('/');
            window.location.href = '/';
        }
    }, [data.token, navigate]);

    const fetchData = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, // Update the Content-Type
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setData(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

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


            const formData = {'login': login, 'password': password, 'page': 'connexion'};
            fetchData(formData)

            setPassword("");
            setLogin("");
            // setEmail("");


    };

    return (
        <div>
            <Header/>
            <main>
                <h1 className={"font-bold text-center text-5xl mt-10"}>Connexion</h1>
                <div className={"h-screen flex items-center justify-center"}>
                    <div className={"w-9/12 h-auto m-auto justify-center content-center"}>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                placeholder={"Login"}
                                className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                label="Login:"
                                type="text"
                                value={login}
                                onChange={handleLoginChange}
                            />

                            <InputField
                                placeholder={"Password"}
                                className={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                label="Password:"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <ErrorMessage messages={errors}/>

                            <Button
                                className={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded justify-center"}
                                type="submit" innerHTML={"Envoyer"}></Button>
                        </form>
                    </div>
                </div>
            </main>
                <Footer/>
        </div>
);
};

export default Login;

