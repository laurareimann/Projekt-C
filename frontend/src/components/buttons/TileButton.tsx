import styled from 'styled-components';
import BikeIcon from '../../assets/icons/bike_white.svg';
import SkateIcon from '../../assets/icons/skateboard_white.svg';
import ScooterIcon from '../../assets/icons/scooter_white.svg';
import TramIcon from '../../assets/icons/tram_white.svg';
import BusIcon from '../../assets/icons/bus_white.svg';
import WalkingIcon from '../../assets/icons/walking_white.svg';
import { useState } from 'react';


type TileButtonProps = {
    color?: string;
    icon?: string;
    text?: string;
    subline?: string;
    onClick?: () => void; // Adding onClick function
};

function TileButton({ color = "blue", icon = '', text = '', subline = '', onClick }: TileButtonProps) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        if (onClick) {
            onClick();
        }
    };

    const iconMap: { [key: string]: string } = {
        bike: BikeIcon,
        skate: SkateIcon,
        scooter: ScooterIcon,
        tram: TramIcon,
        bus: BusIcon,
        walking: WalkingIcon,
    };
    const Icon = iconMap[icon] || null;
    return (
        <StyledTileButton color={color} isSelected={isSelected} onClick={handleClick}>
            {Icon && <ButtonIcon src={Icon} alt={icon} icon={icon} />}
            <ButtonText>{text}</ButtonText>
            <ButtonSubline>{subline}</ButtonSubline>
        </StyledTileButton>
    );
}

const StyledTileButton = styled.button<{ color: string; isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 80px;
    border: 1px solid transparent;
    border-radius: 8px;
    background-color: ${({ color, isSelected }) =>
        isSelected
            ? color === "blue" ? "var(--color--blue-4)" :
                color === "green" ? "var(--color--green-3)" :
                    "var(--color--pink-3)"
            : color === "blue" ? "var(--color--blue-2)" :
                color === "green" ? "var(--color--green-2)" :
                    "var(--color--pink-2)"
    };
    color: white;
    
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    transition: background-color 0.3s, opacity 0.3s;

    &:not(:disabled):hover {
    border: 3px solid ${({ color }) =>
        color === "blue" ? "var(--color--blue-4)" :
            color === "green" ? "var(--color--green-3)" :
                "var(--color--pink-3)"};
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