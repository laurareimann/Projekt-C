/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../globals.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  useGoogleMap,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";
import styled from "styled-components";
import { useNearby } from "./StreetProvider";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { currentAddressStreetTMP } from "../tmpRefreshHelper";
import { InfoWindow } from "react-google-maps";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

//Infowindow

let placesMapV2: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;
let setupCheck:boolean = false;
const updateCheck:boolean= false;
//Arrays in denen die NearbySearch-Ergebnisse gespeichert werden
//Supermärkte,Läden et cetera
const currentCategory1: Array<google.maps.LatLngLiteral> = []
//Gesundheitswesen
const currentCategory2: Array<google.maps.LatLngLiteral> = []
//Öffentliche Verkehrsmittel(for now)
const currentCategory3: Array<google.maps.LatLngLiteral> = []

//Infowindow


const MapContainer = styled.div`
  height: 100%;
  width: 100%;
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

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 
export default function Map({ shouldRenderCirlces = true }) {

  const [helpCounter,setHelpCounter] = useState(0);

  //Wenn die map initialisiert wird, ist der default spot auf der HAW Finkenau
  const center = useMemo<LatLngLiteral>(() => ({ lat: 53.5688823, lng: 10.0330191 }), []);
  const [spot, setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();

  const tmp_ref = mapRef.current?.getInstance

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: import.meta.env.VITE_MAP_ID
    }), []);


  // Gehgeschwindigkeit: 5km/h
  // Grün: 1250m, 15min zu Fuß
  // Gelb: 2500m, 30min zu Fuß
  // Rot: 3750m, 45min zu Fuß
  const [circles, setCircles] = useState([
    { radius: 1250, options: { strokeColor: 'green', fillOpacity: 0, strokeOpacity: 0.5 } },
    { radius: 2500, options: { strokeColor: 'yellow', fillOpacity: 0, strokeOpacity: 0.5 } },
    { radius: 3750, options: { strokeColor: 'red', fillOpacity: 0, strokeOpacity: 0.5 } },
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
      { radius: 1250, options: { strokeColor: 'green', fillOpacity: 0, strokeOpacity: 0.5, center: spot} },
      { radius: 2500, options: { strokeColor: 'yellow', fillOpacity: 0, strokeOpacity: 0.5, center: spot} },
      { radius: 3750, options: { strokeColor: 'red', fillOpacity: 0, strokeOpacity: 0.5, center: spot} },
    ]

    // Update state to re-render circles
    setCircles(newCircles);

  }, [spot]); // Linter beschwert sich hier, dass circles nicht in der Abhängigkeitsliste ist, aber das updated sonst im Loop


   

    //Helper-map_setup
    //Center ist hier wieder unser Campus *smiley*
  const defaultCenter = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);

  const optionsHelper = useMemo<MapOptions>(
    ()=> ({
      center:defaultCenter,
      zoom:15
    }),[defaultCenter]
  )


  //Suche in der Nähe gelegender places
  function performNearbySearch(requestList: google.maps.places.PlaceSearchRequest[]){ 
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
        currentCategory1.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
        })
      }
      //Apotheken, Kliniken et cetera
      if(results[i].types.includes("health")){
        console.log("Gesundheitswesen: " + results[i].name)
        currentCategory2.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
        })
      }
      //Öffentlicher Personen-Nahverkehr :fancy_emoji:
      if(results[i].types.includes("transit_station")){
        console.log("ÖPNV: " + results[i].name)
        currentCategory3.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng()
        })
      }
  }}

  console.log("Supermärkte");
  console.log(currentCategory1);
  console.log("Gesundheitswesen");
  console.log(currentCategory2);
  console.log("ÖPNV");
  console.log(currentCategory3);
}



  


  //Der error ist irgendwie nicht entfernbar. Wenn man den type spezifiziert, funktioniert der Rest des codes nicht
  //Ist vorerst nicht wichtig, aber im Hinterkopf behalten!
  //Musste es jetzt mit explizitem any machen, bevor ich eine Lösung finde.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map:any) => (mapRef.current = map),[]);

  //Kleine Helferfunktion, um google maps einen kleinen Arschtritt zu geben, damit die Marker auch alle angezeigt werden
  function updateMarkers(){
      if(updateCheck==false){
        setHelpCounter(helpCounter+1);
        }
  }

  return (
  <div>
    <ControlContainer>
      
      <Places setSpot={(position) =>{
        setSpot(position);
        mapRef.current?.panTo(position);
      }}/>
    </ControlContainer>
    <MapContainer>
      <GoogleMap zoom={14} 
        center={center} 
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >

      {spot && <Marker position={spot}/>}


      </GoogleMap>
      </MapContainer>
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
