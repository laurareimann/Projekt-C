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
    gap: 16px;
    align-items: center;
    text-align: -webkit-center;
    padding: 16px;

    `



function RoutesContainer({street = "", zip="", city="", score="", color = "pink", buttonText = "View results", onClick = () => { }}) {
    return (
        <Container color={color}>
            <ContainerContentWrapper>
                <Score color={color} score={score}></Score>
                <Address color={color} street={street} zip={zip} city={city}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default RoutesContainer;