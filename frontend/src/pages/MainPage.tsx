/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import { ToastContainer } from 'react-toastify';
import FilterOverlay from '../components/filterComponents/FilterOverlay.tsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const BlockContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    @media (max-width: 550px) {
        flex-direction: column;
    }
`;

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    const handleClick = () => {
            navigate('/Evaluation'); // Für den Button spezifisch. War mir nicht ganz sicher, ob das auch ander geht.
  };

    return (
        <>
            <h1>15 Minute City Calculator</h1>
            <StreetProvider
                cityValue="Hamburg"
                streetNameValue='Finkenau 35'
                zipCodeValue='22081'
                currentNearbyValue={[{ lat: 53.5688823, lng: 10.0330191 }]}
                currentScoreValue='5'>
                <Map
                    shouldRenderCircles={true}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                />
                <BlockContainer>
                    <ScoreContainer color='blue' onClick={handleClick}></ScoreContainer>
                    <QuizContainer color='pink'></QuizContainer>
                </BlockContainer>
            </StreetProvider>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default HomePage;