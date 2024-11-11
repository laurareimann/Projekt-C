import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import { slide as ProfileMenu } from 'react-burger-menu';
import scoringIcon from '../../assets/icons/QuizIcon.svg';
import aboutUsIcon from '../../assets/icons/AboutIcon.svg';
import evaluationIcon from '../../assets/icons/EvaluationIcon.svg';
import profileIcon from '../../assets/icons/ProfileIcon.svg';
import burgerBars from '../../assets/icons/BurgerBars.svg';
import burgerCross from '../../assets/icons/BurgerCross.svg';

const Header = styled.header<{ visible: boolean }>`
    position: fixed;
    top: ${props => props.visible ? '0' : '-100px'};
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    width: 100%;
    background-color: var(--color--white-shade);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    transition: top 0.3s ease-in-out;
    z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 20px;
  width: 100%;
`;

const NavSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  @media (max-width: 380px) {
    font-size: 1.5rem;
  }
`;

const Spacer = styled.div`
  height: 20px;
`;

const Profile = styled.button`
  display: flex;
  border: none;
  background: none;
  cursor: pointer;

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

const MenuProfileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
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
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  img {
    width: 40px;
    height: 40px;
  }
`;

const MenuProfileOption = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color--pink-3);
  padding: 10px 25px 10px 10px;
  border-radius: 40px 0px 0px 40px;
  margin: 5px 0 5px 0;
  text-decoration: none;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color--white-shade);
  box-shadow: -2px 5px 10px rgba(0, 0, 0, 0.25);
`;

const burgerStyles = {
  bmBurgerBars: {
    transition: '0.5s ease-in-out',
  },
  bmMenuWrap: {
    transition: 'all 0.5s ease-in-out',
    position: 'fixed',
    top: '70px',
    left: '0',
    height: '225px', // hardcoded größe des burgers menü um schließen durch danebenklicken zu ermöglichen
    width: '225px',
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

const burgerProfileStyles = {
  bmBurgerBars: {
    transition: '0.5s ease-in-out',
  },
  bmMenuWrap: {
    transition: 'all 0.5s ease-in-out',
    position: 'fixed',
    top: '70px',
    right: '0',
    height: '125px', // hardcoded größe des burgers menü um schließen durch danebenklicken zu ermöglichen
    width: '150px',
    zIndex: '2'
  },
  bmOverlay: {
    position: 'fixed',
    zIndex: '0',
    right: '0',
    top: '70px',
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(2px)'
  },
  bmMenu: {
    background: 'rgba(0, 0, 0, 0)',
    padding: '5px 0em 0 0',
    fontSize: '1.15em',

  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: '0',
    color: 'var(--color--black-shade)',
    padding: '0'
  },
  bmItem: {
    display: 'inline-block',
  }
}

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
}

let currentUser = getCookie("username");

const deleteCookie = (name: string | null) => {

  console.log("Attempting to log off " + name);

  if (currentUser != "") {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    currentUser = "";
    console.log("Logging off")
  }
}

let globalLoggedInBool: boolean = false;

if (currentUser == null) {
  console.log("No one's logged in atm");
  globalLoggedInBool = false;
} else {
  console.log(currentUser + " is logged in");
  globalLoggedInBool = true;
}



const HeaderMobile = () => {
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


  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMenuOpen = () => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
    } else {
      setIsOpen(prevIsOpen => !prevIsOpen);
      window.scrollTo(0, 0);
    }
  };

  const handleProfileOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsProfileOpen(prevIsProfileOpen => !prevIsProfileOpen);
      window.scrollTo(0, 0);
    }
  };

  // Make page not scrollable when a menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isProfileOpen ? 'hidden' : 'auto';
  }, [isProfileOpen]);

  return (
    <>
      <Header visible={isVisible}>
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
              <MenuOption onClick={() => setIsOpen(false)} href="/scoring">
                <MenuItem>
                  <img src={scoringIcon} alt="Scoring" />
                  Scoring
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
            <Profile onClick={handleProfileOpen}>
              <img src={profileIcon} alt="Profile" />
            </Profile>

            <ProfileMenu
              isOpen={isProfileOpen}
              onStateChange={({ isOpen }) => setIsProfileOpen(isOpen)}
              customBurgerIcon={false}
              styles={burgerProfileStyles}
              right
            >
              {globalLoggedInBool ? (
                <>
                  <MenuProfileOption onClick={() => setIsProfileOpen(false)} href="/profile">
                    <MenuProfileItem>
                      Profile
                    </MenuProfileItem>
                  </MenuProfileOption>

                  <MenuProfileOption onClick={() => {
                    setIsProfileOpen(false);
                    deleteCookie(currentUser);
                    window.location.replace("/");
                  }}>
                    <MenuProfileItem>
                      Logout
                    </MenuProfileItem>
                  </MenuProfileOption>
                </>

              ) : (
                <>
                  <MenuProfileOption onClick={() => setIsProfileOpen(false)} href="/login">
                    <MenuProfileItem>
                      Login
                    </MenuProfileItem>
                  </MenuProfileOption>

                  <MenuProfileOption onClick={() => setIsProfileOpen(false)} href="/register">
                    <MenuProfileItem>
                      Register
                    </MenuProfileItem>
                  </MenuProfileOption>
                </>
              )}

            </ProfileMenu>
          </NavSection>

        </Nav >
      </Header >
      <Spacer />
    </>
  );
};

export default HeaderMobile;