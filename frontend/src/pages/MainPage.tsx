/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
//import styled from 'styled-components';
import Map from "../components/mapComponents/map.tsx";
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';

// Components
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import { ToastContainer } from 'react-toastify';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>15 Minute City Calculator</h1>
            <p>Enter an address to find out, if it is part of the 15 minute city.</p>
            <StreetProvider cityValue = "Hamburg" streetNameValue='Finkenau 35' zipCodeValue='22081'>   
            <Map />
            <ScoreContainer color='blue'></ScoreContainer>
            <QuizContainer color='pink'></QuizContainer>
            </StreetProvider>
            {/* 
                    <InputGrid>
                        <Result color='pink'>HAW Finkenau</Result>
                        <Location color='pink'>HAW Finkenau</Location>
                        <Input disabled={true}></Input>
                        <Input></Input>
                        <Input isValid={false}></Input>
                    </InputGrid>
                    <ButtonGrid>
                        <ContainerGrid>
                            <ScoreContainer color='blue'></ScoreContainer>
                            <ScoreContainer color='green'></ScoreContainer>
                            <ScoreContainer color='pink'></ScoreContainer>
                        </ContainerGrid>
                        <ContainerGrid>
                            <QuizContainer color='blue'></QuizContainer>
                            <QuizContainer color='green'></QuizContainer>
                            <QuizContainer color='pink'></QuizContainer>
                        </ContainerGrid>
                    </ButtonGrid>
                    <ButtonGrid>
                        <Button color='blue' onClick={handleClick}>NORMAL blue</Button>
                        <Button color='green' onClick={handleClick}>NORMAL green</Button>
                        <Button color='pink' onClick={handleClick}>NORMAL pink</Button>
                        <Button color='blue' disabled={true}>NORMAL blue disabled</Button>
                        <Button color='green' disabled={true}>NORMAL green disabled</Button>
                        <Button color='pink' disabled={true}>NORMAL pink disabled</Button>
                        <GlassButton color='blue' onClick={handleClick}>Glass Button blue</GlassButton>
                        <GlassButton color='green' onClick={handleClick}>Glass Button green</GlassButton>
                        <GlassButton color='pink' onClick={handleClick}>Glass Button pink</GlassButton>
                        <BlurButton color='blue' onClick={handleClick}>Blur Button Blue</BlurButton>
                        <BlurButton color='green' onClick={handleClick}>Blur Button Green</BlurButton>
                        <BlurButton color='pink' onClick={handleClick}>Blur Button Pink</BlurButton>
                    </ButtonGrid>
                    <h1>
                        15-Minuten Stadt für Project C
                    </h1>
                    <h1>h1</h1>
                    <h2>h2</h2>
                    <h3>h3</h3>
                    <ColoredParagrpah color="var(--color--blue-1)">blue-1</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--blue-2)">blue-2</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--blue-3)">blue-3</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--blue-4)">blue-4</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--blue-5)">blue-5</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--green-1)">green-1</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--green-2)">green-2</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--green-3)">green-3</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--green-4)">green-4</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--green-5)">green-5</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--pink-1)">pink-1</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--pink-2)">pink-2</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--pink-3)">pink-3</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--pink-4)">pink-4</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--pink-5)">pink-5</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--error-red-light)">error-red-light</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--error-red-mid)">error-red-mid</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--error-red)">error-red</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--success-green-light)">success-green-light</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--success-green-mid)">success-green-mid</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--success-green)">success-green</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--white-shade)">white-shade</ColoredParagrpah>
                    <ColoredParagrpah color="var(--color--black-shade)">black-shade</ColoredParagrpah> */}

        <ToastContainer></ToastContainer>
        </div>
    );
};


/* Funktionen und Styling
const ButtonGrid = styled.div`
display: grid;
grid-gap: 12px;
`

const ContainerGrid = styled.div`
display: flex;
flex-wrap: wrap;
gap:12px; 
`

const InputGrid = styled.div`
display: grid;
grid-gap: 12px;
`

export const handleClick = () => {
    console.log("Button clicked!");
};

const ColoredString = styled.p<{ color: string }>`
  color: ${(props) => props.color};
`;

const ColoredParagrpah: React.FC<MyComponentProps> = ({ color, children }) => {
    return <ColoredString color={color}>{children}</ColoredString>;
};

interface MyComponentProps {
    color: string;
    children: React.ReactNode;
}
*/

export default HomePage;