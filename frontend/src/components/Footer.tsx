import styled from 'styled-components';
import logo from '../assets/logo.svg';

const FooterContainer = styled.footer`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color--blue-5);
  padding: 0 1rem;
  flex-shrink: 0;
  box-sizing: border-box;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 0 10rem;  /* Larger padding for larger screens */
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.5rem 0;
`;

const ColumnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0 1rem;

    @media (max-width: 768px) {
        width: 80%;
        padding: 0;
    `;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
  padding: 0 1rem;
`;

const ThinColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 2;
  padding: 0 1rem;
`;

const Headline = styled.h1`
    color: var(--color--white-shade);
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
`;

const Link = styled.a`
    color: var(--color--white-shade);
    padding: 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: left;
    display: inline-block;

    &:hover {
        color: var(--color--blue-2);
    }
`;

const Address = styled.p`
    color: var(--color--white-shade);
    font-weight: 100;
    line-height: 0rem;
    text-align: left;
`;

const PartingLine = styled.hr`
  width: 100%;
  border: 0;
  border-top: 2px solid var(--color--blue-1);  /* Light white line */
  margin: 2rem 0;
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  text-align: center;
  color: var(--color--white-shade);
  margin-top: 1rem;
`;

function Footer() {
    return (
        <FooterContainer>
            <ColumnsContainer>
                <ThinColumn>
                    <Logo>
                        <img src={logo} alt="Logo" width="128" height="128"/>
                    </Logo>
                </ThinColumn>
                <Column>
                    <Headline>Legal</Headline>
                    <Link href="#">Terms</Link>
                    <Link href="#">Privacy</Link>
                </Column>
                <Column>
                    <Headline>About us</Headline>
                    <Link href="#">The team</Link>
                    <Link href="#">Concept</Link>
                    <Link href="#">FAQ</Link>
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
            <FooterText>© All rights reserved (TO BE CHANGED)</FooterText>
        </FooterContainer>
    );
}

export default Footer;