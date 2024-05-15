/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import './App.css' // Ist momentan vielleicht noch bisschen unübersichtlich vom css her, da aus dieser datei ja auch design änderungen kommen
import { createGlobalStyle } from "styled-components";
import Footer from './components/Footer';
import Button from './components/Buttons';
import GlassButton from './components/GlassButtons';
import BlurButton from './components/BlurButtons';
import ScoreContainer from './components/ScoreContainer';
import QuizContainer from './components/QuizContainer';
import DropDownLanguage, {chosenLanguage } from './components/languageDropdownButton';


interface MyComponentProps {
  color: string;
  children: React.ReactNode;
}


export const GlobalStyle = createGlobalStyle`
  :root {
    
    // color palette
    // double dashes are a naming convention often used to create reusable and easily identifiable custom properties for styling purposes in web development
    --color--blue-1: #C5CAFC;
    --color--blue-2: #8B96F9;
    --color--blue-3: #3D50F5;
    --color--blue-4: #0B1FD5;
    --color--blue-5: #050E61;

    --color--green-1: #9AD5CE;
    --color--green-2: #48ADA1;
    --color--green-3: #30736B;
    --color--green-4: #1E4843;
    --color--green-5: #122B28;
    
    --color--pink-1: #FFC2EA;
    --color--pink-2: #FF47C2;
    --color--pink-3: #B8007A;
    --color--pink-4: #660044;
    --color--pink-5: #3D0029;

    // additional colors
    --color--error-red-light: #FFF0F1;
    --color--error-red-mid: #FA8686;
    --color--error-red: #EE1D36;
    --color--success-green-light: #EFFDF6;
    --color--success-green-mid: #7FF0B8;
    --color--success-green: #17C970;
    --color--white-shade: #ffffff;
    --color--black-shade: #000000;
  }

  body {
    background-color: var(--color--white-shade);
    min-height: 100vh;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }

  // typography
  h1 {
  color: var(--color--blue-5);
  line-height: 3.5rem;
  font-size: 3rem;
  font-weight: 600;
}
  h2 {
  color: var(--color--blue-5);
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  margin:0;
}
  h3 {
  color: var(--color--blue-5);
  line-height: 2rem;
  font-size: 1.25rem;
  font-weight: 500;
}
  p {
  line-height: 1.5rem;
  font-size: 1.25rem;
  font-weight: 400;
  margin:0;
}
//big text
h4{
  line-height: 0.8;
  font-size: 6.25rem;
  font-weight: 600;
  margin:0;
}

//tiny text
h5{
  font-size: 1rem;
  margin:0;
}
`;

const ColoredString = styled.p<{ color: string }>`
  color: ${(props) => props.color};
`;

const ColoredParagrpah: React.FC<MyComponentProps> = ({ color, children }) => {
  return <ColoredString color={color}>{children}</ColoredString>;
};


// Weiß nicht ob der Container wirklich nötig ist aber für Ordnung ganz gut
// Mein Footer wollte bloß nicht so wie ich wollte am Anfang
const MainContainer = styled.main`
  margin: 0;
`;


const ButtonGrid = styled.div`
display: grid;
grid-gap: 12px;
`

const ContainerGrid = styled.div`
display: flex;
gap:12px;
`

const handleClick = () => {
  console.log("Button clicked!");
};

function App() {

  return (
    <div>

      <MainContainer>
        <GlobalStyle />
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
        <ColoredParagrpah color="var(--color--black-shade)">black-shade</ColoredParagrpah>

        Select a Language
        <DropDownLanguage options={["English", "Deutsch", "Dansk", "Soup"] }/> 

      </MainContainer>
    
      <Footer />
      
    </div>
  
  )
  
}

export default App

