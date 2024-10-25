import styled from 'styled-components';

const ScoreWrapper = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    
`

function Title({title = "Groceries" }) {

    return (
        <ScoreWrapper>
            <p><b><u>{title}</u></b></p>
        </ScoreWrapper>
    );
}

export default Title;