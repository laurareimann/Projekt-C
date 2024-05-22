import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-1)"
                : color === "green" ? "var(--color--green-1)"
                    : "var(--color--pink-1)"
            : color === "blue" ? "var(--color--blue-4)"
                : color === "green" ? "var(--color--green-3)"
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

export const handleClick = () => {
    console.log("Button clicked!");
};

function Button({ children = "", color = "pink", disabled = false, onClick = () => { handleClick } }) {
    return (
        <>
            <StyledButton color={color} disabled={disabled} onClick={onClick}>
                {children}
            </StyledButton>
        </>
    );
}

export default Button;
