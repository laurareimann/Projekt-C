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
import Data from 'C:/Users/Nico/Documents/GitHub/Projekt-C/frontend/ValuesForDetailedResult.json';
//import { InfoWindow } from "react-google-maps";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

let placesMapV2: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;
let setupCheck: boolean = false;
let updateCheck: boolean = false;
//Arrays in denen die NearbySearch-Ergebnisse gespeichert werden
//Supermärkte,Läden et cetera
const currentCategory1: Array<google.maps.LatLngLiteral> = []
//Gesundheitswesen
const currentCategory2: Array<google.maps.LatLngLiteral> = []
//Öffentliche Verkehrsmittel(for now)
const currentCategory3: Array<google.maps.LatLngLiteral> = []

interface MarkerWindow {
  id: number
  address: string;
  location: LatLngLiteral;
  name: string,
  prevState: null
}

//Variablen für die Berechnung des Scores
let fastestRouteGroceries: number = 10000;
let fastestRouteHealth: number = 10000;
let fastestRouteTransit: number = 10000;
let finalMean: number;
let currentDuration: number;
//Testweise bools, um Berechnung zu fixen
let groceryBool: boolean = false;
let healthBool: boolean = false;
let transitBool: boolean = false;

//Temp colours für die Buttons
let GroceryButtonString: string = "";
let HealthButtonString: string = "";
let TransitButtonString: string = "";

//Temp colours for the travelmode buttons
let WalkingButtonString: string = "darkPink";
let BicycleButtonString: string = "";
let DrivingButtonString: string = "";
let TransitButtonStringTravelMode: string = "";


const markersWithInfoGroceries: Array<MarkerWindow> = []
const markersWithInfoHealth: Array<MarkerWindow> = []
const markersWithInfoTransit: Array<MarkerWindow> = []
const MarkersArrayTogether = [markersWithInfoGroceries, markersWithInfoHealth, markersWithInfoTransit]

//Test, ob temp-Variablen außerhalb von Komponente gespeichert werden sollten
let tempCurrentScore: number = 42;
let tempCurrentTravelMode: string = "walking";
let tempStartName:string;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redirectCheckArray:any =[];
let checkForLoadFlag:boolean;
let addressToLoad:string = "";
let addressToLoadLat:number;
let addressToLoadLng:number;
let altCenter:google.maps.LatLngLiteral;
let finalCenter:google.maps.LatLngLiteral;

  //Temporöre Variablen zu Kontextvariablen
  const tempGroceryArray:Array<number>=[0.2,0.1];
  const tempHealthArray:Array<number>=[1.3,4.2];
  const tempTransitArray:Array<number>=[5.2,2.5];
  let tempHealthDuration:number = 42;
  let tempGroceryDuration:number = 42;
  let tempTransitDuration:number = 42;
  let tempClosestGroceryAddress:string;
  let tempClosestHealthAddress:string;
  let tempClosestTransitAddress:string;
  let tempClosestGroceryName:string;
  let tempClosestHealthName:string;
  let tempClosestTransitName:string;
  const tempSearchResultArray:Array<number>=[1.2,3.4];

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
    const startingSpot={lat: Data.currentStartingSpot[0], lng: Data.currentStartingSpot[1]};
    const grocerySpot={lat: Data.currentClosestGrocery[0], lng: Data.currentClosestGrocery[1]};
    const healthSpot ={lat: Data.currentClosestHealth[0], lng: Data.currentClosestHealth[1]};
    const transitSpot={lat: Data.currentClosestTransit[0], lng: Data.currentClosestTransit[1]};
    const travelMode = Data.currentTravelMode;



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


  const selectRouteFromButton = () => {

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
    console.log("Derzeitige Dauer mit gewähltem travelmode: " + currentDuration);
  }

 



  

  return (
    <div>
      <GoogleMap zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
        //Anzeige der Route(n)
          {directions && <DirectionsRenderer directions={directions} />}

          {/* {shouldRenderCircles && spot && circles.map((circles, index) => (
            <Circle
              key={index}
              center={spot}
              radius={circles.radius}
              options={circles.options}
            />
          ))} */}

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


