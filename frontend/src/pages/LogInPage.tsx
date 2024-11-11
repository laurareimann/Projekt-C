import React from "react";
import LoginForm from "../components/login&signin/LoginForm";
import { ToastContainer } from "react-toastify";
import Header from "../components/header&footer/Header";
import styled from "styled-components";

export const LoginWrapper = styled.div`
    width: 55%;
    text-align: start;
    flex:1;
    align-self: center;
    justify-items: center;

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const LogInPage: React.FC = () => {
    return(
        <LoginWrapper>
            <Header/>
            <LoginForm/>
            <ToastContainer></ToastContainer>
        </LoginWrapper>
    )
};

export default LogInPage;