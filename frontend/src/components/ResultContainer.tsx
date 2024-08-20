/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Button from './Buttons';
import Container from './Container';
import Address from './Address';
import Score from './Score';
import { useStreetNameNew,useZipCodeNew,useCityNew, useScore } from './mapComponents/StreetProvider';
import MapWithoutSearch from './mapComponents/mapWithoutSearch';

const ResultContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
    gap: 32px;
    align-items: center;
    text-align: -webkit-center;
    padding: 10px;
    border-radius: 26px;
    background-color: #FFECF8;
    pointer-events: none; //Soll ja wie Screenshot sein?
`
const MapAndPrioGrid = styled.div`
    display: grid;
    grid-gap: 15px;
    place-items:center;
    width:1000px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 10px;
`

function ScoreContainer({color = "pink"}) {
    
    const customStreet = useStreetNameNew().streetName;
    const customZip = useZipCodeNew().zipCode;
    const customCity = useCityNew().currentCity;
    const customScore = useScore().currentScore;
    
    

    return (
        <ResultContainer>
            <MapWithoutSearch
                    center={{ lat: 53.5688823, lng: 10.0330191 }}
                    shouldRenderCircles={false}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                    height='14vh'
                    width='20vh'
                />
                <Address color={color} street={customStreet} zip={customZip} city={customCity}></Address>
                <Score color={color} score={customScore}></Score>
            </ResultContainer>
    );
}

export default ScoreContainer;

