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

type LabelButtonProps = {
    color?: string;
    onClick?: () => void;
    selected?: boolean; // New prop to control selection state
    children?: React.ReactNode;
};

function LabelButton({ color = "pink", onClick = () => { }, selected = false, children = "" }: LabelButtonProps) {
    return (
        <StyledButton
            color={color}
            onClick={onClick}
            selected={selected} // Pass selected state
        >
            {children}
        </StyledButton>
    );
}

export default LabelButton;
