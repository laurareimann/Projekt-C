import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${({ color }) => color === "blue" ? "var(--color--blue-4)" : color === "green" ? "var(--color--green-3)" : "var(--color--pink-3)"};
    color: white;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    width: fit-content;
    border: none;
    border-radius: 30px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;

    &:hover {
        background-color: ${({ color }) =>
        color === "blue" ? "var(--color--blue-5)" :
            color === "green" ? "var(--color--green-5)" :
                "var(--color--pink-4)"};
    }
`;

function Button({ children = "", color = "pink" }) {
    return (
        <>
            <StyledButton color={color}>
                {children}
            </StyledButton>
        </>
    );
}

export default Button;
