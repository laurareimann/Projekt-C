/* eslint-disable @typescript-eslint/no-unused-vars */
//useContext rettet mir das Leben und zahlreiche Haare vorm Rausziehen


import React,{useState, useContext, ReactNode, Dispatch, SetStateAction} from "react";

//Kurz gesagt hilft es, components zu reloaden, wenn eine Variable, wie z.B. die Adresse von einem anderen Component aus geändert wird.
//Gebraucht wird es, weil React doof ist und das sonst nur tut, wenn der Component das selber tut oder man sich dafür zehnmal verrenkt.
//Es gibt bestimmt einen einfacheren Weg, den ich nicht gefunden habe, aber ich musste einmal über React ranten xD

//Der Context der Variable
const StreetContext = React.createContext("preview Street");
//Der Context zum Ändern der Variable 
const UpdateStreetContext = React.createContext<Dispatch<SetStateAction<string>>>();

export const useStreetName = () => {
    return useContext(StreetContext);
}

export const useUpdateStreetContext = () => {
    return useContext(UpdateStreetContext);
}

//Dieser Component wird um die ganze App gewrapped, damit es funktioniert
export const StreetProvider = ({value,children}:{value:string,children:ReactNode}) => {
    const [streetName, setStreetName] = useState(value);
    return(
        <StreetContext.Provider value ={streetName}>
            <UpdateStreetContext.Provider value = {setStreetName}>
                {children}
            </UpdateStreetContext.Provider>
        </StreetContext.Provider>
    )
}



export default StreetProvider;