/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Inputforms';
import Button from './Buttons';
import axios from "axios";


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

    @media (max-width: 768px) {
        border:none;
        width:500px;
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
    font-size: 20px;
    color: blue;
    margin-right: 190px;
    text-decoration: underline;

    &:hover{
        color: #3472d5;
    }
`

const ButtonGrid = styled.div`
    margin-top: 5px;
    display: grid;
    grid-gap: 45px;
    place-items:center;

    @media (max-width: 768px){
     margin-top: 15px ;
    }
`

const InputContainer = styled.div` 
    padding: 50px;
    margin-top: 20px;

    @media (max-width:768px){
        padding:10px;
    }
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




function LoginForm(){

    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e: { preventDefault: () => void; }){

        console.log("submitting...")

        e.preventDefault();

        try{

            await axios.post("http://localhost:8080/login",{
                user,password
            })
            .then((res: { data: string; })=>{
                if(res.data=="exist"){
                    setCookie("username",user,7);
                    console.log("Logged in");
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch((e: string)=>{
                alert("wrong details")
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
                <Title>Sign In</Title>
                <InputContainer>
                  <InputGrid>
                      <Input placeholder="Username" />    
                      <Input placeholder="Password" />  
                  </InputGrid>      
                  <LinkText href="">Forgot password?</LinkText> 
                </InputContainer>
                <ButtonGrid>
                    <Button color="var(--color--pink-2)" >Log In</Button>
                    <AlternativeText> or </AlternativeText>
                    <a href="registerPage">
                    <Button onClick={()=>submit} color="darkPink">Register</Button> </a>
                </ButtonGrid>
            </FormContainer>
        </div>
    )
}

export default LoginForm;