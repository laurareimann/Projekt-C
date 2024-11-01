import React from "react";
import LoginForm from "../components/login&signin/LoginForm";
import { ToastContainer } from "react-toastify";
import Header from "../components/header&footer/Header";
import { Wrapper } from "./FAQ";

const LogInPage: React.FC = () => {
    return(
        <Wrapper>
            <Header/>
            <LoginForm/>
            <ToastContainer></ToastContainer>
        </Wrapper>
    )
};

export default LogInPage;