/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Inputforms';
import Button from './Buttons';
import axios from "axios";
import {Bounce,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const StyledButton = styled.button`
    background-color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-1)"
                : color === "green" ? "var(--color--green-1)"
                    : "var(--color--pink-1)"
            : color === "blue" ? "var(--color--blue-4)"
                : color === "green" ? "var(--color--green-3)"
                    :color ==="darkPink" ? "var(--color--pink-5)"
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
    background-color: ${({$isValid}) =>
        $isValid
                ? "white" : "var(--color--error-red-light)"
};

    color: ${({disabled, $isValid}) =>
        disabled
                ? "var(--color--disabled-gray)" : $isValid 
                    ? "var(--color--blue-5)" : "var(--color--error-red)"
};
    
    border: 2.5px solid ${({disabled, $isValid}) =>
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
    

    &:not(:disabled):hover {
        border: 2.5px solid  ${({$isValid}) =>
            $isValid
                ? "var(--color--blue-3)": "var(--color--error-red)"};
        color: ${({$isValid}) =>
            $isValid
                ? "var(--color--blue-3)": "var(--color--error-red)"};
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

const InputGrid = styled.div`
display: grid;
grid-gap: 45px;
place-items:center;
`

const FormContainer = styled.div`
    
    width:500px;
    border: 10px solid var(--color--pink-1);
    border-radius: 15px;
    margin-top: 200px;
    font-size:42px;
    margin-bottom:200px;
    padding-bottom: 100px ;

    @media (max-width:768px){
        border:none;
    }
`

const Title = styled.p`

    font-size: 42px;
    margin-top: 42px;
`

const AlternativeText = styled.p`
    font-size: 35px;
`

const LinkText = styled.a`
    margin-top: 10px;
    font-size: 15px;
    color:blue;
    margin-right: 100px;
    text-decoration: underline;

    &:hover{
        color: #3472d5;
    }
`

const ButtonGrid = styled.div`
    margin-top: 30px;
    display: grid;
    grid-gap: 45px;
    place-items:center;
`

const InputContainer = styled.div` 
    padding: 50px;
    margin-top: 20px;
`

const hr = styled.div`
    border-bottom: dotted black;
    width: 1px;
`

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
                if(res.data=="exists"){
                      throwToast("User already exists")
                      return 0;
                }
                if(res.data=="Passwords not matching"){
                    console.log("Passwords didn't match!")
                    toast.error('Passwords are not matching!', {
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
                      return 0;
                }
                if(res.data==="SignUpSuccess"){
                    window.location.replace("/logInPage");
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
            <FormContainer>
                <Title>Sign Up</Title>
                <InputContainer>
                    <InputGrid>     
                        <StyledInput placeholder="Username" onChange={(e)=>{setUser(e.target.value)}}/>
                        <StyledInput placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <StyledInput placeholder="Confirm Password" type="password" onChange={(e) => {setPasswordConfirm(e.target.value)}} />
                    </InputGrid>
                    <LinkText href="loginPage" >Already registered? Click here to log in.</LinkText>
                </InputContainer>
                <ButtonGrid>
                    <StyledButton color="#FFC2EA" type='submit' onClick={submit}>Register</StyledButton>
                </ButtonGrid>
            </FormContainer>   
        </div>
    )
}

export default SignUpForm;