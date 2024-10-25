import styled from 'styled-components';

const ScoreWrapper = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    color: ${({ color }) =>
        color === "blue" ? "var(--color--blue-5)"
            : color === "green" ? "var(--color--green-5)"
                :color === "yellow" ? "var(--color--yellow-5)"
                : "var(--color--pink-5)"};
    
`

const H2 = styled.div`
    font-size: 3rem;
    font-weight: 500;
    line-height: 2.5rem;
`

function Score({ color = 'pink', score = "42" }) {
    return (
        <ScoreWrapper color ={color}>
            <H2>{score}</H2>
            <h5>min</h5>
        </ScoreWrapper>
    );
}

export default Score;