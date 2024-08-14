import React from "react";
import LoginForm from "../components/login&signin/LoginForm";
import { ToastContainer } from "react-toastify";

const LogInPage: React.FC = () => {
    return(
        <div>
            <LoginForm/>
            <ToastContainer></ToastContainer>
        </div>
    )
};

export default LogInPage;