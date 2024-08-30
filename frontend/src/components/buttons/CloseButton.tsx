import styled from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: var(--color--white-shade);
  border: 3px solid var(--color--blue-3);
  cursor: pointer;  


  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 11px;
    left: 3px;
    width: 18px;
    height: 2px;
    background-color: var(--color--blue-5);
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export default CloseButton;