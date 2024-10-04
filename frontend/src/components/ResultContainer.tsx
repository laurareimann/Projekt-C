/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Address from './Address';
import Score from './Score';
import MapWithoutSearch from './mapComponents/mapWithoutSearch';

const ResContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: fit-content;
    gap: 32px;
    align-items: center;
    text-align: -webkit-center;
    padding: 10px;
    border-radius: 26px;
    background-color: #FFECF8;
    pointer-events: none;
    @media (max-width: 768px){
        width: 90%;
        display: grid;
        grid-template-columns: max-content;
        padding-left: 12vh;
    }
`

function ResultContainer({street = "", zip="", city="", score="", color = "pink"}) {

    return (
        <ResContainer>
            <MapWithoutSearch
                    shouldRenderCircles={false}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                    shouldRenderMarkers = {false}
                    height='14vh'
                    width='20vh'
                />
                    <Address color={color} street={street} zip={zip} city={city}></Address>
                    <Score color={color} score={score}></Score>               
            </ResContainer>
    );
}

export default ResultContainer;

