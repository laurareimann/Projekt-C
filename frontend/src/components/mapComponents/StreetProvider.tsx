/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
//useContext rettet mir das Leben und zahlreiche Haare vorm Rausziehen


import React,{useState, useContext, ReactNode} from "react";

//Kurz gesagt hilft es, components zu reloaden, wenn eine Variable, wie z.B. die Adresse von einem anderen Component aus geändert wird.
//Gebraucht wird es, weil React doof ist und das sonst nur tut, wenn der Component das selber tut oder man sich dafür zehnmal verrenkt.
//Es gibt bestimmt einen einfacheren Weg, den ich nicht gefunden habe, aber ich musste einmal über React ranten xD



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
    setZipCode: (_state:string) => {},
    currentCity: "Hamburg",
    setCity:(_state:string) => {},
    streetName: "Finkenau 35",
    setStreet:(_state:string) => {},
    
})


//Dieser Component wird um die ganze App gewrapped, damit es funktioniert
export const StreetProvider = ({cityValue,streetNameValue,zipCodeValue,children}:{cityValue:string,zipCodeValue:string,streetNameValue:string,children:ReactNode}) => {
    
    const [streetName, setStreet] = useState(streetNameValue);
    const [zipCode,setZipCode] = useState(zipCodeValue);
    const [currentCity,setCity] = useState(cityValue);

    return(
        <streetContext.Provider value = {{
            
            streetName,zipCode,currentCity,setStreet,setZipCode,setCity}}>
            {children}

        </streetContext.Provider>
    )
}

//Die getter und setter exportieren
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