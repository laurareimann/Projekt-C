/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */


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
    currentNearby:Array<google.maps.LatLngLiteral>;
    setNearby:(state:Array<google.maps.LatLngLiteral>) => void;
    currentScore?:string;
    setScore:(state:string)=> void;
}

const streetContext = React.createContext<StreetProperties>({
    zipCode: "22081",
    setZipCode: (_state:string) => {},
    currentCity: "Hamburg",
    setCity:(_state:string) => {},
    streetName: "Finkenau 35",
    setStreet:(_state:string) => {},
    currentNearby: [],
    setNearby:(_state:Array<google.maps.LatLngLiteral>) => {},
    currentScore:"42",
    setScore:(_state:string) =>{},
})


//Dieser Component wird um die ganze App gewrapped, damit es funktioniert
export const StreetProvider = (
{
    currentScoreValue,
    currentNearbyValue,
    cityValue,
    streetNameValue,
    zipCodeValue,
    children}:
{
    currentScoreValue:string,
    currentNearbyValue:Array<google.maps.LatLngLiteral>,
    cityValue:string,
    zipCodeValue:string,
    streetNameValue:string,
    children:ReactNode}) => {
    
    const [streetName, setStreet] = useState(streetNameValue);
    const [zipCode,setZipCode] = useState(zipCodeValue);
    const [currentCity,setCity] = useState(cityValue);
    const [currentNearby,setNearby] = useState(currentNearbyValue);
    const [currentScore,setScore] = useState(currentScoreValue);

    return(
        <streetContext.Provider value = {{
            
            currentScore,currentNearby,streetName,zipCode,currentCity,
            setScore,setStreet,setZipCode,setCity,setNearby}}>
            {children}

        </streetContext.Provider>
    )
}

//Die Contextvariablen werden exportiert
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

export const useNearby = () =>{
    const {currentNearby,setNearby} = useContext(streetContext);
    return {currentNearby,setNearby}
}

export const useScore = ()=>{
    const {currentScore,setScore} = useContext(streetContext);
    return {currentScore,setScore}
}

export default StreetProvider;