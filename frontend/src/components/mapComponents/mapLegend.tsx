import React from "react";
import styled from "styled-components";


// Warum beschwert er sich hier über fast refresh aber bei anderen nicht? Pls explain
const LegendContainer = styled.div`
  position: absolute;
  bottom: 75%;
  left: 4px;
  background: rgba(255, 255, 255, 0.85);
  padding: 10px;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const LegendColorBox = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  border: 1px solid #999;
`;


interface MapLegendProps {
    circleRadii: number[];
    circleColors: string[];
    logo?: string;
}

const mapLegend: React.FC<MapLegendProps> = ({ circleRadii, circleColors, logo}) => {
    return (
        <LegendContainer>
            {circleRadii.map((radius, index) => (
                <LegendItem key={index}>
                    <LegendColorBox
                        color={circleColors[index]} />
                    {/* 15 Minuten Intervall hier festgelegt, wollte das nicht auch noch als Argument übergeben*/}
                    <span>{radius}m - {15 * (index + 1)}min</span>
                    {logo && (
                        // Render logo if available
                        <img src={logo} alt="Walking" style={{ width: "20px", marginRight: "10px" }} />
                    )}
                </LegendItem>
            ))}
        </LegendContainer>
    );
}

export default mapLegend;