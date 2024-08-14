/* eslint-disable @typescript-eslint/no-unused-vars */
//Dies wird der dropdown component für die Auswahl der Sprache. Anfangs erstmal nur Deutsch und Englisch

import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import bigBlueArrow from '../assets/Arrow_Transparent_Blue.svg'

//Dies wird für den weiteren verlauf eventuell wichtig, wenn wir dynamisch die Sprache ändern wollen
//Wird vielleicht in die App.tsx rüberwandern, aber erstmal bleibts hier
let dropdownOptions:string;
  //dropdownOptions = "English";

  //language wird reassigned, damit VSC nicht meckert
  //dropdownOptions = "English";

  const DropDownContainer = styled("div")`
  cursor: pointer;
  position: relative;
  display: inline-block;
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
  z-index: 5;
  

  &:hover{
    border-color: var(--color--blue-3);
    color: var(--color--blue-3);
  }
`;

const TextContainer = styled("div")`
    min-width: 80px;
    text-align: start;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  z-index: 10;
  `;

const DropDownList = styled("ul")`
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
  
  &:first-child {
    padding: 0.5em;
    padding-bottom: 0.2em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: start;
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


function Dropdown({options=[""], placeholder=""}) { //options zeigt die Strings, die im Dropdown liegen. 
                                                         //Placeholder ist ein Placeholder bis eine der Options ausgewählt wird
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value:string) => () => {
    selectedOptionDefault = value;
    setIsOpen(false);
    dropdownOptions = value;
  };

  function checkString (){ //geht bestimmt auch simpler aber hier sind wir
    if(selectedOptionDefault == undefined){
      return placeholder;
    }else{
      return selectedOptionDefault;
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <DropDownContainer ref={dropDownRef}>
        <DropDownHeader onClick={toggling}>
          <TextContainer>
             {checkString()}
          </TextContainer>
            <Arrow>
            <img src={bigBlueArrow} alt="blueArrow"/>
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
export {dropdownOptions};
export default Dropdown;
