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
        width: 350px;
    }

    @media (max-width:768px){
        width:355px;
    }
`;

const SignUpContainer = styled.div`
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
        height: 100vh;
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

const setCookie = (name: string,value: unknown,days: number) =>{
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()};path=/`

  }

  const getCookie = (name:string) =>{
    const cookies = document.cookie.split("; ").find((row)=> row.startsWith(`${name}=`));

    return cookies ? cookies.split("=")[1] : null;
  }


const currentUser = getCookie("username");

const throwToast = (errorMessage:string) =>{
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

function SignUpForm(){

    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')
    const [passwordConfirm,setPasswordConfirm] = useState("")

    async function submit(e: { preventDefault: () => void; }){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8080/signup",{
                user,password,passwordConfirm
            })
            .then((res: { data: string })=>{
                if(res.data==="exists"){
                    throwToast("User already exists")
                      return 0;
                }
                else if(res.data==="Passwords not matching"){
                    console.log("Passwords didn't match!")
                    throwToast("Passwords are not matching")
                      return 0;
                }
                else if(res.data==="SignUpSuccess"){
                    window.location.replace("/login-page");
                }
            })
            .catch((e:string)=>{
                console.log(e);
            })

        }
        catch(e){
            console.log(e);
        }

    }


    return(
        <div>
            <SignUpContainer>
                <h1>Sign Up</h1>
                <InputWrapper>
                        <StyledInput $isValid placeholder="Username" onChange={(e)=>{setUser(e.target.value)}}/>
                        <StyledInput $isValid placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <StyledInput $isValid placeholder="Confirm Password" type="password" onChange={(e) => {setPasswordConfirm(e.target.value)}} />
                    </InputWrapper>
                    <a href="loginPage" >Already registered? Click here to log in.</a>
                <ButtonWrapper>
                    <StyledButton color="#FFC2EA" type='submit' onClick={submit}>Register</StyledButton>
                </ButtonWrapper>
            </SignUpContainer>   
        </div>
    )
}

export default SignUpForm;