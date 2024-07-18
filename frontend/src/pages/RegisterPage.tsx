import React from "react";
import SignUpForm from "../components/SignUpForm";
import { ToastContainer } from "react-toastify";

const RegisterPage: React.FC = () => {
    return(
        <div>
            <SignUpForm/>
            <ToastContainer></ToastContainer>
        </div>
    )
};

export default RegisterPage;