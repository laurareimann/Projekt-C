
/* eslint-disable @typescript-eslint/no-unused-vars */
//Stylesheets
import styled from 'styled-components';
import "../globals.css";
// Components
import Map from "../components/mapComponents/map.tsx";
import MapWithoutSearch from '../components/mapComponents/mapWithoutSearch.tsx';
import StreetProvider from '../components/mapComponents/StreetProvider.tsx';
import Button from '../components/buttons/Buttons.tsx';
import GlassButton from '../components/buttons/GlassButtons.tsx';
import BlurButton from '../components/buttons/Buttons.tsx';
import Location from '../components/Location';
import Result from '../components/Result';
import Input from '../components/Inputforms';
import ScoreContainer from '../components/ScoreContainer';
import QuizContainer from '../components/QuizContainer';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import React from 'react';
import Dropdown, { dropdownOptions } from '../components/Dropdown.tsx';
import Score from '../components/Score.tsx';
import Address from '../components/Address.tsx';


// Funktionen und Styling
const Column = styled.div`
display: grid;
grid-gap: 12px;
margin: 32px 0;
`

const Row = styled.div`
display: flex;
flex-wrap: wrap;
gap:24px; 
margin: 32px 0;
align-items: start;
`

const ButtonGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:420px;
grid-template-columns: 1fr 1fr 1fr 1fr;
margin-bottom: 10px;
`

const handleClick = () => {
    console.log("Button clicked!");
};

const ColoredString = styled.p<{ color: string }>`
  color: ${(props) => props.color};
`;

const ColoredParagraph: React.FC<MyComponentProps> = ({ color, children }) => {
    return <ColoredString color={color}>{children}</ColoredString>;
};

interface MyComponentProps {
    color: string;
    children: React.ReactNode;
}

const Test: React.FC = () => {
    return (
        <div>
            <h1>Components Overview</h1>
            <ToastContainer></ToastContainer>

            {/*
            Toast alert
            Types: toast.warn, toast.info, toast.error
            Variables: as listed in the example(hovering shows more information)
            */}

            <ButtonGrid>
            <Button onClick={()=>{
                toast.info("This is a toast", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }}>
                Toastify info
            </Button>
            <Button onClick={()=>{
                toast.error("This is a toast", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }}>
                Toastify error
            </Button>
            <Button onClick={()=>{
                toast.warning("This is a toast", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }}>
                Toastify warning
            </Button>
            </ButtonGrid>

            {/*
            Maps
            Types: Map, MapWithoutSearch
            Variables: shouldRenderCircles, circleRadii, circleColors
            shouldRenderCircles (Boolean): true, false
            circleRadii (Array): [1250, 2500, 3750]
            circleColors (Array): ['green', 'yellow', 'red']
            center  (Object): { lat: 53.5688823, lng: 10.0330191 }
            */}

                <StreetProvider currentNearbyValue={[{lat:53.5688823,lng:10.0330191}]} currentScoreValue='42' cityValue="Hamburg" streetNameValue='Finkenau 35' zipCodeValue='22081'>
                    <Map
                        shouldRenderCircles={true}
                        circleRadii={[1250, 2500, 3750]}
                        circleColors={['green', 'yellow', 'red']}
                    />
                </StreetProvider>
                <StreetProvider currentNearbyValue={[{lat:53.5688823,lng:10.0330191}]} currentScoreValue="42" cityValue="Hamburg" streetNameValue='Finkenau 35' zipCodeValue='22081'>
                    <MapWithoutSearch
                        shouldRenderCircles={true}
                        circleRadii={[1250, 2500, 3750]}
                        circleColors={['green', 'yellow', 'red']} 
                        center={{ lat: 53.5688823, lng: 10.0330191 }}
                        />
                </StreetProvider>

            {/*
            Dropdown
            Types: Dropdown
            Variables: options, placeholder
            Options (Array): ["eins","zwei"]
            Placeholder (String): 'Placehoder'
            */}
            <Column>
                <Dropdown options={["eins", "zwei"]} placeholder='Placehoder'></Dropdown>
            </Column>

            {/*
            Result with Location, Address and Score
            Types: Result, Address, Location, Score
            Variables: color, score, buttonText, outline, onClick
            Color (String): blue, green, pink
            Score (String): "42"
            ButtonText (String): "Results"
            Outline (Boolean): true, false
            onClick (Function): handleClick()
            */}
            <Column>
                <Row>
                    <Address color='pink' street='Finkenau 35' zip='22081' city='Hamburg'></Address>
                    <Address color='blue' street='Finkenau 35' zip='22081' city='Hamburg'></Address>
                    <Address color='green' street='Finkenau 35' zip='22081' city='Hamburg'></Address>
                </Row>
                <Row>
                    <Score color='pink' score='40'></Score>
                    <Score color='blue' score='40'></Score>
                    <Score color='green' score='40'></Score>
                </Row>
                <Row>
                    <Location color='pink'>HAW Finkenau</Location>
                    <Location color='blue'>HAW Finkenau</Location>
                    <Location color='green'>HAW Finkenau</Location>
                </Row>
            </Column>
            <Column>
                <Result color='pink' score='40' buttonText='Reults' outline={true} onClick={handleClick}>HAW Finkenau</Result>
                <Result color='pink' score='40' buttonText='Reults' outline={false} onClick={handleClick}>HAW Finkenau</Result>
                <Result color='blue' score='41' buttonText='Reults' outline={true} onClick={handleClick}>HAW Finkenau</Result>
                <Result color='blue' score='41' buttonText='Reults' outline={false} onClick={handleClick}>HAW Finkenau</Result>
                <Result color='green' score='42' buttonText='Reults' outline={true} onClick={handleClick}>HAW Finkenau</Result>
                <Result color='green' score='42' buttonText='Reults' outline={false} onClick={handleClick}>HAW Finkenau</Result>
            </Column>



            {/*
            Containers
            Types: ScoreContainer, QuizContainer
            Variables: color, score, buttonText, outline, onClick
            Color (String): blue, green, pink
            Score (String): "42"
            ButtonText (String): "Results"
            Outline (Boolean): true, false
            onClick (Function): handleClick()
             */}
            <Column>
                <Row>
                    <ScoreContainer color='blue' score='42' buttonText='Results' outline={false} onClick={handleClick}></ScoreContainer>
                    <ScoreContainer color='green'></ScoreContainer>
                    <ScoreContainer color='pink'></ScoreContainer>
                </Row>
                <Row>
                    <QuizContainer color='blue' buttonText='Results' outline={true} onClick={handleClick}></QuizContainer>
                    <QuizContainer color='green'></QuizContainer>
                    <QuizContainer color='pink'></QuizContainer>
                </Row>
            </Column>

            {/*
            Inputs
            Types: Input
            Variables: disabled, isValid, placeholder
            Disabled (Boolean): true, false
            isValid (Boolean): true, false
            placeholder (String): 'Custom Placeholder'
            */}
            <Row>
                <Column>
                    <Input placeholder='Custom Placeholder'></Input>
                    <Input disabled={true}></Input>
                    <Input isValid={false}></Input>
                </Column>
            </Row>

            {/*
            Buttons
            Types: Button, GlassButton, BlurButton (is not currently working, but not necessary for the project)
            Variables: color, onClick, disabled
            Color (String): blue, green, pink
            Disabled (Boolean): true, false
            onClick (Function): handleClick()
            */}
            <Row>
                <Column>
                    <Button color='blue' onClick={handleClick}>NORMAL blue</Button>
                    <Button color='green' onClick={handleClick}>NORMAL green</Button>
                    <Button color='pink' onClick={handleClick}>NORMAL pink</Button>
                </Column>
                <Column>
                    <Button color='blue' disabled={true}>NORMAL blue disabled</Button>
                    <Button color='green' disabled={true}>NORMAL green disabled</Button>
                    <Button color='pink' disabled={true}>NORMAL pink disabled</Button>
                </Column>
                <Column>
                    <GlassButton color='blue' onClick={handleClick}>Glass Button blue</GlassButton>
                    <GlassButton color='green' onClick={handleClick}>Glass Button green</GlassButton>
                    <GlassButton color='pink' onClick={handleClick}>Glass Button pink</GlassButton>
                </Column>
                <Column>
                    <BlurButton color='blue' onClick={handleClick}>Blur Button Blue</BlurButton>
                    <BlurButton color='green' onClick={handleClick}>Blur Button Green</BlurButton>
                    <BlurButton color='pink' onClick={handleClick}>Blur Button Pink</BlurButton>
                </Column>
            </Row>

            {/* 
            Fonts and Colors
            Types: h1, h2, h3, p
            colors:
            --color--blue-1: #E6F1FF;
            --color--blue-2: #B8D4FF;
            --color--blue-3: #8AB8FF;
            --color--blue-4: #5C9CFF;
            --color--blue-5: #2E80FF;
                
            --color--green-1: #E6FFFA;
            --color--green-2: #B8FFD4;
            --color--green-3: #8AFFB8;
            --color--green-4: #5CFF9C;
            --color--green-5: #2EFF80;

            --color--pink-1: #FFC2EA;
            --color--pink-2: #FF47C2;
            --color--pink-3: #B8007A;
            --color--pink-4: #660044;
            --color--pink-5: #3D0029;

            --color--error-red-light: #FFF0F1;
            --color--error-red-mid: #FA8686;
            --color--error-red: #EE1D36;

            --color--success-green-light: #EFFDF6;
            --color--success-green-mid: #7FF0B8;
            --color--success-green: #17C970;

            --color--white-shade: #ffffff;
            --color--black-shade: #000000;
            --color--disabled-gray: #73818E;
            --color--disabled-gray-light: #E5E5E5;
            */}
            <Row>
                <Column>
                    <h1>h1</h1>
                    <h2>h2</h2>
                    <h3>h3</h3>
                </Column>
                <Column>
                    <ColoredParagraph color="var(--color--blue-1)">blue-1</ColoredParagraph>
                    <ColoredParagraph color="var(--color--blue-2)">blue-2</ColoredParagraph>
                    <ColoredParagraph color="var(--color--blue-3)">blue-3</ColoredParagraph>
                    <ColoredParagraph color="var(--color--blue-4)">blue-4</ColoredParagraph>
                    <ColoredParagraph color="var(--color--blue-5)">blue-5</ColoredParagraph>
                </Column>
                <Column>
                    <ColoredParagraph color="var(--color--green-1)">green-1</ColoredParagraph>
                    <ColoredParagraph color="var(--color--green-2)">green-2</ColoredParagraph>
                    <ColoredParagraph color="var(--color--green-3)">green-3</ColoredParagraph>
                    <ColoredParagraph color="var(--color--green-4)">green-4</ColoredParagraph>
                    <ColoredParagraph color="var(--color--green-5)">green-5</ColoredParagraph>
                </Column>
                <Column>
                    <ColoredParagraph color="var(--color--pink-1)">pink-1</ColoredParagraph>
                    <ColoredParagraph color="var(--color--pink-2)">pink-2</ColoredParagraph>
                    <ColoredParagraph color="var(--color--pink-3)">pink-3</ColoredParagraph>
                    <ColoredParagraph color="var(--color--pink-4)">pink-4</ColoredParagraph>
                    <ColoredParagraph color="var(--color--pink-5)">pink-5</ColoredParagraph>
                </Column>
                <Column>
                    <ColoredParagraph color="var(--color--error-red-light)">error-red-light</ColoredParagraph>
                    <ColoredParagraph color="var(--color--error-red-mid)">error-red-mid</ColoredParagraph>
                    <ColoredParagraph color="var(--color--error-red)">error-red</ColoredParagraph>
                </Column>
                <Column>
                    <ColoredParagraph color="var(--color--success-green-light)">success-green-light</ColoredParagraph>
                    <ColoredParagraph color="var(--color--success-green-mid)">success-green-mid</ColoredParagraph>
                    <ColoredParagraph color="var(--color--success-green)">success-green</ColoredParagraph>
                </Column>
                <Column>
                    <ColoredParagraph color="var(--color--white-shade)">white-shade</ColoredParagraph>
                    <ColoredParagraph color="var(--color--disabled-gray-light)">disabled-gray-light</ColoredParagraph>
                    <ColoredParagraph color="var(--color--disabled-gray)">disabled-gray</ColoredParagraph>
                    <ColoredParagraph color="var(--color--black-shade)">black-shade</ColoredParagraph>
                </Column>
            </Row>
        </div>
    );
};
export default Test;