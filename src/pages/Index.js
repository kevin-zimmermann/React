import {Link} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {AuthProvider} from "../security/user";
import {Navbar} from "../components/navbar";
const Index = () => {
    return (
        <div>
        <Header/>
            <h1>Navigation example</h1>
            <Navbar/>

        </div>);
};

export default Index;
