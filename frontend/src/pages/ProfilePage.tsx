/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { createGlobalStyle } from 'styled-components';
import profileIcon from '../assets/ProfileIcon.svg';
import ScoreContainer from '../components/ScoreContainer';
import React, { useState } from "react";
import Button from '../components/buttons/Buttons';


const ProfileContainer = styled.div`
  display: grid;
  margin-bottom : 1%;
`;

const ProfilePic = styled.a`
  align-items: center;
  img {
    width: 25%;
    height: 100%;
}
`;

const getCookie = (name:string) =>{
    const cookies = document.cookie.split("; ").find((row)=> row.startsWith(`${name}=`));
  
    return cookies ? cookies.split("=")[1] : null;
  }
  
  let currentUser = getCookie("username");
  
  const deleteCookie = (name: string | null) =>{
  
    console.log("Attempting to log off " + name);
  
    if(currentUser != ""){
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    currentUser = "";
    console.log("Logging off")
    }
  }


const ProfileTab = styled.div`
    
    background-color: var(--color--pink-1);
    cursor: pointer;
    padding: 10px 0;
    border-radius: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: left;
    align-items: center;
`
const Arrow = styled.span<{ isOpen: boolean }>`
    display: inline-block;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const ResultList = styled.ul`
  display: grid;
  gap: 1%;
  z-index: 5;
  width: 100%;
  min-width: 120px;
  margin: 0;
  background: var(--color--pink-1);
  border-top: 2px;
  border-radius: 8px;
  box-sizing: border-box;
  color: var(--color--black-shade);
  transition: all .5s ease;
`

const ResultItem = styled.li`
      text-overflow: ellipsis;
      overflow: hidden;
  &:hover{
    color: var(--color--blue-3);
  }
`


const Wrapper = styled.div`
    width: 80%;
    text-align: start;
    margin-bottom: 1%;
`;

function ProfilePage(){

  const [openHistory, setOpenHistory] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  

  const searchHistory = [
    <ScoreContainer color='blue'/>,<ScoreContainer color ="blue"/>
  ]
 
  const savedSearches = [
    <ScoreContainer color="blue"/>
  ]


    return(
      <div>
        <ProfileContainer>
            <ProfilePic>
                <img src={profileIcon}></img>
            </ProfilePic>
            {currentUser}
            </ProfileContainer>   
        {/*Saved searches*/}
        <Wrapper>
        <ProfileTab onClick={() => setOpenSaved(!openSaved)}>
         
        <Arrow isOpen={openSaved}>&gt;</Arrow>  
        <h3>Saved results</h3>   
        </ProfileTab>
        {openSaved&& (
          <div>
          <ResultList>
            {savedSearches.map(search => (
              <ResultItem>
                {search}
              </ResultItem>
            ))}
          </ResultList>
          </div>
        )}               
        </Wrapper>

        {/*Search history*/}
        <Wrapper>
        <ProfileTab onClick={() => setOpenHistory(!openHistory)}>
        <Arrow isOpen={openHistory}>&gt;</Arrow>  
        <h3>Search history</h3>   
         
        </ProfileTab>
        {openHistory && (
          <div>
          <ResultList>
            {searchHistory.map(search => (
              <ResultItem>
                {search}
              </ResultItem>
            ))}
          </ResultList>
          </div>
        )}               
        </Wrapper>

        <Button onClick={()=>{
            console.log("Not yet implemented");
        }}>Change settings</Button>
      </div>  
    )
}

export default ProfilePage;