/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './Buttons';

import logo from '../assets/Logo.svg';
import quizIcon from '../assets/QuizIcon.svg';
import aboutUsIcon from '../assets/AboutIcon.svg';
import evaluationIcon from '../assets/EvaluationIcon.svg';
import profileIcon from '../assets/ProfileIcon.svg';



const Header = styled.header<{ visible: boolean }>`
  position: fixed;
  top: ${props => props.visible ? '0' : '-100px'};
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--color--white-shade);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: top 0.3s ease-in-out;
  z-index: 1000;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  img {
    width: 75px;
    height: 75px;
  }

  @media (max-width: 768px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 80px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavItem = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  color: var(--color--black-shade);
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color--blue-4);
  }

  img {
    width: 40px;
    height: 40px;
    margin-right: 0.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Profile = styled.a`
  display: flex;
  text-decoration: none;
  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    img {
      width: 40px;
      height: 40px;
    }
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

let globalLoggedInBool:boolean = false;

if(currentUser == null){
  console.log("No one's logged in atm");
  globalLoggedInBool = false;
}else{
  console.log(currentUser + " is logged in");
  globalLoggedInBool = true;
}


function HeaderDesktop() {
  // nur temporär um Login funktionalität zu testen
  // sollte später ausgelagert werden in richtigen Login Handler
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <Header visible={isVisible}>
      <Nav>
        <Logo href="/">
          <img src={logo} alt="Logo"  />
        </Logo>
        <NavItem href="/quiz">
          <img src={quizIcon} alt="Quiz" />
          <span>Quiz</span>
        </NavItem>
        <NavItem href="/about-us">
          <img src={aboutUsIcon} alt="About Us" onClick={() => {
            deleteCookie(currentUser)}} />
          <span>About Us</span>
        </NavItem>
        <NavItem href="/evaluation">
          <img src={evaluationIcon} alt="Evaluation" />
          <span>Evaluation</span>
        </NavItem> 
        {globalLoggedInBool ? ( // State ändert sich momentan auch noch nicht
          <Profile href="/profilePage">
            <img src={profileIcon} alt="Profile" />     
          </Profile>  
        ) : (
          <Profile href="/logInPage">
            <Button color='pink'>Login</Button>
          </Profile>
        )}
        {globalLoggedInBool ? (
          <Button onClick={() => {
            deleteCookie(currentUser)
            window.location.replace("/");
          }}>Logout</Button>
            
        ):(
          ""
        )}
      </Nav>
        
    </Header>
  );
}

export default HeaderDesktop;