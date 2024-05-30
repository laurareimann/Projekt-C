/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './buttons/Buttons';
import Container from './Container';
import Address from './Address';
import Score from './Score';
import { useStreetNameNew,useZipCodeNew,useCityNew } from './mapComponents/StreetProvider';

const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: -webkit-center;
    padding: 16px;

    `

function ScoreContainer({ score = "42", color = "pink", buttonText = "View results", outline = false, onClick = () => { } }) {
    
    const customStreet = useStreetNameNew().streetName;
    const customZip = useZipCodeNew().zipCode;
    const customCity = useCityNew().currentCity;
    
    

    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
                <Score color={color} score={score}></Score>
                <Address color={color} street={customStreet} zip={customZip} city={customCity}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default ScoreContainer;