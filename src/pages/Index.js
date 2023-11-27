import {Link} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {AuthProvider} from "../security/user";
import {Navbar} from "../components/navbar";
const Index = () => {
    const[isUser,setIsUser] = useState(null);
    useEffect(() => {
        const infoUser = async () => {
            try {
                const {isAuth} =  AuthProvider();
                setIsUser(isAuth);

                // Assuming AuthProvider returns a promise
            } catch (error) {
                // Handle any errors from AuthProvider
                console.error(error);
            }
        };

        infoUser()

    }, []);


    return (
        <div>
        <Header/>
            <h1>Navigation example</h1>
            <Navbar/>

        </div>);
};

export default Index;
