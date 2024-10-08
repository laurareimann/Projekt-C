import React from "react";
import styled from "styled-components";

// Warum beschwert er sich hier über fast refresh aber bei anderen nicht? Pls explain
const LegendContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(255, 255, 255, 0.85);
  padding: 10px 10px 5px 10px;
  border-radius: 0 0 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
`;

const LegendColorBox = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  border: 1px solid #999;
`;

const LegendIcon = styled.img`
  width: 15px;
  margin-right: 10px;
`;

const LegendText = styled.span`
  flex: 1;
  text-align: left;
`;


interface MapLegendProps {
    circleRadii: number[];
    circleColors: string[];
    logo?: string;
}

const mapLegend: React.FC<MapLegendProps> = ({ circleRadii, circleColors, logo }) => {
    const mapMarkers = [
        {
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            text: 'Grocery',
        },
        {
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            text: 'Health',
        },
        {
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            text: 'Transit',
        },
    ];

    return (
        <LegendContainer>
            {circleRadii.map((radius, index) => (
                <LegendItem key={index}>
                    <LegendColorBox color={circleColors[index]} />
                    {/* 15 Minuten Intervall hier festgelegt, wollte das nicht auch noch als Argument übergeben*/}
                    <LegendText>{radius}m - {15 * (index + 1)}min</LegendText>
                    {logo && (
                        // Render logo if available
                        <LegendIcon src={logo} alt="Walking" />
                    )}
                </LegendItem>
            ))}
            {mapMarkers.map((marker, index) => (
                <LegendItem key={index}>
                    <LegendIcon src={marker.icon} alt={marker.text} />
                    <LegendText>{marker.text}</LegendText>
                </LegendItem>
            ))}
        </LegendContainer>
    );
}

export default mapLegend;