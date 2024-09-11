import styled from 'styled-components';

const ScoreWrapper = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    
`

function Score({name = "HAW Hamburg" }) {
    return (
        <ScoreWrapper>
            <p><b>{name}</b></p>
        </ScoreWrapper>
    );
}

export default Score;