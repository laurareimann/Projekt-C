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
import styled from "styled-components";
import axios from "axios";
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

  //Coordinates for Routes and travelmode
  const startingSpot={lat: AddressData.currentStartingSpot[0], lng: AddressData.currentStartingSpot[1]};
  const grocerySpot={lat: AddressData.currentClosestGrocery[0], lng: AddressData.currentClosestGrocery[1]};
  const healthSpot ={lat: AddressData.currentClosestHealth[0], lng: AddressData.currentClosestHealth[1]};
  const transitSpot={lat: AddressData.currentClosestTransit[0], lng: AddressData.currentClosestTransit[1]};
  const travelMode = AddressData.currentTravelMode;



export default function RoutesMap() {

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

    switch (travelMode) {
      case "walking":
        directService.route({
          origin: startingSpot,
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

    switch (travelMode) {
      case "walking":
        directService.route({
          origin: startingSpot,
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

    switch (travelMode) {
      case "walking":
        directService.route({
          origin: startingSpot,
          destination: transitSpot,
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
          center={startingSpot}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}>

          {directions && <DirectionsRenderer directions={directions} />}

        </GoogleMap>

    </div>
  )
}



