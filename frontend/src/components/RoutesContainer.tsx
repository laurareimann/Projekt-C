/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './buttons/Buttons';
import Container from './Container';
import Address from './Address';
import Score from './Score';
import Name from './Name';
import Title from './Title';

const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    text-align: -webkit-center;
    padding: 16px;
    width: 300px;
    height: 280px;
    `


function RoutesContainer({street = "", zip="", city="", score="",name="", color = "pink", buttonText = "View Route", onClick = () => { }, title = ""}) {
    return (
        <Container color={color} outline={false}>
            <ContainerContentWrapper>
                <Title title = {title}></Title>
                <Name name={name}></Name>
                <Score color={color} score={score}></Score>
                <Address color={color} street={street} zip={zip} city={city}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default RoutesContainer;