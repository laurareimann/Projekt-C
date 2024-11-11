/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../buttons/Buttons';
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//StyledButton kopiert
const StyledButton = styled.button`
    background-color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-1)"
                : color === "green" ? "var(--color--green-1)"
                    : "var(--color--pink-1)"
            : color === "blue" ? "var(--color--blue-4)"
                : color === "green" ? "var(--color--green-3)"
                    : color === "darkPink" ? "var(--color--pink-5)"
                        : "var(--color--pink-3)"

    };
    color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-3)"
                : color === "green" ? "var(--color--green-4)"
                    : "var(--color--pink-4)"
            : "white"
    };
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    width: fit-content;
    border: none;
    border-radius: 30px;
    text-transform: uppercase;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    transition: background-color 0.3s, opacity 0.3s;

    &:not(:disabled):hover {
        background-color: ${({ color }) =>
        color === "blue" ? "var(--color--blue-5)" :
            color === "green" ? "var(--color--green-5)" :
                "var(--color--pink-4)"};
    }
`;


//StyledInput nach hier kopiert, damit die form auch funktioniert
//Musste vor das isValid hier ein Dollarzeichen setzen, sonst wirft React-Dom einen Error
interface InputProps {
    $isValid?: boolean; //wird irrelevant sobald regex funktioniert
}

const StyledInput = styled.input<InputProps>`
    background-color: ${({ $isValid }) =>
        $isValid
            ? "white" : "var(--color--error-red-light)"
    };

    color: ${({ disabled, $isValid }) =>
        disabled
            ? "var(--color--disabled-gray)" : $isValid
                ? "var(--color--blue-5)" : "var(--color--error-red)"
    };
    
    border: 2.5px solid ${({ disabled, $isValid }) =>
        disabled
            ? "var(--color--disabled-gray)" : $isValid
                ? "var(--color--blue-5)" : "var(--color--error-red)"
    }; 
    font-weight: 700;
    font-size: 18px; 
    height: 60px; 
    padding-left: 16px;
    outline: 0;
    border-radius: 8px;
    display: flex;


    &:not(disabled){
        border: 2.5px solid  ${({ $isValid }) =>
        $isValid
            ? "var(--color--pink-2)" : "var(--color--error-red)"};
    }
    


    &:not(:disabled):hover {

        border: 2.5px solid  ${({ $isValid }) =>
        $isValid
            ? "var(--color--pink-3)" : "var(--color--error-red)"};
        color: ${({ $isValid }) =>
        $isValid
            ? "var(--color--pink-3)" : "var(--color--error-red)"};
    };

    &::placeholder{
        font-size: 16px;
        font-weight: 400;
        color: "var(--color--disabled-gray)"
    };

    @media (min-width: 769px) {
        width: 100%;
    }

    @media (max-width:768px){
        width:100%;
    }
`;

export const LoginContainer = styled.div`
    width:500px;
    border: 8px solid var(--color--pink-1);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    grid-gap: 32px;
    align-items: center;

    @media (max-width: 768px) {
        border: none;
        height: 100%;
        width:100%;
        justify-content: center;
    }
`

const InputWrapper = styled.div`
    width: fit-content;
    display: grid;
    grid-gap: 12px;
    justify-items: left;
    
    @media (max-width: 768px) {
    }
`

const ButtonWrapper = styled.div`
    width: fit-content;
    display: grid;
    grid-gap: 12px;
    justify-items: center;`


const setCookie = (name: string, value: unknown, days: number) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()};path=/`

}

const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));

    return cookies ? cookies.split("=")[1] : null;
}


const currentUser = getCookie("username");

const throwToast = (errorMessage: string) => {
    toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}


function LoginForm() {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e: { preventDefault: () => void; }) {

        console.log("submitting...")

        e.preventDefault();

        try {

            await axios.post("http://localhost:8080/login", {
                user, password
            })
                .then((res: { data: string; }) => {
                    if (res.data == "exist") {
                        setCookie("username", user, 7);
                        console.log("Logged in");
                        window.location.replace("/")
                    }
                    else if (res.data == "notexist") {
                        throwToast("User doesn't exist yet")
                    }
                    else if (res.data == "Wrong credentials!") {
                        throwToast("Wrong username or password!");
                    }
                })
                .catch((e: string) => {

                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }

    return (
        <LoginContainer>
            <h1>Sign In</h1>
            <InputWrapper>
                <StyledInput $isValid={true} disabled={false} placeholder="Username" type="email" onChange={(e) => { setUser(e.target.value); }} />
                <StyledInput $isValid={true} disabled={false} placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                <a href="">Forgot password?</a>
            </InputWrapper>
            <ButtonWrapper>
                <StyledButton type="submit" onClick={submit} color="var(--color--pink-2)" >Log In</StyledButton>
                <p> or </p>
                <a href="register">
                    <Button color="darkPink">Register</Button> </a>
            </ButtonWrapper>
        </LoginContainer>
    )
}

export default LoginForm;