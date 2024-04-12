import styled from 'styled-components';
import Location from './Location';
import Score from './Score';
import Button from './Buttons';
import ScoreContainer from './ScoreContainer';

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    background-color: var(--color--pink-0);
    padding: 24px;
    border-radius: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        background-color: var(--color--white-shade);
    }
`;

const ScoreWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: self-end;
`;

const MobileWrapper = styled.div`
display: block;
 @media (min-width: 768px) {
        display: none;
    }
`;

const DesktopWrapper = styled.div`
display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
 @media (max-width: 768px) {
        display: none;
    }
`;

function Result({ children = '', score = '42', street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink", buttonText = "View results", outline = true, onClick = () => { } }) {
    return (
        <ResultWrapper>
            <DesktopWrapper>
                <Location color={color} street={street} zip={zip} city={city}>{children}</Location>
                <ScoreWrapper>
                    <Score score={score}></Score>
                    <Button color={color} onClick={onClick}>View Result</Button>
                </ScoreWrapper>
            </DesktopWrapper>
            <MobileWrapper>
                <ScoreContainer color={color} score={score} street={street} zip={zip} city={city} buttonText={buttonText} outline={outline} onClick={onClick}></ScoreContainer>
            </MobileWrapper>
        </ResultWrapper>
    );
}

export default Result;