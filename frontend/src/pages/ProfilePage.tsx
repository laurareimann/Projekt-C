/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { createGlobalStyle } from 'styled-components';
import profileIcon from '../assets/ProfileIcon.svg';
import ProfileHistoryContainer from '../components/ProfileHistoryContainer';
import React, { useState,useEffect } from "react";
import Button from '../components/buttons/Buttons';
import axios from 'axios';


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

let historyArray: string;
let savedArray: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let historyArrayForHTML: any = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let savedArrayForHTML:any = [];

//Search history
async function FetchHistory(){
  console.log("Fetching Data from backend")

  try{
    axios.get("http://localhost:8080/getHistory",{params:{currentUserParam:currentUser}}).then((res:{data:string})=>{
      historyArray = res.data;
      historyArrayForHTML = JSON.parse(historyArray);
      console.log(historyArrayForHTML);
    })
    if(historyArrayForHTML.length > 20){
      historyArrayForHTML.slice(historyArrayForHTML.length-19,historyArrayForHTML.length)
    }
  }catch(e){console.log(e)}

  
}

//Search history fetchen
FetchHistory();

//Gespeicherte Routen
async function FetchSaved(){
  console.log("Fetching Data from backend")

  try{
    axios.get("http://localhost:8080/GetSaved",
      {params:{currentUserParam:currentUser}}).then((res:{data:string})=>
    {
      savedArray = res.data;
      savedArrayForHTML = JSON.parse(savedArray);
      console.log(savedArrayForHTML);
    })

    if(savedArrayForHTML.length > 20){
      //Splice array here
    }

  }catch(e){console.log(e)}

  
}
//Gespeicherte Routen fetchen
FetchSaved();

//Von Profilseite zu map.tsx und Suche laden
//Eventuell muss dies in map.tsx selbst geschehen
function loadSearch(){
  //ToDo-Implement
}


function ProfilePage(){

  const [openHistory, setOpenHistory] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

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
            {savedArrayForHTML.map((search: {
              address: string; whoSaved: string ;},index: React.Key | null | undefined) => (
              <ResultItem key = {index}>
                <ProfileHistoryContainer buttonText="View search" street={search.address} onClick={()=>{loadSearch()}}></ProfileHistoryContainer>
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
            {historyArrayForHTML.map((search: {
              address: string; whoSaved: string ;},index: React.Key | null | undefined) => (
              <ResultItem key = {index}>
                <ProfileHistoryContainer outline={true} buttonText="View search" street={search.address} onClick={()=>{
                  //redirect to detailed result here
                }}></ProfileHistoryContainer>
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