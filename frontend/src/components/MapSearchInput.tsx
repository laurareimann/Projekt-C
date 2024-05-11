/* eslint-disable @typescript-eslint/no-unused-vars */
//Wip falls wir doch die searchbar 100% selbst designen
//Vorerst einmal die angepasste Version ausm Tutorial, da diese mit Combobox schon einiges an Arbeit abnimmt 
import { Placeholder } from "react-bootstrap";
import styled from "styled-components";

const MapInputContainer = styled.div`
    
`

const MapInputForm = styled.input`
    
    width:90%;
    height:35px;
    background-color:var(--color--blue-1);
    border: 4px solid var(--color--blue-3);
    border-radius: 20px;
    margin-bottom: 0.5rem;
    padding-left: 16px;

    &:focus{
        outline:none;
        background-color:white;
    }
    &::placeholder{
        font-size:16px;
        font-weight:400px;
        color:grey;
    }

`

const SuggestionsContainer = styled.div`
    
`

const SuggestionList = styled.ul`
    
    

`


const SuggestionItem = styled.li`

list-style:none;
margin-bottom: 0.4em;

&:hover{
    background-color: var(--color--bl);
}

`

function MapInputBar(){

    return (
        <MapInputContainer>

        <MapInputForm
            
            placeholder="Preview Adress"
            >
        </MapInputForm>

    </MapInputContainer>
    )

}

export default MapInputBar;