/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import profileIcon from '../assets/ProfileIcon.svg';
import React from "react";


const ProfileContainer = styled.div`
    width: 200%;
    height: 200%;
`;

const ProfilePic = styled.a`
  align-items: center;
  img {
    width: 300px;
    height: 300px;
}
`;

const UserNameText = styled.a`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
`




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



function ProfilePage(){

    return(
      <div>
        <div>

            <ProfilePic>
                <img src={profileIcon}></img>
            </ProfilePic>
                
        </div>

        <UserNameText>{currentUser}</UserNameText>
          
        
            
      </div>  
    )
}

export default ProfilePage;