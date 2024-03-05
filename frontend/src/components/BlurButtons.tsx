import styled from 'styled-components';

const TopLayer = styled.button`
  position: relative;
  justify-content: center;
  display: flex;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);  color: white;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 30px;
  padding: 10px 16px;
  font-size: 16px;
  width: fit-content;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  z-index: 1;
  color: white;

  &:hover .bgblurr{
    transition: box-shadow 0.3s ease;
    box-shadow: none;    
  }

  &:hover .background{
    transition: left 0.3s ease, top 0.3s ease, filter 0.3s ease;
    top: 0px;
    left: 0px;
    filter: blur(0);
  }
`;

const BackgroundBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: inset 0px 0px 10px #ffffff6b;`

const BlurLayer = styled.div`
position: absolute;
  width: 100%;
  height: 100%;
  top: 3px;
  left: 3px;
  background-color: ${({ color }) => color === "blue" ? "var(--color--blue-5)" : color === "green" ? "var(--color--green-4)" : "var(--color--pink-4)"};
  border-radius: 30px;
  z-index: -2;
  mix-blend-mode: overlay;
  filter:blur(3px);
`


const BackgroundCutout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  border-radius: 30px;
  background: white;
  `;

const BackgroundLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 3px;
  left: 3px;
  background-color: ${({ color }) => color === "blue" ? "var(--color--blue-5)" : color === "green" ? "var(--color--green-4)" : "var(--color--pink-4)"};
  border-radius: 30px;
  z-index: -2;
  mix-blend-mode: overlay;
`;

const BlurButton = ({ children = '', color = 'pink' }) => {
  return (
    <TopLayer>{children}
      <BackgroundBlur className='bgblurr'>
        <BlurLayer className='background' color={color} />
      </BackgroundBlur>
      <BackgroundCutout>
        <BackgroundLayer className='background' color={color} />
      </BackgroundCutout>
    </TopLayer>
  );
};

export default BlurButton;
