import { useState } from 'react';
import styled from 'styled-components';

import Button from './Buttons';

import logo from '../assets/Logo.svg';
import quizIcon from '../assets/QuizIcon.svg';
import aboutUsIcon from '../assets/AboutIcon.svg';
import evaluationIcon from '../assets/EvaluationIcon.svg';
import profileIcon from '../assets/ProfileIcon.svg';

const Header = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: var(--color--white-shade);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;

    @media (max-width: 768px) {
    }
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

function HeaderDesktop() {
  // nur temporär um Login funktionalität zu testen
  // sollte später ausgelagert werden in richtigen Login Handler
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Header>

      <Nav>
        <Logo href="/">
          <img src={logo} alt="Logo" />
        </Logo>
        <NavItem href="/quiz">
          <img src={quizIcon} alt="Quiz" />
          <span>Quiz</span>
        </NavItem>
        <NavItem href="/about-us">
          <img src={aboutUsIcon} alt="About Us" />
          <span>About Us</span>
        </NavItem>
        <NavItem href="/evaluation">
          <img src={evaluationIcon} alt="Evaluation" />
          <span>Evaluation</span>
        </NavItem> 
        {isLoggedIn ? ( // State ändert sich momentan auch noch nicht
          <Profile href="/profile">
            <img src={profileIcon} alt="Profile" />
          </Profile>
        ) : (
          <Profile href="/login">
            <Button color='pink'>Login</Button>
          </Profile>
        )}
      </Nav>

    </Header>
  );
}

export default HeaderDesktop;