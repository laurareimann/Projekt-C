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
`

const ButtonGrid = styled.div`
    margin-top: 5px;
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

function LoginForm(){

    return(

        <div>

        <FormContainer>

            <Title>Sign In</Title>

            <InputContainer>
            <InputGrid>
            
            <Input placeholder="Username">
            </Input>

            <Input placeholder="Password">
            </Input>


            </InputGrid>
            
            <LinkText href="">Forgot password?</LinkText>
            
            </InputContainer>
         
        <ButtonGrid>

            <Button color="var(--color--pink-2)" >
                Log In
            </Button>

        <AlternativeText>
            or
        </AlternativeText>

        <a href="registerPage">
        <Button color="var(--color--pink-2)">
            Register
        </Button>
        </a>

        </ButtonGrid>

        </FormContainer>

        


        </div>
    )

}

export default LoginForm;