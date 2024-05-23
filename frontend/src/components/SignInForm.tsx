/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Inputforms';
import Button from './Buttons';


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

function SignInForm(){

    return(

        <div>

        <FormContainer>

            <Title>Sign Up</Title>

            <InputContainer>
            <InputGrid>
            
            <Input placeholder="Username">
            </Input>

            <Input placeholder="Password">
            </Input>

            <Input placeholder="Confirm Password"></Input>

            </InputGrid>
            
            <LinkText href="loginPage" >Already registered? Click here to log in.</LinkText>
            
            </InputContainer>
         
        <ButtonGrid>

        <Button color="#FFC2EA">
            Register
        </Button>
     

        </ButtonGrid>

        </FormContainer>

        
        </div>
    )

}

export default SignInForm;