/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import './App.css' // Ist momentan vielleicht noch bisschen unübersichtlich vom css her, da aus dieser datei ja auch design änderungen kommen
import { createGlobalStyle } from "styled-components";
import Header from './components/header&footer/Header.tsx';
import Footer from './components/header&footer/Footer.tsx';

//pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs";
import { useLoadScript } from '@react-google-maps/api';
import LogInPage from './pages/LogInPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import Test from './pages/Test.tsx';
import Terms from './pages/Terms.tsx';
import Privacy from './pages/Privacy.tsx';
import TheTeam from './pages/TheTeam.tsx';
import Concept from './pages/Concept.tsx';
import FAQ from './pages/FAQ.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

/*
export const StreetContext = React.createContext("preview Street");
export const StateContext  = React.createContext("preview State");
*/


interface MyComponentProps {
  color: string;
  children: React.ReactNode;
}


const GlobalStyle = createGlobalStyle`
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
    font-family: 'Roboto', sans-serif;
    margin: 0;  
  }

  // typography
  h1 {
  line-height: 3.5rem;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
}
h2 {
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 500;
  margin:0;
}
h3 {
  line-height: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  margin:0;

}
p {
  line-height: 1.5rem;
  font-size: 1.125rem;
  font-weight: 400;
  margin:0;
}
a {
  color: var(--color--blue-4);
  text-decoration: underline;
}
//big text
h4{
  line-height: 0.8;
  font-size: 6.25rem;
  font-weight: 500;
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

const MainContainer = styled.main`
  padding-top: 70px;
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

const InputGrid = styled.div`
display: grid;
grid-gap: 12px;
`


const App: React.FC = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ["places", "maps"],
  })

  //Hier könnte dein Ladebildschirm stehen ( ͡° ͜ʖ ͡° )
  if (!isLoaded) return <div>Loading</div>;

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>

        <Route index element={<Homepage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="test" element={<Test />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="team" element={<TheTeam />} />
        <Route path="concept" element={<Concept />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="profile-page" element={<ProfilePage />} />
            /*hier alle Seiten anlegen */
      </Routes>
      <Footer />
    </BrowserRouter >
  )
}


export default App;


/* React.Dom werden wir später brauchen. War in einem der Tutorials, dass ich zu Google Maps geguckt habe, deswegen lasse ich es bis dahin erstmal drinne.

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(<App />);
}
*/