import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import quizIcon from '../assets/QuizIcon.svg';
import aboutUsIcon from '../assets/AboutIcon.svg';
import evaluationIcon from '../assets/EvaluationIcon.svg';
import profileIcon from '../assets/ProfileIcon.svg';
import burgerBars from '../assets/BurgerBars.svg';
import burgerCross from '../assets/BurgerCross.svg';

const Header = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    min-width: 380px;
    width: 100%;
    background-color: var(--color--white-shade);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;

    @media (max-width: 768px) {
    }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 20px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  @media (max-width: 380px) {
    font-size: 1.5rem;
  }
`;

const Profile = styled.a`
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
`;

const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  img {
    margin-right: 10px;
  }
`;

const MenuOption = styled.a`
  display: flex;
  background: var(--color--white-shade);
  padding: 10px 25px 10px 10px;
  border-radius: 0 40px 40px 0;
  margin: 5px 0 5px 0;
  text-decoration: none;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color--black-shade);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

  img {
    width: 40px;
    height: 40px;
  }
`;

const burgerStyles = {
    bmMenuWrap: {
        position: 'fixed',
        top: '70px',
        left: '0',
        height: '100%',
        zIndex: '2'
    },
    bmOverlay: {
        position: 'fixed',
        zIndex: '0',
        left: '0',
        top: '70px',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(2px)'
    },
    bmMenu: {
        background: 'rgba(0, 0, 0, 0)',
        padding: '5px 1.5em 0',
        fontSize: '1.15em',

    },
    bmItemList: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0',
        color: 'var(--color--black-shade)',
        padding: '0'
    },
    bmItem: {
        display: 'inline-block',
    }
}

const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuOpen = () => {
        setIsOpen(prevIsOpen => !prevIsOpen); // Toggle isOpen
        if (!isOpen) {
            window.scrollTo(0, 0); // Scroll to the top of the page only when opening the menu
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    return (
        <Header>
            <Nav>
                <NavSection>
                    <BurgerButton onClick={handleMenuOpen}>
                        {isOpen ? <img src={burgerCross} /> : <img src={burgerBars} />}
                    </BurgerButton>

                    <Menu
                        isOpen={isOpen}
                        onStateChange={({ isOpen }) => setIsOpen(isOpen)}
                        customBurgerIcon={false}
                        styles={burgerStyles}
                    >
                        <MenuOption onClick={() => setIsOpen(false)} href="/quiz">
                            <MenuItem>
                                <img src={quizIcon} alt="Quiz" />
                                Quiz
                            </MenuItem>
                        </MenuOption>
                        <MenuOption onClick={() => setIsOpen(false)} href="/about-us">
                            <MenuItem>
                                <img src={aboutUsIcon} alt="About Us" />
                                About Us
                            </MenuItem>
                        </MenuOption>
                        <MenuOption onClick={() => setIsOpen(false)} href="/evaluation">
                            <MenuItem>
                                <img src={evaluationIcon} alt="Evaluation" />
                                Evaluation
                            </MenuItem>
                        </MenuOption>
                    </Menu>
                </NavSection>

                <NavSection>
                    <Title onClick={() => window.location.href = '/'}>15 Minute City</Title>
                </NavSection>
                <NavSection>
                    <Profile href="/profile">
                        <img src={profileIcon} alt="Profile" />
                    </Profile>
                </NavSection>
            </Nav>
        </Header >
    );
};

export default HeaderMobile;