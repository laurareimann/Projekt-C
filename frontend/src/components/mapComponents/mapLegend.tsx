import styled from "styled-components";


const LegendContainer = styled.div`
  position: absolute;
  bottom: 75%;
  left: 5px;
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
  }

const mapLegend: React.FC<MapLegendProps> = ({ circleRadii, circleColors}) => {
    return (
        <LegendContainer>
            {circleRadii.map((radius, index) => (
                <LegendItem key={index}>
                    <LegendColorBox
                        color={
                            circleColors[index]
                        }
                    />
                    <span>{radius}m</span>
                </LegendItem>
            ))}
        </LegendContainer>
    );
}

export default mapLegend;