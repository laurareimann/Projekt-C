/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../globals.css";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";
import styled from "styled-components";
import Input from "../Inputforms";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


const TestMap = styled.div`
  height: 100%;
  width: 100%;
  border:none;
  border-radius:50px;
  margin-bottom:10px;
  
`

const TestControlContainer = styled.div`
  height:fit-content;
  width: fit-content;
  margin:auto;
  padding: 1rem;
  background-color:#0B1FD5;
  border-radius:20px;
  margin-bottom:10px;
`

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 

export default function Map() {

  const center = useMemo<LatLngLiteral>(() => ({lat:53,lng:10}),[]);
  const [spot,setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI:true,
      clickableIcons:true,
      mapId: import.meta.env.VITE_MAP_ID
    }),[]);


  const onLoad = useCallback((map) => (mapRef.current = map),[]);


  return (
  <div>
    <TestControlContainer>
      
      <Places setSpot={(position) =>{
        setSpot(position);
        mapRef.current?.panTo(position);
      }}/>
    </TestControlContainer>
    <TestMap>
      <GoogleMap zoom={14} 
        center={center} 
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >

        //Auskommentiert bis ich herausfinde, wie ich custom images als Marker in Google Maps verwenden kann. Bis dahin leider custom marker
        /* {spot && (<Marker position={spot} icon="https://imgur.com/a/MT0g9NM"/>)} */
        {spot && <Marker position={spot}/>}


      </GoogleMap>
      </TestMap>
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
