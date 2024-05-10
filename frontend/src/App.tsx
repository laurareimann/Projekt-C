/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import './App.css' // Ist momentan vielleicht noch bisschen unübersichtlich vom css her, da aus dieser datei ja auch design änderungen kommen
import { createGlobalStyle } from "styled-components";

import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Buttons';
import GlassButton from './components/GlassButtons';
import BlurButton from './components/BlurButtons';
import Location from './components/Location';
import Result from './components/Result';
import Input from './components/Inputforms';
import ScoreContainer from './components/ScoreContainer';
import QuizContainer from './components/QuizContainer';


//pages
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs";



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
    
    --color--pink-0: #FFECF8;
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
    --color--disabled-gray: #73818E;
    }

  body {
    background-color: var(--color--white-shade);
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
  }

  // typography
  h1 {
  color: var(--color--blue-5);
  line-height: 3.5rem;
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
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
  font-size: 1.5rem;
  font-weight: 600;
}
p {
  line-height: 1.5rem;
  font-size: 1.125rem;
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
const ContentContainer = styled.main`
  padding: 40px 0;
  margin: 0;
  max-width: 1040px;
  text-align: start;
  
`;


const ButtonGrid = styled.div`
display: grid;
grid-gap: 12px;
`

const ContainerGrid = styled.div`
display: flex;
flex-wrap: wrap;
gap:12px;
  
`
export const handleClick = () => {
  console.log("Button clicked!");
};

const InputGrid = styled.div`
display: grid;
grid-gap: 12px;
`

const App: React.FC = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <GlobalStyle />

        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="about-us" element={<AboutUs />} />
            /*hier alle Seiten anlegen */
          </Routes>
        </BrowserRouter >

      </ContentContainer>

      <Footer />
    </>
  )
}

export default App
