import styled from 'styled-components';

const ScoreWrapper = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: ${({ color }) => {
        switch (color) {
            case "blue":
                return "var(--color--blue-5)";
            case "green":
                return "var(--color--green-5)";
            case "pink":
            default:
                return "var(--color--pink-5)";
        }
    }};
    > div { 
        font-size: 1rem;
    }
`

function Score({ color = "pink", score = "42" }) {
    return (
        <ScoreWrapper color={color}>
            <h4>{score}</h4>
            <h5>min</h5>
        </ScoreWrapper>
    );
}

export default Score;