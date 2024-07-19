
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import MapWithoutSearch from '../components/mapComponents/mapWithoutSearch.tsx';
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import DropDownLanguage, { chosenLanguage } from '../components/languageDropdownButton';

const TestSite: React.FC = () => {
    return (
        <div>
            <h1>15 Minute City Calculator</h1>
            <p>Enter an address to find out, if it is part of the 15 minute city.</p>
            <StreetProvider cityValue="Hamburg" currentScoreValue='42' streetNameValue='Finkenau 35' zipCodeValue='22081' currentNearbyValue={[{lat:53.5688823,lng:10.0330191}]}>
                <Map 
                shouldRenderCircles={true}
                circleRadii={[1250, 2500, 3750]}
                circleColors={['green', 'yellow', 'red']} 
                />
                <MapWithoutSearch
                    center={{ lat: 53.5688823, lng: 10.0330191 }}
                    shouldRenderCircles={true}
                    circleRadii={[1250, 2500, 3750]}
                    circleColors={['green', 'yellow', 'red']}
                />
                <ScoreContainer color='blue'></ScoreContainer>
                <QuizContainer color='pink'></QuizContainer>
            </StreetProvider>

            <DropDownLanguage options={["Deutsch", "Englisch"]} category='Language'></DropDownLanguage>



            <ToastContainer></ToastContainer>
        </div>
    );
};
export default TestSite;