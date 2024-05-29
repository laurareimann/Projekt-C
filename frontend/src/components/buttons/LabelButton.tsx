import { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ color?: string; selected?: boolean }>`
    background-color: ${({ color, selected }) =>
        selected
            ? color === "blue" ? "var(--color--blue-4)" :
                color === "green" ? "var(--color--green-3)" :
                    "var(--color--pink-3)"
            : color === "blue" ? "var(--color--blue-2)" :
                color === "green" ? "var(--color--green-2)" :
                    "var(--color--pink-2)"
    };
    color: white;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    width: fit-content;
    border: 2px solid transparent;
    border-radius: 30px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;

    &:hover {
        border: 2px solid ${({ color }) =>
        color === "blue" ? "var(--color--blue-4)" :
            color === "green" ? "var(--color--green-3)" :
                "var(--color--pink-3)"
    };
    }

    &:focus {
        outline: none;
    }
`;

function LabelButton({ children = "", color = "pink", onClick = () => { } }) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        onClick();
    };

    return (
        <StyledButton
            color={color}
            onClick={handleClick}
            selected={selected}
        >
            {children}
        </StyledButton>
    );
}

export default LabelButton;
