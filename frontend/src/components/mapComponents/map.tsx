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
import bikeIcon from "../../assets/white_bike.svg";
import carIcon from "../../assets/white_car1.svg";
import transitIcon from "../../assets/white_tram.svg";
import { useCityNew, useScore, useStreetNameNew, useZipCodeNew } from "./StreetProvider";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import AdaptedFilterContainer from "../filterComponents/FilterAdapted";
import ScoreContainer from "../ScoreContainer";
import { useNavigate } from 'react-router-dom';


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

let placesMapV2: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;
let setupCheck: boolean = false;


//Arrays in denen die NearbySearch-Ergebnisse gespeichert werden
//Supermärkte,Läden et cetera
interface MarkerWindow {
  id: number
  address: string;
  location: LatLngLiteral;
  name: string,
  buildingType: string,
}

//Variablen für die Berechnung des Scores
let fastestRouteGroceries: number = 10000;
let fastestRouteHealth: number = 10000;
let fastestRouteTransit: number = 10000;
let fastestRoutePreference: number = 10000;
let finalMean: number;
let currentDuration: number;
//Testweise bools, um Berechnung zu fixen
let groceryBool: boolean = false;
let healthBool: boolean = false;
let transitBool: boolean = false;
let preferenceBool: boolean = false;
let isPreferenceEmpty: boolean = true;

//Temp colours für die Buttons
let GroceryButtonString: string = "";
let HealthButtonString: string = "";
let TransitButtonString: string = "";
let preferenceButtonString: string = "";

//Temp colours for the travelmode buttons
let WalkingButtonString: string = "darkPink";
let BicycleButtonString: string = "";
let DrivingButtonString: string = "";
let TransitButtonStringTravelMode: string = "";

//Marker-Arrays in denen u.a. die Orte der Marker auf der map gespeichert werden
const markersWithInfoGroceries: Array<MarkerWindow> = [];
const markersWithInfoHealth: Array<MarkerWindow> = [];
const markersWithInfoTransit: Array<MarkerWindow> = [];
const markersWithInfoPersonalFilters: Array<MarkerWindow> = [];
const MarkersArrayTogether = [markersWithInfoGroceries, markersWithInfoHealth, markersWithInfoTransit, markersWithInfoPersonalFilters]

//Test, ob temp-Variablen außerhalb von Komponente gespeichert werden sollten
let tempCurrentScore: number = 42;
let tempCurrentTravelMode: string = "walking";
let tempStartName: string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redirectCheckArray: any = [];
let checkForLoadFlag: boolean = false;
let addressToLoad: string = "";
let addressToLoadLat: number;
let addressToLoadLng: number;
let addressCityToLoad: string = "";
let addressZipToLoad: string = "";
let altCenter: google.maps.LatLngLiteral;
let finalCenter: google.maps.LatLngLiteral;
let canInputWindowBeClosedNotReact: boolean = false;
let isSaveButtonDisabled: boolean = true;



//Variablen zu detailed result page
const tempGroceryArray: Array<number> = [0.2, 0.1];
const tempHealthArray: Array<number> = [1.3, 4.2];
const tempTransitArray: Array<number> = [5.2, 2.5];
const tempPrefArray: Array<number> = [6.9, 9.6];
let tempHealthDuration: number = 42;
let tempGroceryDuration: number = 42;
let tempTransitDuration: number = 42;
let tempPreferenceDuration: number = 42;
let tempClosestGroceryAddress: string;
let tempClosestHealthAddress: string;
let tempClosestTransitAddress: string;
let tempClosestPreferenceAddress: string;
let tempClosestGroceryName: string;
let tempClosestHealthName: string;
let tempClosestTransitName: string;
let tempClosestPreferenceName: string;
const tempSearchResultArray: Array<number> = [1.2, 3.4];

//Array von strings der jeweiligen Filter
const personalPreferenceArray: Array<string> = [];
let preferenceArray: string;

const throwInfo = (errorMessage: string) => {
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

const throwError = (errorMessage: string) => {
  toast.error(errorMessage, {
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

interface PrioButtonProps {
  priority?: boolean;
  disabled?: boolean;
}

const StyledPrioButton = styled.button<PrioButtonProps>`
background-color: ${({ priority, disabled }) =>
    disabled ? "var(--color--green-1)" : priority ? "var(--color--green-5)" : "var(--color--green-3)"}; 
  color: ${({ disabled }) => (disabled ? "var(--color--green-4)" : "white")};
  
  &:hover {
    background-color: ${({ priority, disabled }) =>
    disabled ? "var(--color--green-1)" : priority ? "var(--color--green-4)" : "var(--color--green-4)"};
  }
  
  &:active,
  &:focus {
    background-color: ${({ disabled }) =>
    disabled ? "var(--color--green-1)" : "var(--color--green-5)"};
  }
  
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    width: -webkit-fill-available;
    border: none;
    border-radius: 6px;
    text-transform: uppercase;
    font-size: 0.75rem;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    transition: background-color 0.3s, opacity 0.3s;

    &:not(:disabled):hover {
        background-color: ${({ color }) =>
    color === "blue" ? "var(--color--blue-5)" :
      color === "green" ? "var(--color--green-5)" :
        "var(--color--green-4)"};
    }


    @media (max-width: 1440px) {
      //width: 75%;
    }

    @media (max-width: 768px) {
      //width: 35%;
    }

    @media (max-width: 425px) {
      //width: 50%;
    }

`;

const ButtonGrid = styled.div`
display: flex;
grid-gap: 8px;
place-items:center;
width: fit-content;
grid-template-columns: 1fr 1fr 1fr 1fr;
margin-bottom: 5px;
`
const PrioButtonGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-gap: 8px;
place-items:center;
justify-content: center;
width: fit-content;
margin: 5px 0;


@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;

}
`

const SaveButtonGrid = styled.div`
display: grid;
grid-gap: 10%;

grid-template-columns: 1fr 1fr;
margin-bottom: 5px;
align-items: center;

@media (max-width: 768px) {
  align-items: center;
  grid-gap: 1%;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 5px;
}

`

const MapAndPrioGrid = styled.div`
display: grid;
grid-gap:4px;
place-items:center;
width:100%;
grid-template-columns: 1fr 60% 1fr;

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

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));

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
    margin-bottom: 10%;
    margin-left: 0%;
    background-color: white;
    width:25%;
    height:fit-content;
    position: absolute;
    border: 8px solid var(--color--pink-1);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    grid-gap: 25px;
    align-items: center;
    z-index: 10;

    @media (max-width: 768px) {
        border-color: var(--color--pink-1);
        height: 30%;
        width:75%;
        justify-content: center;
    }
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ForceUpdateDiv = styled.div`
  z-index:1;
`

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
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

//Wenn Suche aus dem Profil geladen wird
async function checkForLoadFromProfileFunc() {

  console.log("Checking whether page needs to be redirected");

  try {
    axios.get("http://localhost:8080/checkForLoadFromProfile").then((
      res: { data: string }
    ) => {
      if (res.data != "") {
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

        addressZipToLoad = formattedCheckArray.ZipToSend;

        addressCityToLoad = formattedCheckArray.CityToSend;


      }
      //Übersehener case, falls das preloaden aus irgendeinem Grund schiefgeht
      if (res.data === "") {
        finalCenter = { lat: 53.5688823, lng: 10.0330191 }
      }

      altCenter = { lat: addressToLoadLat, lng: addressToLoadLng };


      if (checkForLoadFlag == true) {

        finalCenter = altCenter;


      } else {
        finalCenter = { lat: 53.5688823, lng: 10.0330191 }
      }
    })
  } catch (e) {
    console.log(e)
  }

}

//Check, ob die main page vom Profil aus mit einer gespeicherten Adresse geladen wurde
checkForLoadFromProfileFunc();

//Die gesetzten flags der Filter werden für den Algorithmus geladen
async function getPreferences() {
  //Präferenzen werden aus der dafür erstellten JSON-Datei gelesen
  try {

    personalPreferenceArray.splice(0, personalPreferenceArray.length);


    axios.get("http://localhost:8080/getPreferences").then((res: { data: string }) => {

      console.log("Fetching prefernces");
      preferenceArray = res.data;
      //Array "lesbar" machen
      const formattedPreferenceArray = JSON.parse(preferenceArray);
      console.log(formattedPreferenceArray.preferenceListSend[0])

      const arrayLength: number = formattedPreferenceArray.preferenceListSend.length;

      if (arrayLength > 0) {
        isPreferenceEmpty = false;
        //Filter auf die dazugehörigen Listen aufteilen
        for (let i = 0; i < formattedPreferenceArray.preferenceListSend.length; i++) {
          personalPreferenceArray.push(formattedPreferenceArray.preferenceListSend[i]);
        }

        console.log("Current preferences after JSON");
        console.log(personalPreferenceArray);
      }
      //Wenn keine Präferenzen gewählt wurden, soll das Array bei der Score-Berechnung nicht beachtet werden
      if (arrayLength == 0) {
        isPreferenceEmpty = true;
        personalPreferenceArray.splice(0, personalPreferenceArray.length);
      }
    })
  }
  catch (e) {
    console.log(e);
  }

}

export default function Map({ shouldRenderCircles = true, circleRadii = [1250, 2500, 3750], circleColors = defaultColors }) {

  //Wenn die map initialisiert wird, ist der default spot auf der HAW Finkenau
  const center = useMemo<LatLngLiteral>(() => ({ lat: finalCenter.lat, lng: finalCenter.lng }), []);
  const [directions, setDirections] = useState<DirectionsResult>();
  const [spot, setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const directService = new google.maps.DirectionsService();
  const [isPreferenceEmptyReact, setPreferenceEmptyReact] = useState(true);
  //Es müssen ab und an updates geforced werden, weil sonst die preference marker nicht geladen bzw. entfernt werden
  const [forceUpdateNum, setUpdateNum] = useState(0);

  //Variablen zur Score-Berechnung 
  const [selectedMarker, setSelectedMarker] = useState<MarkerWindow | null>()
  const [isGroceriesPriority, setGroceriesPriority] = useState(false);
  const [isHealthPriority, setHealthPriority] = useState(false);
  const [isTransitPriority, setTransitPriority] = useState(false);
  const [isPreferencePriority, setPreferencePriority] = useState(false);
  const [InitialCalculationDone, setCalculationDone] = useState(false);
  const [travelMode, setTravelMode] = useState("walking");
  const [currentDurationUseState, setCurrentDuration] = useState(0);

  //Kontextvariablen
  const updateScore = useScore().setScore;
  const updateStreet = useStreetNameNew().setStreet;
  const updateZipCode = useZipCodeNew().setZipCode;
  const updateCity = useCityNew().setCity;

  //Speicherung der derzeitigen Suche
  const [saveCurrentResultName, setCurrentResultName] = useState('');
  const [inputWindowOpenReact, setInputWindowOpen] = useState(false);


  //Check für den redirect vom Profil aus
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: import.meta.env.VITE_MAP_ID
    }), []);


  //Helper-map_setup
  //Center ist hier wieder unser Campus
  const defaultCenter = useMemo<LatLngLiteral>(() => ({ lat: 53.5688823, lng: 10.0330191 }), []);

  const optionsHelper = useMemo<MapOptions>(
    () => ({
      center: defaultCenter,
      zoom: 15
    }), [defaultCenter]
  )





  //Funktion, um Json-File zu updaten
  async function UpdateJson() {
    console.log("updating Json from frontend");

    console.log(tempGroceryArray)

    const GroceryLat = tempGroceryArray[0];
    const GroceryLng = tempGroceryArray[1];
    const HealthLat = tempHealthArray[0];
    const HealthLng = tempHealthArray[1];
    const TransitLat = tempTransitArray[0];
    const TransitLng = tempTransitArray[1];
    let PreferenceLat = tempPrefArray[0];
    let PreferenceLng = tempPrefArray[1];
    const SpotLat = tempSearchResultArray[0];
    const SpotLng = tempSearchResultArray[1];
    const currentGroceryDuration = tempGroceryDuration;
    const currentHealthDuration = tempHealthDuration;
    const currentTransitDuration = tempTransitDuration;
    let currentPreferenceDuration = tempPreferenceDuration;
    const currentStartPointAddress = tempStartName;
    const currentClosestGroceryAddress = tempClosestGroceryAddress;
    const currentClosestHealthAddress = tempClosestHealthAddress;
    const currentClosestTransitAddress = tempClosestTransitAddress;
    let currentClosestPreferenceAddress = tempClosestPreferenceAddress;
    const currentClosestGroceryName = tempClosestGroceryName;
    const currentClosestHealthName = tempClosestHealthName;
    const currentClosestTransitName = tempClosestTransitName;
    let currentClosestPreferenceName = tempClosestPreferenceName;

    try {

      if (isPreferenceEmpty == true) {
        currentClosestPreferenceAddress = "";
        currentClosestPreferenceName = ""
        PreferenceLat = 0;
        PreferenceLng = 0;
        currentPreferenceDuration = 0;
      }


      await axios.post("http://localhost:8080/updateJson", {
        GroceryLat,
        GroceryLng,
        HealthLat,
        HealthLng,
        TransitLat,
        TransitLng,
        PreferenceLat,
        PreferenceLng,
        SpotLat,
        SpotLng,
        currentGroceryDuration,
        currentHealthDuration,
        currentTransitDuration,
        currentPreferenceDuration,
        tempCurrentTravelMode,
        tempCurrentScore,
        currentStartPointAddress,
        currentClosestGroceryAddress,
        currentClosestHealthAddress,
        currentClosestTransitAddress,
        currentClosestPreferenceAddress,
        currentClosestGroceryName,
        currentClosestHealthName,
        currentClosestTransitName,
        currentClosestPreferenceName
      })
        .then((res: { data: string }) => {
          if (res.data == "update successful") {
            console.log("Updated Json File")
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  if (checkForLoadFlag == true) {
    //Ein timeout muss gesetzt werden, weil sonst die preferences zu langsam eingelesen werden
    //setTimeout(()=>{getPreferences();},1500)

    getPreferences();

    setTimeout(() => {
      console.log("I loaded the map");
      const lat: number = finalCenter.lat;
      const lng: number = finalCenter.lng;

      //Es wird im vorgegebenen Umkreis nach places gesucht
      newNearbySearch({ lat, lng }, 0)
      newNearbySearch({ lat, lng }, 1)
      newNearbySearch({ lat, lng }, 2)
      newNearbySearch({ lat, lng }, 3)
      //Timeout von +- 1 Sekunde, damit die Marker richtig laden
      setTimeout(() => {
        setCalculationDone(true);
        setSpot(finalCenter);
        calculateScorePrototype(finalCenter, travelMode);
      }, 1500);

    }, 1750);
    updateCity(addressCityToLoad);
    updateStreet(addressToLoad);
    updateZipCode(addressZipToLoad);

    checkForLoadFlag = false;
  }

  //Wenn die helper map noch nicht initialisiert wurde -> dies bitte tun
  if (setupCheck == false) {
    setTimeout(() => {
      placesMapV2 = new google.maps.Map(document.getElementById("map") as HTMLElement, optionsHelper);
      service = new google.maps.places.PlacesService(placesMapV2);
      infowindow = new google.maps.InfoWindow();

      console.log("Helper mapV2 successfully set up");
    }, 500);
    //Danach die flag auf true setzen
    setupCheck = true;
  }

  //Circles
  // Gehgeschwindigkeit: 5km/h
  // Grün: 1250m, 15min zu Fuß
  // Gelb: 2500m, 30min zu Fuß
  // Rot: 3750m, 45min zu Fuß
  const [circles, setCircles] = useState([
    { radius: 1250, options: { strokeColor: circleColors[0], fillOpacity: 0, strokeOpacity: 0.5 } },
    { radius: 2500, options: { strokeColor: circleColors[1], fillOpacity: 0, strokeOpacity: 0.5 } },
    { radius: 3750, options: { strokeColor: circleColors[2], fillOpacity: 0, strokeOpacity: 0.5 } },
  ]);

  // Update circles when `spot` changes
  useEffect(() => {

    circles.forEach(circle => {
      if (circle instanceof google.maps.Circle) {
        circle.setMap(null); // This removes the circle from the map
      }
    });

    // Circles werden hier neu definiert, damit alte Circles verschwinden und die neuen auf den erneuerten spot gesetzt werden
    const newCircles = [
      { radius: 1250, options: { strokeColor: circleColors[0], fillOpacity: 0, strokeOpacity: 0.5, center: spot } },
      { radius: 2500, options: { strokeColor: circleColors[1], fillOpacity: 0, strokeOpacity: 0.5, center: spot } },
      { radius: 3750, options: { strokeColor: circleColors[2], fillOpacity: 0, strokeOpacity: 0.5, center: spot } },
    ]

    // Update state to re-render circles
    setCircles(newCircles);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot]); // Linter beschwert sich hier, dass circles nicht in der Abhängigkeitsliste ist, aber das updated sonst im Loop


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  //console.log(shouldRenderCircles);


  const selectRouteFromMarker = (spotLiterals: LatLngLiteral, travelModeParam: string) => {
    if (!spot) return;

    setTravelMode(travelModeParam);

    //Switch-case, um Route im richtigen Modus anzeigen zu lassen.
    switch (travelModeParam) {
      case "walking":
        directService.route({
          origin: spot,
          destination: spotLiterals,
          travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
          if (status === "OK" && result) {
            currentDuration = result.routes[0].legs[0].duration!.value;
            setCurrentDuration(currentDuration)
            setDirections(result);
          }
        })
        break;

      case "driving":
        directService.route({
          origin: spot,
          destination: spotLiterals,
          travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
          if (status === "OK" && result) {
            currentDuration = result.routes[0].legs[0].duration!.value;
            setCurrentDuration(currentDuration)
            setDirections(result);
          }
        })
        break;
      case "bicycle":
        directService.route({
          origin: spot,
          destination: spotLiterals,
          travelMode: google.maps.TravelMode.BICYCLING
        }, (result, status) => {
          if (status === "OK" && result) {
            currentDuration = result.routes[0].legs[0].duration!.value;
            setCurrentDuration(currentDuration)
            setDirections(result);
          }
        })
        break;
      case "transit":
        directService.route({
          origin: spot,
          destination: spotLiterals,
          travelMode: google.maps.TravelMode.TRANSIT
        }, (result, status) => {
          if (status === "OK" && result) {
            currentDuration = result.routes[0].legs[0].duration!.value;
            setCurrentDuration(currentDuration)
            setDirections(result);
          }
        })
        break;
    }
    console.log("Derzeitige Dauer mit gewähltem travelmode: " + currentDuration);
  }

  //Score-Berechnungsalgorithmus
  function calculateScorePrototype(startPoint: LatLngLiteral, transitMode: string) {
    //Medianwert wird resetted, damit Ergebnisse stets "frisch" sind
    finalMean = 5000;
    let finalDivisor: number = 3;
    fastestRouteGroceries = 5000;
    fastestRouteHealth = 5000;
    fastestRouteTransit = 5000;
    fastestRoutePreference = 5000;

    switch (transitMode) {
      case "walking":
        //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        for (let i = 0; i < MarkersArrayTogether.length; i++) {
          for (let j = 0; j < MarkersArrayTogether[i].length; j++) {
            if (i == 0) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.WALKING
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestGroceryAddress = result.routes[0].legs[0].end_address;
                    tempClosestGroceryName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 1) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.WALKING
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestHealthAddress = result.routes[0].legs[0].end_address;
                    tempClosestHealthName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 2) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.WALKING
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestTransitAddress = result.routes[0].legs[0].end_address;
                    tempClosestTransitName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 3) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.WALKING
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRoutePreference) {
                    fastestRoutePreference = result.routes[0].legs[0].duration!.value;
                    tempPrefArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempPrefArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestPreferenceAddress = result.routes[0].legs[0].end_address;
                    tempClosestPreferenceName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
          }
        }
        break;
      case "driving":
        //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        for (let i = 0; i < MarkersArrayTogether.length; i++) {
          for (let j = 0; j < MarkersArrayTogether[i].length; j++) {
            if (i == 0) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.DRIVING
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestGroceryAddress = result.routes[0].legs[0].end_address;
                    tempClosestGroceryName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 1) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.DRIVING
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestHealthAddress = result.routes[0].legs[0].end_address;
                    tempClosestHealthName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 2) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.DRIVING
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestTransitAddress = result.routes[0].legs[0].end_address;
                    tempClosestTransitName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 3) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.DRIVING
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRoutePreference) {
                    fastestRoutePreference = result.routes[0].legs[0].duration!.value;
                    tempPrefArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempPrefArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestPreferenceAddress = result.routes[0].legs[0].end_address;
                    tempClosestPreferenceName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
          }
        }
        break;
      case "transit":
        //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        for (let i = 0; i < MarkersArrayTogether.length; i++) {
          for (let j = 0; j < MarkersArrayTogether[i].length; j++) {
            if (i == 0) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.TRANSIT
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestGroceryAddress = result.routes[0].legs[0].end_address;
                    tempClosestGroceryName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 1) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.TRANSIT
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestHealthAddress = result.routes[0].legs[0].end_address;
                    tempClosestHealthName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 2) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.TRANSIT
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestTransitAddress = result.routes[0].legs[0].end_address;
                    tempClosestTransitName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 3) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.TRANSIT
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRoutePreference) {
                    fastestRoutePreference = result.routes[0].legs[0].duration!.value;
                    tempPrefArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempPrefArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestPreferenceAddress = result.routes[0].legs[0].end_address;
                    tempClosestPreferenceName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
          }
        }
        break;
      case "bicycle":
        //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        for (let i = 0; i < MarkersArrayTogether.length; i++) {
          for (let j = 0; j < MarkersArrayTogether[i].length; j++) {
            if (i == 0) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.BICYCLING
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestGroceryAddress = result.routes[0].legs[0].end_address;
                    tempClosestGroceryName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 1) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.BICYCLING
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestHealthAddress = result.routes[0].legs[0].end_address;
                    tempClosestHealthName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 2) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.BICYCLING
              }, (result, status) => {
                if (status === "OK" && result) {
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestTransitAddress = result.routes[0].legs[0].end_address;
                    tempClosestTransitName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
            if (i == 3) {
              directService.route({
                origin: {
                  lat: startPoint.lat,
                  lng: startPoint.lng
                },
                destination: MarkersArrayTogether[i][j].location,
                travelMode: google.maps.TravelMode.BICYCLING
              }, (result, status) => {
                if (status === "OK" && result) {
                  tempStartName = result.routes[0].legs[0].start_address;
                  if (result.routes[0].legs[0].duration!.value < fastestRoutePreference) {
                    fastestRoutePreference = result.routes[0].legs[0].duration!.value;
                    tempPrefArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempPrefArray[1] = MarkersArrayTogether[i][j].location.lng;
                    tempClosestPreferenceAddress = result.routes[0].legs[0].end_address;
                    tempClosestPreferenceName = MarkersArrayTogether[i][j].name;
                  }
                }
              });
            }
          }
        }
        break;
    }

    setTimeout(() => {
      console.log("Final fastest route to a grocery store: " + fastestRouteGroceries);
      console.log("Final fastest route to a health deparment: " + fastestRouteHealth);
      console.log("Final fastest route to a transit station: " + fastestRouteTransit);
      console.log("Final fastest route to a location in your preferences: " + fastestRoutePreference);

      //Werte für JSON-Datei zwischenspeichern
      tempGroceryDuration = Math.ceil(fastestRouteGroceries / 60);
      tempHealthDuration = Math.ceil(fastestRouteHealth / 60);
      tempTransitDuration = Math.ceil(fastestRouteTransit / 60);
      tempPreferenceDuration = Math.ceil(fastestRoutePreference / 60);
      tempSearchResultArray[0] = startPoint.lat;
      tempSearchResultArray[1] = startPoint.lng;

      //Bools für die Gewichtung der Prio setzen
      if (groceryBool) {
        fastestRouteGroceries * 2;
        finalDivisor++;
      }
      if (healthBool) {
        fastestRouteHealth * 2;
        finalDivisor++;
      }
      if (transitBool) {
        fastestRouteTransit * 2;
        finalDivisor++;
      }
      if (preferenceBool && (isPreferenceEmpty == false)) {
        fastestRoutePreference * 2;
        finalDivisor++;
      }

      //Finale Berechnung des Scores und updaten der JSON-Datei
      if (isPreferenceEmpty == false) {
        finalDivisor++;
        finalMean = Math.ceil(((fastestRouteGroceries + fastestRouteHealth + fastestRouteTransit + fastestRoutePreference) / 60 / finalDivisor));
      }
      else {
        finalMean = Math.ceil(((fastestRouteGroceries + fastestRouteHealth + fastestRouteTransit) / 60 / finalDivisor));
      }
      console.log("Value of final mean: " + finalMean);
      console.log("Finaler Divisor war: " + finalDivisor);
      updateScore(finalMean.toString());
      tempCurrentScore = finalMean;
      UpdateJson();
    }, 2000)

  }

  function setCurrentTravelMode(chosenMode: string) {
    //Mit Buttonpress wird der gewünschte travel mode gesetzt
    switch (chosenMode) {
      case "walking":
        WalkingButtonString = "darkPink";
        DrivingButtonString = "";
        TransitButtonStringTravelMode = "";
        BicycleButtonString = "";
        tempCurrentTravelMode = "walking";
        setTravelMode("walking");
        console.log("Current travel mode: " + travelMode);
        break;
      case "driving":
        WalkingButtonString = "";
        DrivingButtonString = "darkPink";
        TransitButtonStringTravelMode = "";
        BicycleButtonString = "";
        tempCurrentTravelMode = "driving";
        setTravelMode("driving")
        console.log("Current travel mode: " + travelMode);
        break;
      case "transit":
        WalkingButtonString = "";
        DrivingButtonString = "";
        TransitButtonStringTravelMode = "darkPink";
        BicycleButtonString = "";
        tempCurrentTravelMode = "transit";
        setTravelMode("transit");
        console.log("Current travel mode: " + travelMode);
        break;
      case "bicycle":
        WalkingButtonString = "";
        DrivingButtonString = "";
        TransitButtonStringTravelMode = "";
        BicycleButtonString = "darkPink";
        tempCurrentTravelMode = "bicycle";
        setTravelMode("bicycle");
        console.log("Current travel mode: " + travelMode);
        break;
    }
    //Route wird erneut gesetzt, damit Inhalt des InfoWindows stimmt
    if (directions && selectedMarker != null) {
      selectRouteFromMarker(selectedMarker!.location, chosenMode)
      //mapRef.current?.panTo(selectedMarker!.location)
    }
  }

  function setPriorityButton(whatButton: string) {

    switch (whatButton) {
      case "Groceries":
        if (isGroceriesPriority === true) {
          GroceryButtonString = ""
        } else {
          GroceryButtonString = "darkPink"
        }
        break;
      case "Health":
        if (isHealthPriority === true) {
          HealthButtonString = ""
        } else {
          HealthButtonString = "darkPink"
        }
        break;
      case "Transit":
        if (isTransitPriority === true) {
          TransitButtonString = ""
        } else {
          TransitButtonString = "darkPink"
        }
        break;
      case "Preferences":
        if (isPreferencePriority === true) {
          preferenceButtonString = "";
        } else {
          preferenceButtonString = "darkPink"
        }
    }

  }

  //Save search on the designated profile
  async function saveSearch(spotLiterals: LatLngLiteral, nameToSave: string) {
    //To-Do implement here

    canInputWindowBeClosedNotReact = false;
    const currentSpotLat = spotLiterals.lat;
    const currentSpotLng = spotLiterals.lng;

    try {
      await axios.post("http://localhost:8080/saveSearchForLater", {
        currentUser, currentSpotLat, currentSpotLng, nameToSave
      })
        .then((res: { data: string }) => {
          if (res.data === "save successful") {
            console.log("Adress was successfully saved");

            canInputWindowBeClosedNotReact = true;
          }
          if (res.data === "Name already exists") {
            throwError("Name is already taken")
          }
        })
    } catch (e) {
      console.log(e);
    }

  }

  //NearbySearch mit neuer Places API
  async function newNearbySearch(centerParam: google.maps.LatLngLiteral, whichRequest: number) {


    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    let current_request_new_API = {
      fields: ["displayName", "location", "businessStatus", "types", "formattedAddress"],
      locationRestriction: {
        center: centerParam,
        radius: 3750
      },
      includedPrimaryTypes: personalPreferenceArray,
      maxResultCount: 15,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "en-UK"
    }

    const current_preferences_new_API = {
      fields: ["displayName", "location", "businessStatus", "types", "formattedAddress"],
      locationRestriction: {
        center: centerParam,
        radius: 3750
      },
      includedPrimaryTypes: personalPreferenceArray,
      maxResultCount: 15,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "en-UK"
    }

    const current_Groceries_new_API = {
      fields: ["displayName", "location", "businessStatus", "types", "formattedAddress"],
      locationRestriction: {
        center: centerParam,
        radius: 3750
      },
      includedPrimaryTypes: ["supermarket", "grocery_store"],
      maxResultCount: 15,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "en-UK"
    }

    const current_Health_new_API = {
      fields: ["displayName", "location", "businessStatus", "types", "formattedAddress"],
      locationRestriction: {
        center: centerParam,
        radius: 3750
      },
      includedPrimaryTypes: ["hospital", "doctor", "pharmacy"],
      maxResultCount: 15,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "en-UK"
    }

    const current_Transit_new_API = {
      fields: ["displayName", "location", "businessStatus", "types", "formattedAddress"],
      locationRestriction: {
        center: centerParam,
        radius: 3750
      },
      includedPrimaryTypes: ["transit_station"],
      maxResultCount: 10,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "en-UK"
    }


    switch (whichRequest) {
      case 0:
        current_request_new_API = current_Groceries_new_API;
        break;

      case 1:
        current_request_new_API = current_Health_new_API
        break;

      case 2:
        current_request_new_API = current_Transit_new_API;
        break;

      case 3:

        current_request_new_API = current_preferences_new_API;
        break;
    }


    const { places } = await Place.searchNearby(current_request_new_API);


    if (places.length) {

      //console.log(places)

      switch (whichRequest) {
        case 0:
          for (let i = 0; i < places.length; i++) {
            markersWithInfoGroceries.push({
              id: i,
              location: {
                lat: places[i].location!.lat(),
                lng: places[i].location!.lng()
              },
              address: places[i].formattedAddress!,
              name: places[i].displayName!,
              buildingType: places[i].types![0],
            })
          }
          break;

        case 1:
          for (let i = 0; i < places.length; i++) {
            markersWithInfoHealth.push({
              id: i,
              location: {
                lat: places[i].location!.lat(),
                lng: places[i].location!.lng()
              },
              address: places[i].formattedAddress!,
              name: places[i].displayName!,
              buildingType: places[i].types![0],
            })
          }
          break;

        case 2:
          for (let i = 0; i < places.length; i++) {
            markersWithInfoTransit.push({
              id: i,
              location: {
                lat: places[i].location!.lat(),
                lng: places[i].location!.lng()
              },
              address: places[i].formattedAddress!,
              name: places[i].displayName!,
              buildingType: places[i].types![0],
            })
          }
          break;

        case 3:
          if (isPreferenceEmpty == false) {
            for (let i = 0; i < places.length; i++) {
              markersWithInfoPersonalFilters.push({
                id: i,
                location: {
                  lat: places[i].location!.lat(),
                  lng: places[i].location!.lng()
                },
                address: places[i].formattedAddress!,
                name: places[i].displayName!,
                buildingType: places[i].types![0],
              })
            }
          }
      }
    }
  }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Evaluation');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (selectedFilters: any) => {
    console.log("Filters saved:", selectedFilters);
    setSelectedMarker(null)
    setDirections(undefined);
    //Array zurücksetzen
    markersWithInfoPersonalFilters.splice(0, markersWithInfoPersonalFilters.length)

    //Score und Marker werden nur neu generiert, wenn bereits eine Adresse eingegeben wurde
    //Falls dies noch nicht geschehen ist, werden nur die Filter geupdated
    if (InitialCalculationDone === true) {
      setTimeout(() => { getPreferences(); }, 750)
      //Neue NearbySearch für jede Kategorie
      setTimeout(() => {
        newNearbySearch({ lat: spot!.lat!, lng: spot!.lng! }, 3);
        console.log("Current preferences markers:")
        console.log(markersWithInfoPersonalFilters)
      }, 1250)

      //Score wird neu berechnet
      setTimeout(() => {
        calculateScorePrototype({ lat: spot!.lat!, lng: spot!.lng! }, travelMode)
        if (markersWithInfoPersonalFilters.length > 0) {
          setPreferenceEmptyReact(false)


        }
        if (markersWithInfoPersonalFilters.length >= 1) {
          setPreferenceEmptyReact(true)

        }
        setUpdateNum(forceUpdateNum + 1)
        console.log("Current force update count: " + forceUpdateNum)
      }, 2750)
    }
  }

  return (
    <div>
      <Searchbar>
        <ControlContainer>
          <Places setSpot={(position) => {

            //Schnellstwerte für neuen Durchlauf des Algorithmus zurücksetzen
            setSelectedMarker(null)
            setDirections(undefined);
            const lat: number = position.lat;
            const lng: number = position.lng;
            //Arrays leeren
            markersWithInfoTransit.splice(0, markersWithInfoTransit.length)
            markersWithInfoGroceries.splice(0, markersWithInfoGroceries.length)
            markersWithInfoHealth.splice(0, markersWithInfoHealth.length)
            markersWithInfoPersonalFilters.splice(0, markersWithInfoPersonalFilters.length)
            //Werte der Filter werden geladen

            setTimeout(() => { getPreferences(); }, 1500)
            //Bevor Suche stattfindet muss wie oben erwähnt ein kleiner timeout passieren
            setTimeout(() => {
              newNearbySearch({ lat, lng }, 0)
              newNearbySearch({ lat, lng }, 1)
              newNearbySearch({ lat, lng }, 2)
              newNearbySearch({ lat, lng }, 3)
              //Sanity check
              console.log("Grocery markers");
              console.log(markersWithInfoGroceries)
              console.log("Health markers");
              console.log(markersWithInfoHealth)
              console.log("Transit markers");
              console.log(markersWithInfoTransit)
              console.log("Preference markers");
              console.log(markersWithInfoPersonalFilters);
            }, 2000)

            //Timeout von +- 1 Sekunde, damit die Marker richtig laden
            setTimeout(() => {
              setCalculationDone(true);
              setSpot(position);
              mapRef.current?.panTo(position)
              calculateScorePrototype(position, travelMode);
              isSaveButtonDisabled = false;
            }, 2500);
          }} />
        </ControlContainer>

        <AdaptedFilterContainer onSave={handleSave}></AdaptedFilterContainer>
      </Searchbar>

      <ButtonGrid>
        <StyledButton color={WalkingButtonString} onClick={() => {
          setCurrentTravelMode("walking"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "walking"); }
        }}> <img src={walkingIcon} alt="Walking Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
        <StyledButton color={DrivingButtonString} onClick={() => {
          setCurrentTravelMode("driving"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "driving") }
        }}><img src={carIcon} alt="Car Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
        <StyledButton color={TransitButtonStringTravelMode} onClick={() => { setCurrentTravelMode("transit"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "transit") } }}><img src={transitIcon} alt="Tram Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
        <StyledButton color={BicycleButtonString} onClick={() => { setCurrentTravelMode("bicycle"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "bicycle") } }}><img src={bikeIcon} alt="bike Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>

      </ButtonGrid>
      <h5>Prioritise:</h5>
      <PrioButtonGrid>
        <StyledPrioButton
          key={`groceries-${isGroceriesPriority}`}
          priority={isGroceriesPriority}
          onClick={() => {
            setPriorityButton("Groceries");
            setGroceriesPriority(!isGroceriesPriority);
            groceryBool = !groceryBool;
            console.log("Grocerybool is: " + groceryBool);
            console.log(isGroceriesPriority);
            if (InitialCalculationDone) {
              { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
            }

          }}>Grocery stores</StyledPrioButton>
        <StyledPrioButton
          key={`health-${isHealthPriority}`} 
          priority={isHealthPriority}
          onClick={() => {
            setPriorityButton("Health");
            setHealthPriority(!isHealthPriority);
            healthBool = !healthBool;
            console.log("Healthbool is: " + healthBool);
            console.log(isHealthPriority)
            if (InitialCalculationDone) {
              { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
            }

          }}>health dept.</StyledPrioButton>
        <StyledPrioButton 
        key={`transit-${isTransitPriority}`} 
        priority={isTransitPriority}
        onClick={() => {
          setPriorityButton("Transit");
          setTransitPriority(!isTransitPriority);
          console.log(isTransitPriority);
          transitBool = !transitBool;
          console.log("Transitbool is: " + transitBool);
          if (InitialCalculationDone) {
            { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
          }
        }}>transit stations</StyledPrioButton>

        <StyledPrioButton 
        key={`preferences-${isPreferencePriority}`}
        priority={isPreferencePriority}
        onClick={() => {
          setPriorityButton("Preferences");
          setPreferencePriority(!isPreferencePriority);
          preferenceBool = !preferenceBool;
          console.log("Preference bool is: " + preferenceBool);
          console.log(isPreferencePriority)
          if (InitialCalculationDone) {
            { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
          }

        }}>Preferences</StyledPrioButton>
      </PrioButtonGrid>



      {inputWindowOpenReact && <Overlay>
        <LoginContainer>
          <h3>Enter a name under 18 letters</h3>
          <InputWrapper>
            <StyledInput placeholder={saveCurrentResultName} onChange={(e) => { setCurrentResultName(e.target.value) }}></StyledInput>
          </InputWrapper>
          <SaveButtonGrid>
            <StyledButton onClick={() => {
              if (saveCurrentResultName.length <= 18) {
                saveSearch(spot!, saveCurrentResultName)
                setTimeout(() => {
                  if (canInputWindowBeClosedNotReact == true) {
                    setInputWindowOpen(!inputWindowOpenReact);
                    throwInfo("Address saved!")
                    isSaveButtonDisabled = true;
                  }
                }, 750);
              }
              else {
                throwError("Name is too long");
              }
            }}>Save</StyledButton>
            <StyledButton onClick={() => { setInputWindowOpen(!inputWindowOpenReact); }}>Close</StyledButton>
          </SaveButtonGrid>
        </LoginContainer>

      </Overlay>}

      <MapAndPrioGrid>
        <div></div> {/* Empty div for left column of MapAndPrioGrid */}

        <GoogleMap zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          onCenterChanged={() => { }}
        >
        //Anzeige der Route(n)
          {directions && <DirectionsRenderer directions={directions} />}





          {shouldRenderCircles && spot && circles.map((circles, index) => (
            <Circle
              key={index}
              center={spot}
              radius={circles.radius}
              options={circles.options}
            />

          ))}

          {forceUpdateNum}

      //Marker auf der Map platzieren
          {spot && <Marker position={spot} onLoad={() => { "Initial marker placed" }} />}

          {spot && markersWithInfoGroceries.map(marker => <Marker key={Math.random()} icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png' title="Grocery marker" position={marker.location} onClick={() => {
            setSelectedMarker(marker);
            selectRouteFromMarker(marker.location, travelMode)
          }} ></Marker>)}

          {spot && markersWithInfoHealth.map(marker => <Marker key={Math.random() + 1} icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png' title="Health marker" position={marker.location} onClick={() => {
            setSelectedMarker(marker);
            selectRouteFromMarker(marker.location, travelMode)
          }} ></Marker>)}

          {spot && markersWithInfoTransit.map(marker => <Marker key={Math.random() + 2} icon='http://maps.google.com/mapfiles/ms/icons/red-dot.png' title="Transit marker" position={marker.location} onClick={() => {
            setSelectedMarker(marker);
            selectRouteFromMarker(marker.location, travelMode)
            setCurrentDuration(currentDurationUseState + 0)
          }} ></Marker>)}

          {(isPreferenceEmptyReact && spot) && markersWithInfoPersonalFilters.map(marker => <Marker key={Math.random() + 3} icon='http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' title="Preference marker" position={marker.location} onClick={() => {
            setSelectedMarker(marker);
            selectRouteFromMarker(marker.location, travelMode)
            setCurrentDuration(currentDurationUseState + 0)
          }} ></Marker>)}

          {selectedMarker && <InfoWindow onCloseClick={() => { setSelectedMarker(null); }} position={{
            lat: selectedMarker.location.lat,
            lng: selectedMarker.location.lng
          }}>
            <div>
              <h5>{selectedMarker.name}</h5>
              <p>
                {selectedMarker.address.split(',')[0]}<br />
                {selectedMarker.address.split(',')[1].trim()}
              </p>
              <p>{travelMode}: {Math.ceil(currentDurationUseState / 60)} min </p>
            </div>
          </InfoWindow>}
          {shouldRenderCircles && spot && (
            <MapLegend
              circleRadii={circleRadii}
              circleColors={circleColors}
            //logo={walkingIconLegend}
            />
          )}
        </GoogleMap>




        <PriorityGrid>
          {currentUser &&
            <StyledButton disabled={isSaveButtonDisabled} onClick={() => {
              console.log(saveCurrentResultName);
              setInputWindowOpen(!inputWindowOpenReact);
            }}
            >Click to save address</StyledButton>
          }

          <ScoreContainer color='blue' onClick={handleClick} />
        </PriorityGrid>
      </MapAndPrioGrid>
    </div>
  )
}