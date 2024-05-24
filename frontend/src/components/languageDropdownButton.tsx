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
  display: flex;
  flex-direction: row;
  padding-left: 0.5em;
  border: 4px solid var(--color--blue-4);
  border-radius: 8px;
  min-width: 120px;
  width: fit-content;
  align-items: center;
  box-sizing: border-box;
  color: var(--color--black-shade);

  &:hover{
    border-color: var(--color--blue-3);
    color: var(--color--blue-3);
  }
`;

const TextContainer = styled("div")`
    min-width: 80px;
`;

const DropDownListContainer = styled("div")`
  
  `;

const DropDownList = styled("ul")`
  position: inherit;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
  width: fit-content;
  min-width: 120px;
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
  img{
    max-width: 30px;
    max-height: 30px;
    width: fit-content;
    height: fit-content;
    rotate: 180deg;
  }
`

const options = [""];
  let value2:string;  
  let selectedOptionDefault:string;


function DropDownLanguage({options=[""], category=""}) { //options zeigt die Strings, die im Dropdown liegen. 
                                                         //Category ist ein Placeholder bis eine der Options ausgewählt wird
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value:string) => () => {
    
    selectedOptionDefault = value;
    setIsOpen(false);
    chosenLanguage = value;
  };

  function checkString (){ //geht bestimmt auch simpler aber hier sind wir
    if(selectedOptionDefault == undefined){
      return category;
    }else{
      return selectedOptionDefault;
    }
  }

  return (
    <>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          <TextContainer>
             {checkString()}
          </TextContainer>
            <Arrow>
            <img src={blueArrow} alt="blueArrow"/>
            </Arrow>
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
