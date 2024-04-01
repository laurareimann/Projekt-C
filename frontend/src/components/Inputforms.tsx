import styled from "styled-components";
import { useState } from "react";

interface InputProps {
    isValid?: boolean;
    hasInput?: boolean;
    //inputType?: "Password" | "Username" | "Email";
}

const StyledInput = styled.input<InputProps>`
    background-color: "white";
    color: ${({disabled, isValid}) =>
        disabled
                ? "var(--color--disabled-gray)" : isValid?
                    "var(--color--blue-5)":"var(--color--error-red)"
};
    
    border: 2.5px solid ${({disabled, isValid}) =>
        disabled
                ? "var(--color--disabled-gray)" : isValid ? 
                    "var(--color--blue-5)" : "var(--color--error-red)"
}; 
    font-weight: 700;
    font-size: 18px; 
    width: 350px;
    height: 60px; 
    outline: 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    
    &:not(:disabled):hover {
        border: 2.5px solid  ${({isValid}) =>
            isValid
                ? "var(--color--blue-3)": "var(--color--error-red)"};
        color: ${({isValid}) =>
            isValid
                ? "var(--color--blue-3)": "var(--color--error-red)"};
    };

    &::placeholder{
        font-size: 16px;
        font-weight: 400;
        color: "var(--color--disabled-gray)"
    };
`;

function Input({disabled = false, placeholder = "", isValid = true}){
    
    return(
        <>
            <StyledInput 
                        disabled={disabled} 
                        placeholder={placeholder} 
                        isValid={isValid}>
            </StyledInput>
        </>
    )
}
export default Input;