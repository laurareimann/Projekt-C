/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Button from '../components/Buttons.tsx';
import MapWithoutSearch from '../components/mapComponents/mapWithoutSearch.tsx';
import { latLngEquals } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import ResultContainer from '../components/ResultContainer.tsx';

// Define the types for the props
interface HorizontalContainerProps {
    gap: string;
}

const HorizontalContainer = styled.div<HorizontalContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;// Adjust as needed
    justify-content: center;
    gap: ${(props) => props.gap};
    padding: 0.5em;
`;



const ButtonGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:420px;
grid-template-columns: 1fr 1fr;
margin-bottom: 10px;
`

const MapAndPrioGrid = styled.div`
display: grid;
grid-gap: 15px;
place-items:center;
width:1000px;
grid-template-columns: 1fr 1fr;
margin-bottom: 10px;
`

const DiagrammContainer = styled.div`
  width: 40vh;
  height: 50vh;
  border: 4px solid var(--color--pink-3);
  border-radius: 20px;
  display:grid;
`

const Evaluation: React.FC = () => {

    //const [tabState, setTab] = useState();
    return (
        <div>
            <h1>Detailed Results</h1>

            

            <ButtonGrid>
                <Button>Overall Score</Button>
                <Button>Routes</Button>
            </ButtonGrid>
            
            <MapAndPrioGrid>
                <MapWithoutSearch
                    center={{ lat: 53.5688823, lng: 10.0330191 }}
                    shouldRenderCircles={false}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                />

                <DiagrammContainer></DiagrammContainer>
            </MapAndPrioGrid>

        <ToastContainer></ToastContainer>
        </div>
    );
};
export default Evaluation;