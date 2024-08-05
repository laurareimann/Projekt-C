/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../globals.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";
import styled from "styled-components";

import MapLegend from "./mapLegend";
import walkingIcon from "../../assets/walkingIcon.svg";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import {useScore,StreetProvider} from "./StreetProvider";
//import { InfoWindow } from "react-google-maps";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

let placesMapV2: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;
let setupCheck:boolean = false;
let updateCheck:boolean= false;
//Arrays in denen die NearbySearch-Ergebnisse gespeichert werden
//Supermärkte,Läden et cetera
const currentCategory1: Array<google.maps.LatLngLiteral> = []
//Gesundheitswesen
const currentCategory2: Array<google.maps.LatLngLiteral> = []
//Öffentliche Verkehrsmittel(for now)
const currentCategory3: Array<google.maps.LatLngLiteral> = []

interface MarkerWindow {
  id:number
  address:string;
  location: LatLngLiteral;
  name:string,
  prevState: null
}

//Variablen für die Berechnung des Scores
let fastestRouteGroceries:number = 10000;
let fastestRouteHealth:number = 10000;
let fastestRouteTransit:number = 10000;
let finalMean:number;
let currentDuration:number;

//Temp colours für die Buttons
let GroceryButtonString:string="";
let HealthButtonString:string="";
let TransitButtonString:string="";

const markersWithInfoGroceries : Array<MarkerWindow> = []
const markersWithInfoHealth : Array<MarkerWindow> = []
const markersWithInfoTransit : Array<MarkerWindow> = []
const MarkersArrayTogether=[markersWithInfoGroceries,markersWithInfoHealth,markersWithInfoTransit]

const StyledButton = styled.button`
    background-color: ${({ color, disabled }) =>
        disabled
            ? color === "blue" ? "var(--color--blue-1)"
                : color === "green" ? "var(--color--green-1)"
                    : "var(--color--pink-1)"
            : color === "blue" ? "var(--color--blue-4)"
                : color === "green" ? "var(--color--green-3)"
                    :color ==="darkPink" ? "var(--color--pink-5)"
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

const ButtonGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:420px;
grid-template-columns: 1fr 1fr 1fr 1fr;
margin-bottom: 10px;
`

const MapAndPrioGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:1500px;
grid-template-columns: 1fr 1fr;
margin-bottom: 10px;
`

const PriorityGrid = styled.div`
display: grid;
grid-gap: 4px;
place-items:center;
width:45px;
margin-bottom: 10px;
`

const MapContainer = styled.div`
  position: relative;
  height: 100%;
  width: 1300px;
  border:none;
  border-radius:50px;
  margin-bottom:10px;
  
`
const ControlContainer = styled.div`
  height:fit-content;
  width: 500px;
  margin:auto;
  padding: 0.3rem;
  background-color: var(--color--pink-3);
  border-radius:20px;
  margin-bottom:10px;
`


const defaultColors = ["green", "yellow", "red"];

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 

export default function Map({ shouldRenderCircles = true, circleRadii = [1250, 2500, 3750], circleColors = defaultColors }) {

  const [helpCounter,setHelpCounter] = useState(0);

  //Wenn die map initialisiert wird, ist der default spot auf der HAW Finkenau
  const center = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);
  const [directions,setDirections] = useState<DirectionsResult>();
  const [spot,setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const [selectedMarker,setSelectedMarker] = useState<MarkerWindow | null>()
  const [isGroceriesPriority,setGroceriesPriority] = useState(false);
  const [isHealthPriority,setHealthPriority] = useState(false);
  const [isTransitPriority,setTransitPriority] = useState(false);
  const [InitialCalculationDone,setCalculationDone] = useState(false);
  const updateScore = useScore().setScore;
  const directService = new google.maps.DirectionsService();
  const [travelMode,setTravelMode] = useState("walking");
  const [currentDurationUseState,setCurrentDuration] = useState(0);

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI:true,
      clickableIcons:true,
      mapId: import.meta.env.VITE_MAP_ID
    }),[]);
  
  
    //Helper-map_setup
    //Center ist hier wieder unser Campus
  const defaultCenter = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);

  const optionsHelper = useMemo<MapOptions>(
    ()=> ({
      center:defaultCenter,
      zoom:15
    }),[defaultCenter]
  )

  //Suche in der Nähe gelegender places
  async function performNearbySearch(requestList: google.maps.places.PlaceSearchRequest[]){ 
    service.nearbySearch(requestList[0],callback);
    service.nearbySearch(requestList[1],callback);
    service.nearbySearch(requestList[2],callback);
  }
 
//Wenn die helper map noch nicht initialisiert wurde -> dies bitte tun
  if(setupCheck == false){
    setTimeout(()=>{
      placesMapV2 = new google.maps.Map(document.getElementById("map") as HTMLElement,optionsHelper);
      service = new google.maps.places.PlacesService(placesMapV2);
      infowindow = new google.maps.InfoWindow();
      
      console.log("Helper mapV2 successfully set up");
    },2000);
    //Danach die flag auf true setzen
    setupCheck= true;
  }


  //Callback-Funktion für die NearbySearch
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 function callback(results:any,status:any){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    
    if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
      console.log("You are requesting too fast");
    }

    for(let i = 0; i < results.length;i++){
      //Supermärkte werden in Array 1 abgelegt
      if(results[i].types.includes("grocery_or_supermarket")){
        console.log("Supermarkt: " + results[i].name)
        markersWithInfoGroceries.push({
          id:i,
          location:{
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
          },
          address:results[i].vicinity,
          name:results[i].name,
          prevState:null
        })
      }
      //Apotheken, Kliniken et cetera
      if(results[i].types.includes("health")){
        console.log("Gesundheitswesen: " + results[i].name)
        markersWithInfoHealth.push({
          id:i,
          location:{
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
          },
          address:results[i].vicinity,
          name:results[i].name,
          prevState:null
        })
      }
      //Öffentlicher Personen-Nahverkehr
      if(results[i].types.includes("transit_station")){
        console.log("ÖPNV: " + results[i].name)
        console.log("ÖPNV-Typ: " + results[i].types)
        markersWithInfoTransit.push({
          id:i,
          location:{
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
          },
          address:results[i].vicinity,
          name:results[i].name,
          prevState:null
        })
      }
  }}

  //For debugging & sanity checks in the console
  console.log("Supermärkte");
  console.log(markersWithInfoGroceries);
  console.log("Gesundheitswesen");
  console.log(markersWithInfoHealth);
  console.log("ÖPNV");
  console.log(markersWithInfoTransit);
}

//Ist sehr schön, aber  wir so weit sind sollten wir dies nicht nach Luftlinie machen sondern dynamisch den Radius ändern
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
  const onLoad = useCallback((map:any) => (mapRef.current = map),[]);
  console.log(shouldRenderCircles);

  //Kleine Helferfunktion. Inkrementiert eine Variable, damit sich die Karte aktualisiert. Werde noch testen, ob diese am Ende vonnöten ist oder nicht
  function updateMarkers(){
      if(updateCheck==false){
        setHelpCounter(helpCounter+1);
        }
  }

  const refreshCurrentDuration=()=>{
    if(directions){
      currentDuration=(directions.routes[0].legs[0].duration!.value);
      setCurrentDuration(currentDuration);
    }
  }


  const selectRouteFromMarker=(spotLiterals:LatLngLiteral,travelModeParam:string)=>{
    if(!spot)return;

    setTravelMode(travelModeParam);

    //Switch-case, um Route im richtigen Modus anzeigenzulassen.
    switch(travelModeParam){
      case "walking":
        directService.route({
          origin:spot,
          destination:spotLiterals,
          travelMode:google.maps.TravelMode.WALKING
        },(result,status)=>{
        if(status === "OK" && result){
          currentDuration = result.routes[0].legs[0].duration!.value;
          setCurrentDuration(currentDuration)
          setDirections(result);
      }
    })
    break;

    case "driving":
      directService.route({
        origin:spot,
        destination:spotLiterals,
        travelMode:google.maps.TravelMode.DRIVING
      },(result,status)=>{
      if(status === "OK" && result){
        currentDuration = result.routes[0].legs[0].duration!.value;
        setCurrentDuration(currentDuration)
        setDirections(result);
    }
  })
      break;
    case "bicycle":
      directService.route({
        origin:spot,
        destination:spotLiterals,
        travelMode:google.maps.TravelMode.BICYCLING
      },(result,status)=>{
      if(status === "OK" && result){
        currentDuration = result.routes[0].legs[0].duration!.value;
        setCurrentDuration(currentDuration)
        setDirections(result);
    }
  })
      break;
    case "transit":
      directService.route({
        origin:spot,
        destination:spotLiterals,
        travelMode:google.maps.TravelMode.TRANSIT
      },(result,status)=>{
      if(status === "OK" && result){
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
  function calculateScorePrototype(startPoint:LatLngLiteral,transitMode:string){
    //Medianwert wird resetted, damit Ergebnisse stets "frisch" sind
    finalMean = 10000;
    let finalDivisor:number = 3;
    fastestRouteGroceries = 10000;
    fastestRouteHealth = 10000;
    fastestRouteTransit = 10000;
    //setCurrentTravelMode(transitMode)
    //Text, der im ScoreContainer gesetzt wird
    console.log(transitMode)

        switch(transitMode){
        case "walking":
        //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        //Vorerst nur mit Walking, aber nach Ausbau der Funktion auch mit anderen TransitMethods
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
                  //console.log("Calculating Grocery durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    
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
                  //console.log("Calculating health durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    
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
                  //console.log("Calculating transit durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    
                  }
                }
              });
            }
          }
        }
        break;
        case "driving":
          console.log("Todo")
          //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        //Vorerst nur mit Walking, aber nach Ausbau der Funktion auch mit anderen TransitMethods
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
                  //console.log("Calculating Grocery durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
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
                  //console.log("Calculating health durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
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
                  //console.log("Calculating transit durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);                   
                  }
                }
              });
            }
          }
        }
          break;
        case "transit":
          console.log("Todo")
          //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        //Vorerst nur mit Walking, aber nach Ausbau der Funktion auch mit anderen TransitMethods
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
                  //console.log("Calculating Grocery durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    //console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    
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
                  //console.log("Calculating health durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);         
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
                 // console.log("Calculating transit durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    
                  }
                }
              });
            }
          }
        }
          break;
        case "bicycle":
          console.log("Todo")
          //Loop durch das Array mit allen Marker-Arrays, um den Medianwert auszurechnen
        //Vorerst nur mit Walking, aber nach Ausbau der Funktion auch mit anderen TransitMethods
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
                  //console.log("Calculating Grocery durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteGroceries) {
                    fastestRouteGroceries = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
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
                  //console.log("Calculating health durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteHealth) {
                    fastestRouteHealth = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
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
                  //console.log("Calculating transit durations");
                  if (result.routes[0].legs[0].duration!.value < fastestRouteTransit) {
                    fastestRouteTransit = result.routes[0].legs[0].duration!.value;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);               
                  }
                }
              });
            }
          }
        }
          break;
      }
        
    setTimeout(()=>{
      console.log("Final fastest route to a grocery store: " + fastestRouteGroceries);
      console.log("Final fastest route to a health deparment: " + fastestRouteHealth);
      console.log("Final fastest route to a transit station: " + fastestRouteTransit);

      if(isGroceriesPriority){
        fastestRouteGroceries*2;
        finalDivisor++;
      }
      if(isHealthPriority){
        fastestRouteHealth*2;
        finalDivisor++;
      }
      if(isTransitPriority){
        fastestRouteTransit*2;
        finalDivisor++;
      }
      finalMean = Math.ceil(((fastestRouteGroceries+fastestRouteHealth+fastestRouteTransit)/60/finalDivisor));
      console.log("Value of final mean: " + finalMean);
      console.log("Finaler Divisor war: " + finalDivisor)
      updateScore(finalMean.toString())},1000)
  }

  function setCurrentTravelMode(chosenMode:string){
    //Mit Buttonpress wird der gewünschte travel mode gesetzt
    switch(chosenMode){
      case "walking":
        setTravelMode("walking");
        break;
      case "driving":
        setTravelMode("driving")
        break;
      case "transit":
        setTravelMode("transit")
        break;
      case "bicycle":
        setTravelMode("bicycle")
        break;
    }
    //Route wird erneut gesetzt, damit Inhalt des InfoWindows stimmt
    if(directions && selectedMarker!=null){
    selectRouteFromMarker(selectedMarker!.location,chosenMode)
    //mapRef.current?.panTo(selectedMarker!.location)
    }
  }

  function setPriorityButton(whatButton:string){

    switch(whatButton){
      case "Groceries":
        if(isGroceriesPriority === true){
          GroceryButtonString=""
        }else{
          GroceryButtonString="darkPink"
        }
        setGroceriesPriority(!isGroceriesPriority)
        break;
      case "Health":
        if(isHealthPriority === true){
          HealthButtonString=""
        }else{
          HealthButtonString="darkPink"
        }
        setHealthPriority(!isHealthPriority)
        break;
      case "Transit":
        if(isTransitPriority === true){
          TransitButtonString=""
        }else{
          TransitButtonString="darkPink"
        }
        setTransitPriority(!isTransitPriority)
        break;
    }

  }

  return (
  <div>
    <ControlContainer>
      <Places setSpot={(position) =>{
        //Schnellstwerte für neuen Durchlauf des Algorithmus zurücksetzen
        setSelectedMarker(null)
        setDirections(undefined);
        const lat:number = position.lat;
        const lng:number = position.lng;

        //Die Arrays leeren
        currentCategory1.splice(0,currentCategory1.length);
        currentCategory2.splice(0,currentCategory2.length);
        currentCategory3.splice(0,currentCategory3.length);
        //"Neue" arrays
        markersWithInfoTransit.splice(0,markersWithInfoTransit.length)
        markersWithInfoGroceries.splice(0,markersWithInfoGroceries.length)
        markersWithInfoHealth.splice(0,markersWithInfoHealth.length)
        //NearbySearch-Requests für die verschiedenen types
        const request = {
          location:{lat,lng},
          radius:5000,
          type:"grocery_or_supermarket"
        }
        const request_2 = {
          location:{lat,lng},
          radius:5000,
          type:"health"
        }
        const request_3 = {
          location:{lat,lng},
          radius:5000,
          type:"transit_station"
        }
        const requesttypes = [request,request_2,request_3]
        //Es wird im vorgegebenen Umkreis nach places gesucht
        performNearbySearch(requesttypes);
        //Timeout von +- 1 Sekunde, damit die Marker richtig laden
        setTimeout(()=>{
          setCalculationDone(true);
          setSpot(position);
          mapRef.current?.panTo(position)
          calculateScorePrototype(position,travelMode);
        },2000);
        //Die flag der updateMarkers()-Funktion auf falsch stellen
        updateCheck=false;
      }}/>
    </ControlContainer>
    
      Click one of the buttons to choose a travel mode
      <p>Current travel mode: {travelMode}</p>
      <ButtonGrid>
        <StyledButton onClick={()=>{setCurrentTravelMode("walking");if(InitialCalculationDone==true){calculateScorePrototype({lat:spot!.lat,lng:spot!.lng},"walking");}}}>Walking</StyledButton>
        <StyledButton onClick={()=>{setCurrentTravelMode("driving"); if(InitialCalculationDone==true){calculateScorePrototype({lat:spot!.lat,lng:spot!.lng},"driving")}}}>Driving</StyledButton>
        <StyledButton onClick={()=>{setCurrentTravelMode("transit"); if(InitialCalculationDone==true){calculateScorePrototype({lat:spot!.lat,lng:spot!.lng},"transit")}}}>Transit</StyledButton>
        <StyledButton onClick={()=>{setCurrentTravelMode("bicycle"); if(InitialCalculationDone==true){calculateScorePrototype({lat:spot!.lat,lng:spot!.lng},"bicycle")}}}>Bicycle</StyledButton>
      </ButtonGrid>
      
    <MapAndPrioGrid>
    <MapContainer>
      <GoogleMap zoom={14} 
        center={center} 
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
        onCenterChanged={() => {
          updateMarkers();
        }}
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

      //Marker auf der Map platzieren
      {spot && <Marker position={spot} onLoad={()=>{"Initial marker placed"}}/>}

      {spot && markersWithInfoGroceries.map(marker =>  <Marker key ={Math.random()} icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' title="Grocery marker" position={marker.location} onClick={()=>{
        setSelectedMarker(marker);
        selectRouteFromMarker(marker.location,travelMode)}} ></Marker>)}
      
      {spot && markersWithInfoHealth.map(marker =>  <Marker key ={Math.random()+1} icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' title="Health marker" position={marker.location} onClick={()=>{
        setSelectedMarker(marker);
        selectRouteFromMarker(marker.location,travelMode)}} ></Marker>)}
      
      {spot && markersWithInfoTransit.map(marker =>  <Marker key ={Math.random()+2} icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' title="Transit marker" position={marker.location} onClick={()=>{
        setSelectedMarker(marker);
        selectRouteFromMarker(marker.location,travelMode)
        setCurrentDuration(currentDurationUseState+0)}} ></Marker>)}
        

      {selectedMarker &&  <InfoWindow onCloseClick={()=>{setSelectedMarker(null);}} position={{
        lat:selectedMarker.location.lat,
        lng:selectedMarker.location.lng
      }}>
        <div>
          <h2>Current travel mode: {travelMode} </h2>
          <h2>Current destination: {selectedMarker.name}</h2>
          <h3>Travel time to that destination in minutes: {Math.ceil(currentDurationUseState/60)}</h3>
          <p>Address: {selectedMarker.address}</p>
        </div>
        </InfoWindow>}
      </GoogleMap>
        {shouldRenderCircles && spot && (
          <MapLegend
            circleRadii={circleRadii}
            circleColors={circleColors}
            logo={walkingIcon}
          />
        )}
      </MapContainer>
      <PriorityGrid>
        <StyledButton color={GroceryButtonString} onClick={()=>{
          setPriorityButton("Groceries");
          
          }}>Prioritise Groceries</StyledButton>
        <StyledButton color={HealthButtonString} onClick={()=>{
          setPriorityButton("Health");

        }}>Prioritise health departments</StyledButton>
        <StyledButton color={TransitButtonString} onClick={()=>{
          setPriorityButton("Transit");

        }}>Prioritise transit stations</StyledButton>
      </PriorityGrid>
      </MapAndPrioGrid>
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
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
