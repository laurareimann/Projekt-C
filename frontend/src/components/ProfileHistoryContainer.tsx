import styled from 'styled-components';
import Button from './buttons/Buttons';
import Container from './Container';
import Address from './Address';


const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: -webkit-center;
    padding: 16px;

    `




function ProfileHistoryContainer({street ="",  color = "pink", buttonText = "View results", outline = false}) {
    

    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
                <Address color={color} street={street}></Address>
                <Button color={color}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default ProfileHistoryContainer;