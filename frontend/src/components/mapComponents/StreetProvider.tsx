/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
//useContext rettet mir das Leben und zahlreiche Haare vorm Rausziehen


import React,{useState, useContext, ReactNode, Dispatch, SetStateAction} from "react";

//Kurz gesagt hilft es, components zu reloaden, wenn eine Variable, wie z.B. die Adresse von einem anderen Component aus geändert wird.
//Gebraucht wird es, weil React doof ist und das sonst nur tut, wenn der Component das selber tut oder man sich dafür zehnmal verrenkt.
//Es gibt bestimmt einen einfacheren Weg, den ich nicht gefunden habe, aber ich musste einmal über React ranten xD

//Der Context der Variable
const StreetContext = React.createContext("preview Street");
const StreetNumberContext = React.createContext("preview StreetNumber");
const ZipCodeContext = React.createContext("22081");
const CityContext = React.createContext("Hamburg");
//Der Context zum Ändern der Variable 
const UpdateStreetNameContext = React.createContext<Dispatch<SetStateAction<string>> | null>(null);
const UpdateStreetNumberContext = React.createContext<Dispatch<SetStateAction<string>> | null>(null);
const UpdateZipCodeContext = React.createContext<Dispatch<SetStateAction<string>> | null>(null);
const UpdateCityContext = React.createContext<Dispatch<SetStateAction<string>> | null>(null);

/*Export der Getter (alt)
export const useStreetNumber = () =>{
    return useContext(StreetNumberContext);
}

export const useStreetName = () => {
    return useContext(StreetContext);
}

export const useZipCode = () => {
    return useContext(ZipCodeContext);
}

export const useCity = () => {
    return useContext(CityContext);
}

export const useStreetContexts = () => {
    return (useContext(CityContext),useContext(ZipCodeContext),useContext);
}
*/

//Export der Setter
export const useUpdateStreetNameContext = () => {
    return useContext(UpdateStreetNameContext);
}

export const useUpdateStreetNumberContext = () => {
    return useContext(UpdateStreetNumberContext);
}

export const useUpdateZipCodeContext = () => {
    return useContext(UpdateZipCodeContext);
}

export const useUpdateCityContext = () => {
    return useContext(UpdateCityContext);
}

interface StreetProperties {
    zipCode?: string;
    setZipCode: (state:string) => void;
    currentCity?: string;
    setCity:(state:string) => void;
    streetName?: string;
    setStreet:(state:string) => void;

}

const streetContext = React.createContext<StreetProperties>({
    zipCode: "22081",
    setZipCode: (state:string) => {},
    currentCity: "Hamburg",
    setCity:(state:string) => {},
    streetName: "Finkenau 35",
    setStreet:(state:string) => {},
    
})


//Dieser Component wird um die ganze App gewrapped, damit es funktioniert
export const StreetProvider = ({cityValue,streetNameValue,streetNumberValue,zipCodeValue,children}:{cityValue:string,zipCodeValue:string,streetNameValue:string,streetNumberValue:string,children:ReactNode}) => {
    
    const [streetName, setStreet] = useState(streetNameValue);
    const [streetNumber, setStreetNumber] = useState(streetNumberValue);
    const [zipCode,setZipCode] = useState(zipCodeValue);
    const [currentCity,setCity] = useState(cityValue);

    return(
        <streetContext.Provider value = {{
            
            streetName,zipCode,currentCity,setStreet,setZipCode,setCity}}>
            {children}

        </streetContext.Provider>
    )
}

export const useStreetNameNew = () =>{
const {streetName,setStreet} = useContext(streetContext);
return {streetName,setStreet}
}


export const useZipCodeNew = () =>{
    const {zipCode,setZipCode} = useContext(streetContext);
    return {zipCode,setZipCode}
}

export const useCityNew = () =>{
    const {currentCity,setCity} = useContext(streetContext);
    return {currentCity,setCity}
    }

export default StreetProvider;