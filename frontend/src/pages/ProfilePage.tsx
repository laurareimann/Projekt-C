/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { createGlobalStyle } from 'styled-components';
import profileIcon from '../assets/icons/ProfileIcon.svg';
import ScoreContainer from '../components/ScoreContainer';
import ProfileHistoryContainer from '../components/ProfileHistoryContainer';
import React, { useState, useEffect } from "react";
import Button from '../components/buttons/Buttons';
import axios from 'axios';



const ProfileContainer = styled.div`
  margin-bottom : 1%;
`;

const ProfilePic = styled.a`
  align-items: center;
  img {
    width: 20%;
    height: 20%;
}

@media(max-width:768px){
  img{
  width:50%;
  height:100%;
  }
}

`;



const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
}

let currentUser = getCookie("username");

console.log(currentUser + " is currently logged in")

const deleteCookie = (name: string | null) => {

  console.log("Attempting to log off " + name);

  if (currentUser != "") {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    currentUser = "";
    console.log("Logging off")
  }
}


const ProfileTab = styled.div`
    
    background-color: var(--color--pink-1);
    cursor: pointer;
    padding: 1% 1%;
    border:3px solid var(--color--pink-3);
    border-radius:10px;
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
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 4px;
  z-index: 1;
  width: 100%;
  background: var(--color--pink-1);
  border-top: 2px;
  border-radius: 5px 5px 8px 8px;
  box-sizing: border-box;
  color: var(--color--black-shade);
  transition: all .5s ease;
  grid-template-columns: repeat(auto-fit,minmax(250px,max-content));

  @media (max-width:425px) {
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
  }
  
`

const ResultItem = styled.li`
      margin: 4px;
      display: flex;
      justify-self: center;
      align-items: center;
      width: 250px;
      height: 240px;
      
      
  &:hover{
    color: var(--color--blue-3);
  }

  @media (max-width:425px) {
    display: inline-block;
    height:150px;
  }
`



const Wrapper = styled.div`
    width: 80%;
    text-align: start;
    margin-bottom: 8px;
`;

//Für eine Lücke zum Footer
const PageContainer = styled.div`
margin-bottom: 2%;
`

let historyArray: string;
let savedArray: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let historyArrayForHTML: any = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let savedArrayForHTML: any = [];

//Search history
async function FetchHistory() {
  console.log("Fetching Data from backend")

  try {
    axios.get("http://localhost:8080/getHistory", { params: { currentUserParam: currentUser } }).then((res: { data: string }) => {
      historyArray = res.data;
      historyArrayForHTML = JSON.parse(historyArray);
      historyArrayForHTML.reverse();
      if (historyArrayForHTML.length > 20) {
        historyArrayForHTML = historyArrayForHTML.slice(0, 19)
      }
    })


  } catch (e) { console.log(e) }


}



//Gespeicherte Routen
async function FetchSaved() {
  console.log("Fetching Data from backend")

  try {
    axios.get("http://localhost:8080/GetSaved",
      { params: { currentUserParam: currentUser } }).then((res: { data: string }) => {
        savedArray = res.data;
        savedArrayForHTML = JSON.parse(savedArray);
        savedArrayForHTML.reverse();
        if(savedArrayForHTML.length > 20){
          savedArrayForHTML = savedArrayForHTML.slice(0,19);
        }
      })

    if (savedArrayForHTML.length > 20) {
      //Splice array here
    }

  } catch (e) { console.log(e) }


}
//Gespeicherte Routen fetchen

//Von Profilseite zu map.tsx und Suche laden
//Eventuell muss dies in map.tsx selbst geschehen
async function loadSearch(addressParam: string, addressLatParam: number, addressLngParam: number,addressCityParam:string,addressZipParam:string) {

  console.log("Attempting load from profile");

  const addressToLoad = addressParam;
  const addressLat = addressLatParam;
  const addressLng = addressLngParam;
  const addressCity = addressCityParam;
  const addressZip = addressZipParam;
  const shouldLoadBool: boolean = true;

  console.log(addressLat);

  try {
    await axios.post("http://localhost:8080/prepareLoadFromProfile", {
      addressToLoad, shouldLoadBool, addressLat, addressLng,addressZip,addressCity
    })
      .then((res: { data: string }) => {
        if (res.data === "update successful") {
          console.log("Updated preparation");
          window.location.assign("/")
        }

      })
  } catch (e) {
    console.log(e);
  }
}




FetchHistory();

FetchSaved();

function ProfilePage() {

  const [openHistory, setOpenHistory] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfilePic>
          <img src={profileIcon}></img>
        </ProfilePic>
      </ProfileContainer>
      <h1>{currentUser}</h1>
      {/*Saved searches*/}
      <Wrapper>
        <ProfileTab onClick={() => setOpenSaved(!openSaved)}>

          <Arrow isOpen={openSaved}>&gt;</Arrow>
          <h3>Saved results</h3>
        </ProfileTab>
        {openSaved && (
          <div>
            <ResultList>
              {savedArrayForHTML.map((search: {
                addressFull: string, 
                savedName: string, 
                whoSaved: string, 
                googleMapsLat: number, 
                googleMapsLng: number,
                addressZip:string,
                addressCity:string
              }, index: React.Key | null | undefined) => (
                <ResultItem key={index}>
                  <ProfileHistoryContainer city={search.addressCity} zip={search.addressZip} hasOutline={true} buttonText="Review search" street={search.addressFull} onClick={() => {
                    loadSearch(search.addressFull, search.googleMapsLat, search.googleMapsLng,search.addressZip,search.addressCity);
                  }} savedAs={search.savedName}>

                  </ProfileHistoryContainer>
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
                addressFull: string; addressZip:string, addressCity:string, whoSaved: string, savedName: string, googleMapsLat: number, googleMapsLng: number;
              }, index: React.Key | null | undefined) => (
                <ResultItem key={index}>
                  <ProfileHistoryContainer hasOutline={true} buttonText="Review search" street={search.addressFull} city={search.addressCity} zip={search.addressZip}onClick={() => {
                    loadSearch(search.addressFull, search.googleMapsLat, search.googleMapsLng,search.addressCity,search.addressZip);
                  }}></ProfileHistoryContainer>
                </ResultItem>
              ))}
            </ResultList>
          </div>
        )}
      </Wrapper>

      <Button onClick={() => {
        console.log("Not yet implemented");
      }}>Change settings</Button>
    </PageContainer>

  )
}

export default ProfilePage;