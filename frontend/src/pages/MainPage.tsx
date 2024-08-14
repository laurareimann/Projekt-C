/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import { ToastContainer } from 'react-toastify';
import FilterContainer from '../components/filterComponents/FilterContainer.tsx';
import { Button } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
        <>
            <h1>15 Minute City Calculator</h1>
            <p>Enter an address to find out, if it is part of the 15 minute city.</p>
            <StreetProvider cityValue="Hamburg" streetNameValue='Finkenau 35' zipCodeValue='22081'>
                <Map
                    shouldRenderCircles={true}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                />
                <ScoreContainer color='blue'></ScoreContainer>
                <QuizContainer color='pink'></QuizContainer>
            </StreetProvider>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default HomePage;