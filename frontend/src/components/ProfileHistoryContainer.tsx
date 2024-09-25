import styled from 'styled-components';
import Address from './Address';

const StyledContainer = styled.div <{ hasOutline: boolean; color: string;}>`
    margin: 0;
    display: inline-block;
    height:100%;
    width:100%;
    box-sizing: border-box;
    border-radius: 26px;
    align-content: center;
    justify-content: center;
    box-shadow: 0px 0px 18px rgba(255, 255, 255, 0.5);
    color: ${({ color }) =>
        (color === "blue" ? "var(--color--blue-5)" :
            (color === "green" ? "var(--color--green-5)" :
                "var(--color--pink-5)"))};
    
    background-color: ${({ hasOutline, color }) =>
        hasOutline ? "var(--color--white-shade)" :
            (color === "blue" ? "var(--color--blue-1)" :
                (color === "green" ? "var(--color--green-1)" :
                    "var(--color--pink-1)"))};

    border: ${({ hasOutline, color }) =>
        hasOutline ? (color === "blue" ? "var(--color--blue-3) 3px solid" :
            (color === "green" ? "var(--color--green-3) 3px solid" :
                "var(--color--pink-3) 3px solid")) :
            "none"};
`;

const StyledButton = styled.button`
    background-color: ${({ color, disabled }) =>
    disabled
      ? color === "blue" ? "var(--color--blue-1)"
        : color === "green" ? "var(--color--green-1)"
          : "var(--color--pink-1)"
      : color === "blue" ? "var(--color--blue-4)"
        : color === "green" ? "var(--color--green-3)"
          : color === "darkPink" ? "var(--color--pink-5)"
            : "var(--color--pink-3)"

  };
    color: ${({ color, disabled }) =>
    disabled
      ? color === "blue" ? "var(--color--blue-3)"
        : color === "green" ? "var(--color--green-4)"
          : "var(--color--pink-4)"
      : "white"
  };
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px;
    width: fit-content;
    border: none;
    border-radius: 30px;
    height:90%;
    text-transform: uppercase;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    transition: background-color 0.3s, opacity 0.3s;

    &:not(:disabled):hover {
        background-color: ${({ color }) =>
    color === "blue" ? "var(--color--blue-5)" :
      color === "green" ? "var(--color--green-5)" :
        "var(--color--pink-4)"};
    }
`;



const ContainerContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    text-align: -webkit-center;
    padding: 2%;
`

function ProfileHistoryContainer({hasOutline = true ,city = "", street ="",  color = "pink", zip="", buttonText = "View results",savedAs="",onClick = ()=>{}}) {
    

    return (
        <StyledContainer color={color} hasOutline={hasOutline}>
            <ContainerContentWrapper>
                <h3>{savedAs}</h3>
                <Address color={color} street={street} zip={zip} city={city}></Address>
                <StyledButton onClick={onClick} color={color}>{buttonText}</StyledButton>
            </ContainerContentWrapper>
        </StyledContainer>
    );
}

export default ProfileHistoryContainer;