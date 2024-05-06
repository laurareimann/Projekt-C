/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Location from './Location';
import Score from './Score';
import Button from './Buttons';
import ScoreContainer from './ScoreContainer';
import { useContext, useState } from 'react';
import { useStreetName } from './mapComponents/StreetProvider';


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
 @media (max-width: 768px) {
        display: none;
    }
`;




function Result({ children = '', score="42", street="" , zip = "", city = "", color = "pink", buttonText = "View results", outline = true, onClick = () => { } }) {
    
    //Context der Straßenvariable wird übernommen. Ist vorerst die gesamte Adresse, aber ich gucke, ob sich das eventuell in Straße und Stadt+Postleitzahl aufteilen lässt
    const customStreet = useStreetName();


    return (
        <ResultWrapper>
            <DesktopWrapper>
                <Location color={color} street = {customStreet} zip={zip} city={city}>{children}</Location>
                <ScoreWrapper>
                    <Score score="42"></Score>
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