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
  
`;

const DropDownHeader = styled("div")`
  padding: 0.5em;
  border: 4px solid var(--color--blue-4);
  border-radius: 8px;
  width: 150px;
  text-align: left;
  box-sizing: border-box;
  color: var(--color--black-shade);
  
  &:hover{
    border-color: var(--color--blue-3);
    color: var(--color--blue-3);
  }
  
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  position: absolute;
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
    padding-top: 0.2em 0.7em ;
  }
`;

const ListItem = styled("li")`
  list-style: circle;
  margin-bottom: 0.4em;

 

  &:hover{
    color: var(--color--blue-3);
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
