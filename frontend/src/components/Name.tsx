import styled from 'styled-components';

const ScoreWrapper = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    
`

function Score({name = "HAW Hamburg" }) {

    if(name.length >= 60){
        name = name.substring(0, 56) + '\u2026'
    }

    return (
        <ScoreWrapper>
            <p><b>{name}</b></p>
        </ScoreWrapper>
    );
}

export default Score;