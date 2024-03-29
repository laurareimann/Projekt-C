import styled from 'styled-components';
import Button from './Buttons';
import Container from './Container';
import Address from './Address';

export const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
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

function ScoreContainer({ score = "42", street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink", buttonText = "View results", outline = false, onClick = () => { } }) {
    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
                <Score>
                    <h4>{score}</h4>
                    <h5>min</h5>
                </Score>
                <Address color={color} street={street} zip={zip} city={city}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default ScoreContainer;