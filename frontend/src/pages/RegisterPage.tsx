import React from "react";
import SignUpForm from "../components/login&signin/SignUpForm";
import { ToastContainer } from "react-toastify";
import Header from "../components/header&footer/Header";
import { Wrapper } from "./FAQ";

const RegisterPage: React.FC = () => {
    return(
        <Wrapper>
            <Header/>
            <SignUpForm/>
            <ToastContainer></ToastContainer>
        </Wrapper>
    )
};

export default RegisterPage;