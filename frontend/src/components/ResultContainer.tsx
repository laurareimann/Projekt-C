/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './Buttons';
import Container from './Container';
import Address from './Address';
import Score from './Score';
import { useStreetNameNew,useZipCodeNew,useCityNew, useScore } from './mapComponents/StreetProvider';
import MapWithoutSearch from './mapComponents/mapWithoutSearch';

const ContainerContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: -webkit-center;
    padding: 16px;

    `

function ScoreContainer({color = "pink", buttonText = "View results", outline = false, onClick = () => { } }) {
    
    const customStreet = useStreetNameNew().streetName;
    const customZip = useZipCodeNew().zipCode;
    const customCity = useCityNew().currentCity;
    const customScore = useScore().currentScore;
    
    

    return (
        <Container color={color} outline={outline}>
            <ContainerContentWrapper>
            <MapWithoutSearch
                    center={{ lat: 53.5688823, lng: 10.0330191 }}
                    shouldRenderCircles={false}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                    height='20vh'
                    width='15vh'
                />
                <Score color={color} score={customScore}></Score>
                <Address color={color} street={customStreet} zip={customZip} city={customCity}></Address>
                <Button color={color} onClick={onClick}>{buttonText}</Button>
            </ContainerContentWrapper>
        </Container>
    );
}

export default ScoreContainer;