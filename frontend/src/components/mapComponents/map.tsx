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
import { useNearby } from "./StreetProvider";

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
  width: 500px;
  margin:auto;
  padding: 0.3rem;
  background-color: var(--color--pink-3);
  border-radius:20px;
  margin-bottom:10px;
`

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 

export default function Map() {

  const currentMarkers =  useNearby().currentNearby;
  

  //Wenn die map initialisiert wird, ist der default spot auf der Haw Finkenau
  const center = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);
  const [spot,setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI:true,
      clickableIcons:true,
      mapId: import.meta.env.VITE_MAP_ID
    }),[]);

//Der error ist irgendwie nicht entfernbar. Wenn man den type spezifiziert, funktioniert der Rest des codes nicht
//Ist vorerst nicht wichtig, aber im Hinterkopf behalten!
//Musste es jetzt mit explizitem any machen, bevor ich eine Lösung finde.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map:any) => (mapRef.current = map),[]);
  
  function updateMarkers(){
      console.log("Derzeitige Marker in der Map-componente");
      console.log(currentMarkers);
  }

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
        onCenterChanged={() => updateMarkers()}
      >

      {spot && <Marker position={spot}/>}

      {(currentMarkers.length != 0) && currentMarkers?.map(marker => <Marker key ={Math.random()} position={marker}/>)}
      <script>
      //console.log(currentMarkers);
      </script>

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
