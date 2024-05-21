import styled from "styled-components";

interface InputProps {
    disabled?: boolean;
    placeholder?: string;
    size?:string; 
    $isValid?: boolean;
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
    height: ${({size}) =>
        (size === "regular" ? "60px" : "40px")};    
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

    @media (min-width: 768px) {
        width: ${({size}) =>
        size === "regular" ? "350px" : "fit-content"};
    }
`;

function Input({ disabled = false, placeholder = "E-Mail", size = "regular", isValid = true }) {

    return (
        <>
            <StyledInput 
                        disabled={disabled} 
                        placeholder={placeholder} 
                        size={size}
                        $isValid={isValid}
                        >
            </StyledInput>
        </>
    )
}
export default Input;