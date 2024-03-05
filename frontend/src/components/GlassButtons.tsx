import styled from 'styled-components';

const StyledGlassButton = styled.button`
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);  color: white;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.2), inset 0px 0px 10px #ffffff6b;
  border: none;
  border-radius: 30px;
  padding: 10px 16px;
  font-size: 16px;
  width: fit-content;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
        box-shadow: 0px 0px 18px rgba(255, 255, 255, 0.5);
  }

  &:hover .background {
    left: 0;
    top: 0;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color === "blue" ? "var(--color--blue-5)" : color === "green" ? "var(--color--green-4)" : "var(--color--pink-4)"};
  border-radius: 30px;
  z-index: -1;
  backdrop-filter: blur(3px);

  transition: left 0.3s ease, top 0.3s ease;
`;

const GlassButton = ({ children = '', color = 'pink' }) => {
  return (
    <StyledGlassButton>
      <Background className='background' color={color} />
      {children}
    </StyledGlassButton>
  );
};

export default GlassButton;
