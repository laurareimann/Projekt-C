/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';


// Components
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Button from '../components/buttons/Buttons.tsx';
import MapWithoutSearch from '../components/mapComponents/mapWithoutSearch.tsx';
import ResultContainer from '../components/ResultContainer.tsx';
import AddressData from '../../ValuesForDetailedResult.json';
import RoutesMap from '../components/mapComponents/RoutesMap.tsx';


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

const HorizontalGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 15px;
place-items:center;
@media (max-width: 768px) {
    grid-template-columns: 1fr;
    place-items: unset;
}
 `

const DiagrammContainer = styled.div`
  width: 50vh;
  height: 50vh;
  border: 4px solid var(--color--pink-3);
  border-radius: 20px;
  display:grid;
  @media (max-width: 768px){
    width: 40vh;
  }
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
    const [buttonState, setButtonState] = React.useState([true, false]);

  
    const ScoreTab = () =>  <div> 
                                <HorizontalGrid>
                                    <MapWithoutSearch
                                        shouldRenderCircles={true}
                                        circleRadii={[1250, 2500, 3750]}
                                        circleColors={['green', 'yellow', 'red']}
                                        height='50vh'
                                        width='50vh'
                                    />
                                    <DiagrammContainer></DiagrammContainer>
                                </HorizontalGrid> 
                            </div>;
    
    const RoutesTab = () => <div>
                                <RoutesMap></RoutesMap>
                            </div>;


    return (
        <div>
            <ContentWrapper>

            <h1>Detailed Results</h1>

            <ResultContainer    
                    score={AddressData.currentScoreValue.toString()}
                    street={AddressData.currentStartAddress.split(",")[0]}
                    zip={AddressData.currentStartAddress.split(",")[1].split(" ")[1]}
                    city={AddressData.currentStartAddress.split(",")[1].split(" ")[2]}
                    >
            </ResultContainer>

            <ButtonGrid>
                <Button onClick={() => {setContent("overallScore"), setButtonState([true, false])}}
                        disabled={buttonState[0]}> Results </Button>
                <Button onClick={() => {setContent("routes"), setButtonState([false, true])}}
                        disabled={buttonState[1]}> Routes </Button>
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