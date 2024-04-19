import styled from 'styled-components';
import Button from './Buttons';
import Container from './Container';
import Address from './Address';
import Score from './Score';

export const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    `

function ScoreContainer({ score = "42", street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink", buttonText = "View results", outline = false, onClick = () => { } }) {
    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
                <Score color={color} score={score}></Score>
                <Address color={color} street={street} zip={zip} city={city}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default ScoreContainer;