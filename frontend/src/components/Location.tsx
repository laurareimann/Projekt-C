import styled from 'styled-components';
import Address from './Address';

const LocationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    width: 100%;
`;

const AddressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
`;

const MapContainer = styled.div`
    width: 200px;
    height: 135px;
    @media (max-width: 768px) {
        width: 100px;
        height: 90px;
    }
    border-radius: 26px;
    border: ${({ color }) =>
        color === "blue" ? "var(--color--blue-3) 3px solid" :
            (color === "green" ? "var(--color--green-3) 3px solid" :
                "var(--color--pink-3) 3px solid")};
`;

const PlaceName = styled.div`
  line-height: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

function Location({ children = '', street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink" }) {
    return (
        <LocationWrapper>
            <MapContainer color={color} ></MapContainer>
            <AddressWrapper>
                <PlaceName>{children}</PlaceName>
                <Address color={color} street={street} zip={zip} city={city}></Address>
            </AddressWrapper>
        </LocationWrapper>
    );
}

export default Location;