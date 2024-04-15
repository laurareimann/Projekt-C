import styled from 'styled-components';

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

const HeaderWrapper = styled.div`
    display: flex
`;

const MobileWrapper = styled.div`
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

const DesktopWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

function Header() {
    return (
        <HeaderWrapper>
            <DesktopWrapper>
                <HeaderDesktop/>
            </DesktopWrapper>
            <MobileWrapper>
                <HeaderMobile/>
            </MobileWrapper>
        </HeaderWrapper>
    );
}

export default Header;