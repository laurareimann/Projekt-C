import styled from 'styled-components';
import MapPoint_blue from '../assets/icons/map-point_blue.svg';
import MapPoint_green from '../assets/icons/map-point_green.svg';
import MapPoint_pink from '../assets/icons/map-point_pink.svg';

const AddressWrapper = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    align-items: center;
    gap: 8px;
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

    > div{
        flex-direction: column;
    }
`;

const MapPointIcon = styled.img`
  width: 40px;
  height: 40px;
  alt: "Map Point Icon";
`;

function Address({ street = "Finkenau 35", zip = "22081", city = "Hamburg", color = "pink" }) {
    const mapPointSrc = color === 'blue' ? MapPoint_blue
        : color === 'green' ? MapPoint_green
            : MapPoint_pink;

    return (
        <AddressWrapper color={color}>
            <MapPointIcon src={mapPointSrc} />
            <div>
                <p><b>{street}</b></p>
                <p>{zip + ' ' + city}</p>
            </div>
        </AddressWrapper>
    );
}

export default Address;