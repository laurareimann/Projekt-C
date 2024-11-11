import React from "react";
import SignUpForm from "../components/login&signin/SignUpForm";
import { ToastContainer } from "react-toastify";
import Header from "../components/header&footer/Header";
import { LoginWrapper } from "./LogInPage";

const RegisterPage: React.FC = () => {
    return(
        <LoginWrapper>
            <Header/>
            <SignUpForm/>
            <ToastContainer></ToastContainer>
        </LoginWrapper>
    )
};

export default RegisterPage;