/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './buttons/Buttons';
import Container from './Container';
import Address from './Address';
import { useStreetNameNew,useZipCodeNew,useCityNew } from './mapComponents/StreetProvider';

const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    `

const Score = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    
    > div { 
        font-size: 1rem;
    }
`

const MapPointIcon = styled.img`
  width: 40px;
  height: 40px;
  alt: "Map Point Icon";
`;

function QuizContainer({color = "pink", buttonText = "Start quiz", outline = true, onClick = () => { } }) {
    const customStreet = useStreetNameNew().streetName;
    const customZip = useZipCodeNew().zipCode;
    const customCity = useCityNew().currentCity;
    
    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
                <h2>Quiz</h2>
                <p>Take our Quiz to personalize your results!</p>
                <Address color={color} street={customStreet} zip={customZip} city={customCity}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default QuizContainer;