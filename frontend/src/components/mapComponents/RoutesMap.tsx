/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../globals.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import Places from "./places";
import styled from "styled-components";
import MapLegend from "./mapLegend";
import walkingIcon from "../../assets/white_walking.svg";
import { useScore } from "./StreetProvider";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import AddressData from "../../../ValuesForDetailedResult.json"
import RoutesContainer from '../../components/RoutesContainer.tsx';
  
//import { InfoWindow } from "react-google-maps";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;



// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redirectCheckArray:any =[];
let checkForLoadFlag:boolean;
let addressToLoad:string = "";
let addressToLoadLat:number;
let addressToLoadLng:number;
let altCenter:google.maps.LatLngLiteral;
let finalCenter:google.maps.LatLngLiteral;



  const throwToast = (errorMessage: string) => {
    toast.info(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}

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

const StyledPrioButton = styled.button`
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
    padding: 12px 16px;
    width: 40%;
    height: fit-content;
    border: none;
    border-radius: 30px;
    text-transform: uppercase;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    transition: background-color 0.3s, opacity 0.3s;

    &:not(:disabled):hover {
        background-color: ${({ color }) =>
    color === "blue" ? "var(--color--blue-5)" :
      color === "green" ? "var(--color--green-5)" :
        "var(--color--pink-4)"};
    }


    @media (max-width: 1440px) {
      width: 75%;
    }

    @media (max-width: 768px) {
      width: 35%;
    }

    @media (max-width: 425px) {
      width: 50%;
    }

`;

const ButtonGrid = styled.div`
display: grid;
grid-gap: 8px;
place-items:center;
width: fit-content;
grid-template-columns: 1fr 1fr 1fr 1fr;
margin-bottom: 5px;
`

const MapAndPrioGrid = styled.div`
display: grid;
grid-gap:4px;
place-items:center;
width:100%;
grid-template-columns: 1fr 60% 1fr;
margin-bottom: 10px;

@media (max-width: 768px) {
  margin-left: 0;
  grid-template-columns: 1fr;
}
`

const PriorityGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items: start;
margin-bottom: 10px;
width: 100%;
grid-template-columns: 1fr;

@media (max-width: 768px) {
  place-items: center;
}
`
const ControlContainer = styled.div`
  height:fit-content;
  width: 500px;
  margin:auto;
  padding: 0.3rem;
  background-color: var(--color--pink-3);
  border-radius:20px;

  @media (max-width: 768px) {
    width: 370px;
  }

  @media (max-width: 375px) {
    width: 310px;
  }
`
const ScoreContainerGrid = styled.div`
display: grid;
grid-gap: 15px;
place-items:center;
grid-template-columns: 1fr 1fr 1fr;
margin-bottom: 10px;
@media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`

const getCookie = (name:string) =>{
  const cookies = document.cookie.split("; ").find((row)=> row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
}

const StyledInput = styled.input<InputProps>`
    background-color: ${({ $isValid }) =>
        $isValid
            ? "white" : "var(--color--error-red-light)"
    };

    color: ${({ disabled, $isValid }) =>
        disabled
            ? "var(--color--disabled-gray)" : $isValid
                ? "var(--color--blue-5)" : "var(--color--error-red)"
    };
    
    border: 2.5px solid ${({ disabled, $isValid }) =>
        disabled
            ? "var(--color--disabled-gray)" : $isValid
                ? "var(--color--blue-5)" : "var(--color--error-red)"
    }; 
    font-weight: 700;
    font-size: 18px; 
    height: 60px; 
    padding-left: 16px;
    outline: 0;
    border-radius: 8px;
    display: flex;


    &:not(disabled){
        border: 2.5px solid  ${({ $isValid }) =>
        $isValid
            ? "var(--color--pink-2)" : "var(--color--error-red)"};
    }
    


    &:not(:disabled):hover {

        border: 2.5px solid  ${({ $isValid }) =>
        $isValid
            ? "var(--color--pink-3)" : "var(--color--error-red)"};
        color: ${({ $isValid }) =>
        $isValid
            ? "var(--color--pink-3)" : "var(--color--error-red)"};
    };

    &::placeholder{
        font-size: 16px;
        font-weight: 400;
        color: "var(--color--disabled-gray)"
    };

    @media (min-width: 769px) {
        width: 100%;
    }

    @media (max-width:768px){
        width:100%;
    }
`;

interface InputProps {
  $isValid?: boolean; //wird irrelevant sobald regex funktioniert
}

const LoginContainer = styled.div`
    width:500px;
    border: 8px solid var(--color--pink-1);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    grid-gap: 32px;
    align-items: center;

    @media (max-width: 768px) {
        border: none;
        height: 100%;
        width:100%;
        justify-content: center;
    }
`




interface InputProps {
  $isValid?: boolean; //wird irrelevant sobald regex funktioniert
}



const InputWrapper = styled.div`
    width: fit-content;
    display: grid;
    grid-gap: 12px;
    justify-items: left;
    
    @media (max-width: 768px) {
    }
`

const currentUser = getCookie("username");

const defaultColors = ["green", "yellow", "red"];

const Searchbar = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items:flex-start;
  gap: 4px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 
async function checkForLoadFromProfileFunc(){

  console.log("Checking whether page needs to be redirected");

  try{
    axios.get("http://localhost:8080/checkForLoadFromProfile").then((
      res:{data:string}
    )=>{
      if(res.data!=""){
      redirectCheckArray = res.data;

      console.log("The following is the reload check array");
      console.log(redirectCheckArray);

      const formattedCheckArray = JSON.parse(redirectCheckArray);
  
      addressToLoad = formattedCheckArray.AddressToSend;
      console.log(addressToLoad)
      checkForLoadFlag = formattedCheckArray.ShouldLoadBool;
      
      addressToLoadLat = formattedCheckArray.AddressLatToSend;
      
      addressToLoadLng = formattedCheckArray.AddressLngToSend;
      console.log("Should the map be redirected: " + checkForLoadFlag)  
    }

    altCenter = {lat:addressToLoadLat,lng:addressToLoadLng};

    console.log(altCenter)

    if(checkForLoadFlag == true){
      
      finalCenter = altCenter
      
    }else{
      finalCenter={lat: 53.5688823, lng: 10.0330191 }
    }

    })

  }catch(e){
    console.log(e)
  }

}

checkForLoadFromProfileFunc();

    //const startingSpot = Data.currentClosestGrocery;
    const startingSpot={lat: AddressData.currentStartingSpot[0], lng: AddressData.currentStartingSpot[1]};
    const grocerySpot={lat: AddressData.currentClosestGrocery[0], lng: AddressData.currentClosestGrocery[1]};
    const healthSpot ={lat: AddressData.currentClosestHealth[0], lng: AddressData.currentClosestHealth[1]};
    const transitSpot={lat: AddressData.currentClosestTransit[0], lng: AddressData.currentClosestTransit[1]};
    const travelMode = AddressData.currentTravelMode;



export default function RoutesMap() {

  console.log(startingSpot +"..."+ healthSpot);



  //Wenn die map initialisiert wird, ist der default spot auf der HAW Finkenau
  const center = useMemo<LatLngLiteral>(() => ({lat:finalCenter.lat,lng:finalCenter.lng}), []);
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const directService = new google.maps.DirectionsService();


  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: import.meta.env.VITE_MAP_ID
    }), []);

 

 


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);


  const showGroceryRoute = () => {

    //setTravelMode(travelModeParam);

    //Switch-case, um Route im richtigen Modus anzeigen zu lassen.
    switch (travelMode) {
      case "walking":
        directService.route({
          //origin: spot,
          origin: startingSpot,
          //destination: spotLiterals,
          destination: grocerySpot,
          travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        })
        break;

       case "driving":
         directService.route({
           origin: startingSpot,
           destination: grocerySpot,
           travelMode: google.maps.TravelMode.DRIVING
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
       case "bicycle":
         directService.route({
           origin: startingSpot,
           destination: grocerySpot,
           travelMode: google.maps.TravelMode.BICYCLING
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
       case "transit":
         directService.route({
           origin: startingSpot,
           destination: grocerySpot,
           travelMode: google.maps.TravelMode.TRANSIT
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
    }
  }

  const showHealthRoute = () => {

    //setTravelMode(travelModeParam);

    //Switch-case, um Route im richtigen Modus anzeigen zu lassen.
    switch (travelMode) {
      case "walking":
        directService.route({
          //origin: spot,
          origin: startingSpot,
          //destination: spotLiterals,
          destination: healthSpot,
          travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        })
        break;

       case "driving":
         directService.route({
           origin: startingSpot,
           destination: healthSpot,
           travelMode: google.maps.TravelMode.DRIVING
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
       case "bicycle":
         directService.route({
           origin: startingSpot,
           destination: healthSpot,
           travelMode: google.maps.TravelMode.BICYCLING
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
       case "transit":
         directService.route({
           origin: startingSpot,
           destination: healthSpot,
           travelMode: google.maps.TravelMode.TRANSIT
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
    }
  }

  const showTransitRoute = () => {

    //setTravelMode(travelModeParam);

    //Switch-case, um Route im richtigen Modus anzeigen zu lassen.
    switch (travelMode) {
      case "walking":
        directService.route({
          //origin: spot,
          origin: transitSpot,
          //destination: spotLiterals,
          destination: grocerySpot,
          travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        })
        break;

       case "driving":
         directService.route({
           origin: startingSpot,
           destination: transitSpot,
           travelMode: google.maps.TravelMode.DRIVING
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
       case "bicycle":
         directService.route({
           origin: startingSpot,
           destination: transitSpot,
           travelMode: google.maps.TravelMode.BICYCLING
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
       case "transit":
         directService.route({
           origin: startingSpot,
           destination: transitSpot,
           travelMode: google.maps.TravelMode.TRANSIT
         }, (result, status) => {
           if (status === "OK" && result) {
             setDirections(result);
           }
         })
         break;
    }
  }

  

  return (
    <div>
      
      <ScoreContainerGrid>
        <RoutesContainer
            name={AddressData.currentClosestHealthName}
            score={AddressData.currentHealthDuration.toString()}
            street={AddressData.currentClosestHealthAddress.split(",")[0]}
            zip={AddressData.currentClosestHealthAddress.split(",")[1].split(" ")[1]}
            city={AddressData.currentClosestHealthAddress.split(",")[1].split(" ")[2]}
            onClick = {()=>{showHealthRoute()}}>
        </RoutesContainer>

        <RoutesContainer
            name={AddressData.currentClosestGroceryName}
            score={AddressData.currentGroceryDuration.toString()}
            street={AddressData.currentClosestGroceryAddress.split(",")[0]}
            zip={AddressData.currentClosestGroceryAddress.split(",")[1].split(" ")[1]}
            city={AddressData.currentClosestGroceryAddress.split(",")[1].split(" ")[2]}
            onClick = {()=>{showGroceryRoute()}}>
         </RoutesContainer>

         <RoutesContainer
            name={AddressData.currentClosestTransitName}
            score={AddressData.currentTransitDuration.toString()}
            street={AddressData.currentClosestTransitAddress.split(",")[0]}
            zip={AddressData.currentClosestTransitAddress.split(",")[1].split(" ")[1]}
            city={AddressData.currentClosestTransitAddress.split(",")[1].split(" ")[2]}
            onClick = {()=>{showTransitRoute()}}>
          </RoutesContainer>
      </ScoreContainerGrid>                    

      <GoogleMap zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}>

        //Anzeige der Route(n)
          {directions && <DirectionsRenderer directions={directions} />}

        </GoogleMap>

    </div>
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};


