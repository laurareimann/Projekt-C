import styled from 'styled-components';
import Address from './Address';

const LocationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    width: fill-available;
`;

const AddressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
`;

const MapContainer = styled.div <{ $hasOutline: boolean; color: string }>`
    width: 200px;
    height: 135px;
    background-color: var(--color--disabled-gray-light);

    @media (max-width: 768px) {
        width: 100px;
        height: 90px;
    }
    border-radius: 26px;
    border: ${({ $hasOutline, color }) =>
        $hasOutline ? (color === "blue" ? "var(--color--blue-3) 3px solid" :
            (color === "green" ? "var(--color--green-3) 3px solid" :
                "var(--color--pink-3) 3px solid")) :
            "none"};
`;

const PlaceName = styled.div`
  line-height: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ color }) => {
        switch (color) {
            case "blue":
                return "var(--color--blue-5)";
            case "green":
                return "var(--color--green-5)";
            case "pink":
            default:
                return "var(--color--pink-5)";
        }
    }};
`;

function Location({ children = '', street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink", outline = true }) {
    return (
        <LocationWrapper>
            <MapContainer color={color} $hasOutline={outline}></MapContainer>
            <AddressWrapper>
                <PlaceName color={color}>{children}</PlaceName>
                <Address color={color} street={street} zip={zip} city={city}></Address>
            </AddressWrapper>
        </LocationWrapper>
    );
}

export default Location;