/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './buttons/Buttons';

//Siehe Kommentar in Inputforms
const StyledContainer = styled.div <{ $hasOutline: boolean; color: string; height: number; width: number }>`
    display: grid;
    gap:16px;
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    box-sizing: border-box;
    border-radius: 26px;
    align-content: center;
    justify-content: center;
    box-shadow: 0px 0px 18px rgba(255, 255, 255, 0.5);
    color: ${({ color }) =>
        (color === "blue" ? "var(--color--blue-5)" :
            (color === "green" ? "var(--color--green-5)" :
                "var(--color--pink-5)"))};
    
    background-color: ${({ $hasOutline, color }) =>
        $hasOutline ? "var(--color--white-shade)" :
            (color === "blue" ? "var(--color--blue-1)" :
                (color === "green" ? "var(--color--green-1)" :
                    "var(--color--pink-1)"))};

    border: ${({ $hasOutline, color }) =>
        $hasOutline ? (color === "blue" ? "var(--color--blue-3) 3px solid" :
            (color === "green" ? "var(--color--green-3) 3px solid" :
                "var(--color--pink-3) 3px solid")) :
            "none"};
`;

const handleClick = () => {
    console.log("Button clicked!");
};

function Container({ color = "pink", outline = true, height = 280, width = 300, children }: { color?: string; outline?: boolean; height?: number; width?: number; children?: React.ReactNode }) {
    return (
        <StyledContainer color={color} $hasOutline={outline} height={height} width={width}>
            {children}
        </StyledContainer>
    );
}

export default Container;