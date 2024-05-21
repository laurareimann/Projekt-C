import styled from 'styled-components';
import BikeIcon from '../../assets/icons/bike_white.svg';
import SkateIcon from '../../assets/icons/skateboard_white.svg';
import ScooterIcon from '../../assets/icons/scooter_white.svg';
import TramIcon from '../../assets/icons/tram_white.svg';

function TileButton({ color = "blue", icon = 'bike', text = 'Button', subline = '0 - 3' }: { color?: string; icon?: string; text?: string; subline?: string }) {
    const iconMap: { [key: string]: string } = {
        bike: BikeIcon,
        skate: SkateIcon,
        scooter: ScooterIcon,
        tram: TramIcon,
    };
    const Icon = iconMap[icon] || null;
    return (
        <StyledTileButton color={color}>
            {Icon && <ButtonIcon src={Icon} alt={icon} icon={icon} />}
            <ButtonText>{text}</ButtonText>
            <ButtonSubline>{subline}</ButtonSubline>
        </StyledTileButton>
    );
}

const StyledTileButton = styled.button<{ color: string; }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 80px;
    border: none;
    border-radius: 8px;
    background-color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-1)"
                : color === "green" ? "var(--color--green-1)"
                    : "var(--color--pink-1)"
            : color === "blue" ? "var(--color--blue-4)"
                : color === "green" ? "var(--color--green-3)"
                    : "var(--color--pink-3)"
    };
    color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-3)"
                : color === "green" ? "var(--color--green-4)"
                    : "var(--color--pink-4)"
            : "white"
    };
    
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    transition: background-color 0.3s, opacity 0.3s;

    &:not(:disabled):hover {
        background-color: ${({ color }) =>
        color === "blue" ? "var(--color--blue-5)" :
            color === "green" ? "var(--color--green-5)" :
                "var(--color--pink-4)"};
    }
`

const ButtonIcon = styled.img<{ icon: string; }>`
    height: ${({ icon }) =>
        icon === '' ? '0' : '40px'};
    width: ${({ icon }) =>
        icon === '' ? '0' : '40px'};
    `
const ButtonText = styled.div`
    font-weight: 800;
    text-transform: uppercase;
`
const ButtonSubline = styled.div``

export default TileButton;