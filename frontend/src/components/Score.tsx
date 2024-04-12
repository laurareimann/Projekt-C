import styled from 'styled-components';

export const ScoreWrapper = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    color: ${({ color }) =>
        color === "blue" ? "var(--color--blue-5)"
            : color === "green" ? "var(--color--green-5)"
                : "var(--color--pink-5)"};
    
    > div { 
        font-size: 1rem;
    }
`

function Score({ color = 'pink', score = "42" }) {
    return (
        <ScoreWrapper color ={color}>
            <h4>{score}</h4>
            <h5>min</h5>
        </ScoreWrapper>
    );
}

export default Score;