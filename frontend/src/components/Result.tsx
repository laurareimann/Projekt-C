import styled from 'styled-components';
import Location from './Location';
import Score from './Score';
import Button from './buttons/Buttons';
import ScoreContainer from './ScoreContainer';
import { useStreetNameNew, useZipCodeNew, useCityNew } from './mapComponents/StreetProvider';


const ResultWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    border-radius: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
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

const DesktopWrapper = styled.div<{ $hasOutline: boolean; color: string }>`
display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 24px;
    border-radius: 30px;
    border: ${({ $hasOutline, color }) =>
        $hasOutline ? (color === "blue" ? "var(--color--blue-3) 3px solid" :
            (color === "green" ? "var(--color--green-3) 3px solid" :
                "var(--color--pink-3) 3px solid")) :
            "none"};
    background-color: ${({ $hasOutline, color }) =>
        $hasOutline ? "var(--color--white)" : (
            {
                blue: "var(--color--blue-0)",
                green: "var(--color--green-0)",
                pink: "var(--color--pink-0)",
                none: "var(--color--white)"
            }[color] || "var(--color--white)"
        )};
 @media (max-width: 768px) {
        display: none;
    }
`;
const LocationWrapper = styled.div`
    width: 100%;
`;


function Result({ children = '', score = "42", color = "pink", buttonText = "View results", outline = false, onClick = () => { } }) {

    //Einzelteile der Adresse, damit diese korrekt formatiert angezeigt wird
    const customStreet = useStreetNameNew();
    const customZip = useZipCodeNew();
    const customCity = useCityNew();

    //Musste hier etwas aufräumen, weil die Eingaben im ScoreContainer und Result nicht gematched haben und Typescript meckert, wenn ungenutzte Variablen genutzt werden
    //I.e. man kann damit nicht npm run build aufrufen, ohne build errors zu bekommen
    return (
        <ResultWrapper>
            <DesktopWrapper color={color} $hasOutline={outline}>
                <LocationWrapper>
                    <Location color={color} outline={!outline} street={customStreet.streetName} zip={customZip.zipCode} city={customCity.currentCity}>{children}</Location>
                </LocationWrapper>
                <ScoreWrapper>
                    <Score score={score} color={color}></Score>
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