import styled from 'styled-components';
import Location from './Location';
import Score from './Score';
import Button from './Buttons';
import ScoreContainer from './ScoreContainer';
import { useStreetNameNew,useZipCodeNew,useCityNew } from './mapComponents/StreetProvider';


const ResultWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    background-color: var(--color--pink-0);
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
    padding: 24px;
 @media (max-width: 768px) {
        display: none;
    }
`;


function Result({ children = '', score="42", color = "pink", buttonText = "View results", outline = true, onClick = () => { } }) {
    
    //Einzelteile der Adresse, damit diese korrekt formatiert angezeigt wird
    const customStreet = useStreetNameNew();
    const customZip = useZipCodeNew();
    const customCity = useCityNew();


    //Musste hier etwas aufräumen, weil die Eingaben im ScoreContainer und Result nicht gematched haben und Typescript meckert, wenn ungenutzte Variablen genutzt werden
    //I.e. man kann damit nicht npm run build aufrufen, ohne build errors zu bekommen
    return (
        <ResultWrapper>
            <DesktopWrapper>
                <Location color={color} street = {customStreet.streetName}  zip={customZip.zipCode} city={customCity.currentCity}>{children}</Location>
                <ScoreWrapper>
                    <Score score="42"></Score>
                    <Button color={color} onClick={onClick}>View Result</Button>
                </ScoreWrapper>
            </DesktopWrapper>
            <MobileWrapper>
                <ScoreContainer color={color} score={score} buttonText={buttonText} outline={outline} onClick={onClick}></ScoreContainer>
            </MobileWrapper>
        </ResultWrapper>
    );
}

export default Result;