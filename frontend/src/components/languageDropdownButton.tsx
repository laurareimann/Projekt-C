/* eslint-disable @typescript-eslint/no-unused-vars */
//Dies wird der dropdown component für die Auswahl der Sprache. Anfangs erstmal nur Deutsch und Englisch

import styled from "styled-components";
import React, { useState } from "react";

//Dies wird für den weiteren verlauf eventuell wichtig, wenn wir dynamisch die Sprache ändern wollen
//Wird vielleicht in die App.tsx rüberwandern, aber erstmal bleibts hier
let chosenLanguage:string;
  chosenLanguage = "English";

  //language wird reassigned, damit VSC nicht meckert
  chosenLanguage = "English";

  const DropDownContainer = styled("div")`
  //width: 9em;
  margin: 15px auto;
  
`;

const DropDownHeader = styled("div")`
  font-family: "Roboto", sans-serif;
  padding: 0.5em 0.2em;
  border: 4px solid var(--color--blue-4);
  border-radius: 18px;
  width: 400px;
  text-align: left;
  font-weight: 500;
  font-size: 1.5rem;
  box-sizing: border-box;
  
  &:hover{
    background-color: #ebebeb;
  }
  
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
    
  position: absolute;
  z-index: 20000;
  width:400px;
  padding: 0;
  margin: 0;
  
  //padding-left: 1em;
  background: #ffffff;
  border: 2px solid var(--color--blue-5);
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  text-align:left;
  &:first-child {
    padding-top: 0.2em;
  }

 

`;

const ListItem = styled("li")`
  
  list-style: none;
  margin-bottom: 0.4em;
  padding-top: 0.1em;
  padding-left:0.5em;

  &:hover{
    background-color: #ebebeb;
  }

`;

const options = ["English", "German"];
let value2:string;  
  let selectedOptionAlt:string;
  selectedOptionAlt = "English";


function DropDownLanguage() {

  

  const [isOpen, setIsOpen] = useState(false);
  

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value:string) => () => {
    
    selectedOptionAlt = value;
    setIsOpen(false);
    console.log(selectedOptionAlt);
    chosenLanguage = value;
  };

  return (
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOptionAlt} 
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
    
  );
}

//Siehe oben
export {chosenLanguage};
export default DropDownLanguage;
