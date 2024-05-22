import React from 'react';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import FilterContainer from '../components/filterComponents/FilterContainer.tsx';

const HomePage: React.FC = () => {
    return (
        <>
            <h1>15 Minute City Calculator</h1>
            <p>Enter an address to find out, if it is part of the 15 minute city.</p>
            <StreetProvider value="Finkenau 35, 22081 Hamburg">
                <Map />
                <ScoreContainer color='blue'></ScoreContainer>
                <QuizContainer color='pink'></QuizContainer>
            </StreetProvider>
        </>
    );
};


// Funktionen und Styling
export const handleClick = () => {
    console.log("Button clicked!");
};

export default HomePage;