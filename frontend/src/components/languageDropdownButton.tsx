/* eslint-disable @typescript-eslint/no-unused-vars */
//Dies wird der dropdown component für die Auswahl der Sprache. Anfangs erstmal nur Deutsch und Englisch

import styled from "styled-components";
import React, { useState } from "react";
import blueArrow from '../assets/round_arrow_blue.svg'

//Dies wird für den weiteren verlauf eventuell wichtig, wenn wir dynamisch die Sprache ändern wollen
//Wird vielleicht in die App.tsx rüberwandern, aber erstmal bleibts hier
let chosenLanguage:string;
  //chosenLanguage = "English";

  //language wird reassigned, damit VSC nicht meckert
  //chosenLanguage = "English";

  const DropDownContainer = styled("div")`
  cursor: pointer;
  
`;

const DropDownHeader = styled("div")`
  padding: 0.5em;
  border: 4px solid var(--color--blue-4);
  border-radius: 8px;
  width: 150px;
  text-align: left;
  box-sizing: border-box;
  color: var(--color--black-shade);

  img {
    align-self: right;
    width: 30px;
    height: 30px;
    rotate: 180deg;
  }
  
  &:hover{
    border-color: var(--color--blue-3);
    color: var(--color--blue-3);
  }
  
`;

const DropDownListContainer = styled("div")`
  
  `;

const DropDownList = styled("ul")`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
  width: 150px;
  margin: 0;
  background: var(--color--white-shade);
  border: 4px solid var(--color--blue-4);
  border-top: 2px;
  border-radius: 8px;
  box-sizing: border-box;
  color: var(--color--black-shade);
  text-align:left;
  &:first-child {
    padding: 0.5em;
    padding-bottom: 0.2em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover{
    color: var(--color--blue-3);
  }

`;

const Arrow = styled.a`
  img {
    width: 20px;
    height: 20px;
    rotate: 180deg;
  }
`

const options = [""];
  let value2:string;  
  let selectedOptionDefault:string;
  console.log("Ich nerve");


function DropDownLanguage({options=[""]}) {

  
  console.log("Former Language: " + selectedOptionDefault);
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value:string) => () => {
    
    selectedOptionDefault = value;
    console.log("Current Language: " + selectedOptionDefault);
    setIsOpen(false);
    
    chosenLanguage = value;
  };

  return (
    <>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOptionDefault}
            <span><img src={blueArrow} alt="blueArrow" /></span>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer> 
      </>
  );
}

//Siehe oben
export {chosenLanguage};
export default DropDownLanguage;
