/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './buttons/Buttons';
import Container from './Container';
import Address from './Address';
import Score from './Score';
import { useStreetNameNew,useZipCodeNew,useCityNew, useScore } from './mapComponents/StreetProvider';

const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    text-align: -webkit-center;
    `

function ScoreContainer({color = "pink", buttonText = "View results", outline = false, onClick = () => { } }) {
    
    const customStreet = useStreetNameNew().streetName;
    const customZip = useZipCodeNew().zipCode;
    const customCity = useCityNew().currentCity;
    const customScore = useScore().currentScore;
    
    

    return (
        <Container color={color} outline={outline} height={210} width={220}>
            <ContainerContentWrapper>
                <Score color={color} score={customScore}></Score>
                <Address color={color} street={customStreet} zip={customZip} city={customCity}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default ScoreContainer;