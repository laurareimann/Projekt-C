import styled from 'styled-components';
import Button from './buttons/Buttons';
import Address from './Address';



const StyledContainer = styled.div <{ hasOutline: boolean; color: string;}>`
    margin-top:2%;
    margin-left: 2%;
    display: inline-block;
    height:100%;
    width:95%;
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




const ContainerContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    text-align: -webkit-center;
    padding: 2%;


    `

function ProfileHistoryContainer({hasOutline = true , street ="",  color = "pink", buttonText = "View results",savedAs="",onClick = ()=>{}}) {
    

    return (
        <StyledContainer color={color} hasOutline={hasOutline}>
            <ContainerContentWrapper>
                <h3>{savedAs}</h3>
                <Address color={color} street={street} zip="" city=''></Address>
                <Button onClick={onClick} color={color}>{buttonText}</Button>
            </ContainerContentWrapper>
        </StyledContainer>
    );
}

export default ProfileHistoryContainer;