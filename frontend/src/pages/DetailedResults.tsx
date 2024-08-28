/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Button from '../components/buttons/Buttons.tsx';
import MapWithoutSearch from '../components/mapComponents/mapWithoutSearch.tsx';
import { latLngEquals } from '@vis.gl/react-google-maps';
import ResultContainer from '../components/ResultContainer.tsx';
import ScoreContainer from '../components/ScoreContainer.tsx';

const ButtonGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:420px;
grid-template-columns: 1fr 1fr;
margin-bottom: 20px;
margin-top: 20px;
@media (max-width: 768px) {
    width: 100%
}
`

const MapAndPrioGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 15px;
place-items:center;
@media (max-width: 768px) {
    grid-template-columns: 1fr;
    place-items: unset;
}
 `

const ScoreContainerGrid = styled.div`
display: grid;
grid-gap: 15px;
place-items:center;
grid-template-columns: 1fr 1fr 1fr;
margin-bottom: 10px;
@media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`

const DiagrammContainer = styled.div`
  width: 40vh;
  height: 50vh;
  border: 4px solid var(--color--pink-3);
  border-radius: 20px;
  display:grid;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
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
                                        height='50vh'
                                        width='50vh'
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
            <ContentWrapper>

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
            </ContentWrapper>
        </div>
    );
};
export default Evaluation;