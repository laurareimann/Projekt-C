
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import DropDownLanguage, {chosenLanguage} from '../components/languageDropdownButton';

const TestSite: React.FC = () => {
    return (
        <div>
            <h1>15 Minute City Calculator</h1>
            <p>Enter an address to find out, if it is part of the 15 minute city.</p>
            <StreetProvider cityValue = "Hamburg" streetNameValue='Finkenau 35' zipCodeValue='22081'>   
            <Map />
            <ScoreContainer color='blue'></ScoreContainer>
            <QuizContainer color='pink'></QuizContainer>
            </StreetProvider>

            <DropDownLanguage options={["deutsch", "englisch", "Suppe"]} category='Language'></DropDownLanguage>
            
                    

        <ToastContainer></ToastContainer>
        </div>
    );
};
export default TestSite;