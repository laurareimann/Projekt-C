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
import ScoreContainer from '../components/ScoreContainer.tsx';
import {ScrollView} from 'react-native';

// Define the types for the props
interface HorizontalContainerProps {
    gap: string;
}

const ButtonGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:420px;
grid-template-columns: 1fr 1fr;
margin-bottom: 10px;
margin-top: 20px;
`

const MapAndPrioGrid = styled.div`
display: grid;
grid-gap: 15px;
place-items:center;
width:1000px;
grid-template-columns: 1fr 1fr;
margin-bottom: 10px;
`
const ScoreContainerGrid = styled.div`
display: grid;
grid-gap: 15px;
place-items:center;
width:1000px;
grid-template-columns: 1fr 1fr 1fr;
margin-bottom: 10px;
padding-top: 10px;
`

const DiagrammContainer = styled.div`
  width: 40vh;
  height: 50vh;
  border: 4px solid var(--color--pink-3);
  border-radius: 20px;
  display:grid;
`

const Evaluation: React.FC = () => {  
    
    const [content, setContent] = React.useState("overallScore");
  
    const ScoreTab = () =>  <div> 
                                <MapAndPrioGrid>
                                    <MapWithoutSearch
                                        center={{ lat: 53.5688823, lng: 10.0330191 }}
                                        shouldRenderCircles={false}
                                        circleRadii={[1250, 2500, 3750]}
                                        circleColors={['green', 'yellow', 'red']}
                                    />

                                    <DiagrammContainer></DiagrammContainer>
                                </MapAndPrioGrid> 
                            </div>;
    
    const RoutesTab = () => <div>
                                <ScoreContainerGrid>
                                    <ScoreContainer buttonText='Show Route'></ScoreContainer>
                                    <ScoreContainer buttonText='Show Route'></ScoreContainer>
                                    <ScoreContainer buttonText='Show Route'></ScoreContainer>
                                </ScoreContainerGrid>
                            
                                <MapWithoutSearch
                                    center={{ lat: 53.5688823, lng: 10.0330191 }}
                                    shouldRenderCircles={false}
                                    circleRadii={[1250, 2500, 3750]}
                                    circleColors={['green', 'yellow', 'red']}
                                    height='30vh'
                                    width='107vh'
                                />
                            </div>;

    return (
        <div>
            <h1>Detailed Results</h1>

            <ResultContainer></ResultContainer>

            <ButtonGrid>
                <Button onClick={() => setContent("overallScore")}> Overall Score </Button>
                <Button onClick={() => setContent("routes")}> Routes </Button>
            </ButtonGrid>
            
            <div>
                {content === "overallScore" && <ScoreTab/>}
                {content === "routes" && <RoutesTab/>}
            </div>

            <ToastContainer></ToastContainer>
        </div>
    );
};
export default Evaluation;