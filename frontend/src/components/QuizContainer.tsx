/* eslint-disable @typescript-eslint/no-unused-vars */
//Die line wurde hinzugefügt, weil Score und MapPointIcon laut VSC nicht verwendet werden
import styled from 'styled-components';
import Button from './Buttons';
import Container from './Container';
import Address from './Address';
//import { ContainerContentWrapper } from './ScoreContainer';

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

function QuizContainer({street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink", buttonText = "Start quiz", outline = true, onClick = () => { } }) {
    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
                <h2>Quiz</h2>
                <p>Take our Quiz to personalize your results!</p>
                <Address color={color} street={street} zip={zip} city={city}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default QuizContainer;