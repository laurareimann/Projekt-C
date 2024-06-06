/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../globals.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
import { AdvancedMarker } from "@vis.gl/react-google-maps";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

let placesMapV2: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;
let setupCheck:boolean = false;
let updateCheck:boolean= false;
const currentByFootV2: Array<google.maps.LatLngLiteral> = []

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

  const [helpCounter,setHelpCounter] = useState(0);

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


    //Helper-map_setup
  const defaultCenter = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);

  const optionsHelper = useMemo<MapOptions>(
    ()=> ({
      center:defaultCenter,
      zoom:15
    }),[defaultCenter]
  )


  //Suche in der Nähe gelegender places
  function performNearbySearch(requestParam: google.maps.places.PlaceSearchRequest){ 
    service.nearbySearch(requestParam,callback);    
  }
 
//Wenn die helper map noch nicht initialisiert wurde -> dies bitte tun
  if(setupCheck == false){
    setTimeout(()=>{
      placesMapV2 = new google.maps.Map(document.getElementById("map") as HTMLElement,optionsHelper);
      service = new google.maps.places.PlacesService(placesMapV2);
      console.log("Helper mapV2 successfully set up");
    },2000);
    //Danach die flag auf true setzen
    setupCheck= true;
  }


  //Callback-Funktion für die NearbySearch
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 function callback(results:any,status:any){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    currentByFootV2.splice(0,currentByFootV2.length);
    for(let i = 0; i < results.length;i++){
      currentByFootV2.push({
        lat: results[i].geometry.location.lat(),
        lng: results[i].geometry.location.lng()
      })
  }}
}



//Der error ist irgendwie nicht entfernbar. Wenn man den type spezifiziert, funktioniert der Rest des codes nicht
//Ist vorerst nicht wichtig, aber im Hinterkopf behalten!
//Musste es jetzt mit explizitem any machen, bevor ich eine Lösung finde.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map:any) => (mapRef.current = map),[]);
  
  function updateMarkers(){
      if(updateCheck==false){
        setHelpCounter(helpCounter+1);
        }
  }
  
  return (
  <div>
    <TestControlContainer>
      <Places setSpot={(position) =>{
        const lat:number = position.lat;
        const lng:number = position.lng;
        let tmpSpot:LatLngLiteral;

        const request = {
          location:{lat,lng},
          radius:100
        }

        performNearbySearch(request);
        console.log("Derzeitige Results in der HelperMap-Komponente")
        console.log(currentByFootV2)

        currentByFootV2.splice(0,currentByFootV2.length);
        setTimeout(()=>{
          setSpot(position);
          mapRef.current?.panTo(position);
        },200);
        updateCheck=false;
      }}/>

    </TestControlContainer>
    <TestMap>
    
      <GoogleMap zoom={14} 
        center={center} 
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
        onCenterChanged={() => {
          updateMarkers();
        }}
      >
      //Marker auf der Map platzieren
      {spot && <Marker position={spot} onLoad={()=> {"Initial marker placed"}}/>}
      {spot && currentByFootV2.map(marker => <Marker key ={Math.random()} position={marker} onLoad={()=> {console.log("Nearby marker placed");updateCheck=true;}}/>) }

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
