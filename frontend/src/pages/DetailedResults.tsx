/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import Container from '../components/Container.tsx';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Button from '../components/Buttons.tsx';
import MapWithoutSearch from '../components/mapComponents/mapWithoutSearch.tsx';
import { latLngEquals } from '@vis.gl/react-google-maps';

// Define the types for the props
interface HorizontalContainerProps {
    gap: string;
}

const HorizontalContainer = styled.div<HorizontalContainerProps>`
    display: flex;
    flex-direction: row;
    //align-items: center;// Adjust as needed
    justify-content: center;
    gap: ${(props) => props.gap};
    padding: 0.5em;
`;

const Evaluation: React.FC = () => {
    return (
        <div>
            <h1>Detailed Results</h1>
            <HorizontalContainer gap='60px'>
                <Button>Overall Score</Button>
                <Button disabled={true}>Routes</Button>
            </HorizontalContainer>
            
            <HorizontalContainer gap='60px'>
                <MapWithoutSearch
                    center={{ lat: 53.5688823, lng: 10.0330191 }}
                    shouldRenderCircles={false}
                    height='500px'
                    width='200px'
                />
            <Container height = {300} width={20}></Container>
                {/* <MapWithoutSearch center={{ lat: 53.5688823, lng: 10.0330191 }} shouldRenderCircles={false}/> 
                
                 */}
            </HorizontalContainer>
           
        <ToastContainer></ToastContainer>
        </div>
    );
};
export default Evaluation;