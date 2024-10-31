import styled from 'styled-components';
import logo from '../../assets/icons/logo.svg';

const FooterContainer = styled.footer`
  left: 0;
  right: 0;
  min-width: 320px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color--blue-5);
  padding: 20px 32px 10px 32px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  text-align: -webkit-center;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 0;
  }

`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem 0;

  @media (max-width: 768px) {
    display: none;  /* Hide on smaller screens */
  }

  /*Middle ground adjustments between desktop and mobile */  
    @media (max-width: 1120px) {
        display: none;  /* Hide on smaller screens */
    }
  
`;

const LogoImg = styled.img`
  width: 80px;  /* Adjust as needed */
  height: 80px;  /* Adjust as needed */

  @media (max-width: 768px) {
    display: none;  /* Hide on smaller screens */
  }

  /*Middle ground adjustments between desktop and mobile */  
    @media (max-width: 1120px) {
        display: none;  /* Hide on smaller screens */
    }
`;

const ColumnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 80%;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        flex-direction: column;  /* Stack columns on top of each other */
    }
    `;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;

  @media (max-width: 768px) {
    border-bottom: 1px solid var(--color--blue-1);  /* Light white line */
    flex: 2;  /* Reduce flex */
    padding: 0.5rem;  /* Adjust padding */
    font-size: 0.5rem;  /* Smaller font size */
    width: 100%;  /* Full width */
  }
`;

const ThinColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 2;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex: 1;  /* Reduce flex */
    padding: 0 0.5rem;  /* Adjust padding */
  }

  /*Middle ground adjustments between desktop and mobile */  
    @media (max-width: 1120px) {
        display: none;  /* Hide on smaller screens */
    }
`;

const Headline = styled.h3`
    color: var(--color--white-shade);
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
`;

const Link = styled.a`
    color: var(--color--white-shade);
    padding: 0.5rem 0;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    display: inline-block;
    text-decoration: none;

    &:hover {
        color: var(--color--blue-2);
    }

`;

const Address = styled.p`
    color: var(--color--white-shade);
    font-weight: 100;
    text-align: left;
    font-size: 1rem; 
`;

const PartingLine = styled.hr`
  width: 100%;
  border: 0;
  border-top: 2px solid var(--color--blue-1);  /* Light white line */

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;  /* Smaller margin */
    visibility: hidden;  /* Hide on smaller screens */
  }

  @media (max-width: 1120px) {
    margin-bottom: 0.5rem;  /* Smaller margin */
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: var(--color--white-shade);
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;  /* Smaller font size */
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ColumnsContainer>
        <ThinColumn>
          <Logo>
            <LogoImg src={logo} alt="Logo" />
          </Logo>
        </ThinColumn>
        <Column>
          <Headline>Legal</Headline>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </Column>
        <Column>
          <Headline>About us</Headline>
          <Link href="/team">The team</Link>
          <Link href="/concept">Concept</Link>
          <Link href="/faq">FAQ</Link>
        </Column>
        <Column>
          <Headline>Contact</Headline>
          <Address>HAW-Hamburg</Address>
          <Address>Finkenau 35</Address>
          <Address>22081 Hamburg</Address>
          <Address>Tel.: 040 428754641</Address>
        </Column>
      </ColumnsContainer>
      <PartingLine />
      <FooterText>© All rights reserved</FooterText>
    </FooterContainer>
  );
}

export default Footer;