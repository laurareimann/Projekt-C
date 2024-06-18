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


const markersWithInfoGroceries : Array<MarkerWindow> = []
const markersWithInfoHealth : Array<MarkerWindow> = []
const markersWithInfoTransit : Array<MarkerWindow> = []

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

//Map component aus Google-Tutorial.
export default function Map({ shouldRenderCirlces = true }) {

  const [helpCounter,setHelpCounter] = useState(0);

  //Wenn die map initialisiert wird, ist der default spot auf der HAW Finkenau
  const center = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);
  const [directions,setDirections] = useState<DirectionsResult>();
  const [spot,setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const [selectedMarker,setSelectedMarker] = useState<MarkerWindow | null>()
  const customScore = useScore().currentScore;
  const updateScore = useScore().setScore;

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


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map:any) => (mapRef.current = map),[]);
  console.log(shouldRenderCirlces);  

  //Kleine Helferfunktion. Inkrementiert eine Variable, damit sich die Karte aktualisiert. Werde noch testen, ob diese am Ende vonnöten ist oder nicht
  function updateMarkers(){
      if(updateCheck==false){
        setHelpCounter(helpCounter+1);
        }
  }

  const selectRouteFromMarker=(spotLiterals:LatLngLiteral)=>{
    if(!spot)return;

    const service = new google.maps.DirectionsService();
    service.route({
      origin:spot,
      destination:spotLiterals,
      travelMode:google.maps.TravelMode.WALKING
    },(result,status)=>{
      if(status === "OK" && result){
        setDirections(result);
      }
    })
  }

  //Score-Berechnungsalgorithmus
  async function calculateScorePrototype(startPoint:LatLngLiteral){
    //Medianwert wird resetted, damit Ergebnisse stets "frisch" sind
    finalMean = 10000;
    //Text, der im ScoreContainer gesetzt wird
    let tmpTxt:string = "";
      const algorithmService = new google.maps.DirectionsService();
      
      //Es wird jedes der drei derzeitigen Arrays durchgegangen und nach und nach geprüft,welches Ziel mit der derzeitig gewählten Fortbewegung am nächsten ist
      for(let i = 0;i < markersWithInfoGroceries.length;i++){
        algorithmService.route({
          origin:{
            lat:startPoint.lat,
            lng:startPoint.lng
          },
          destination:markersWithInfoGroceries[i].location,
          travelMode:google.maps.TravelMode.WALKING
        },(result,status)=>{
          if(status === "OK" && result){            
            if(result.routes[0].legs[0].duration!.value < fastestRouteGroceries ){
              fastestRouteGroceries = result.routes[0].legs[0].duration!.value
              console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value)
              console.log("Current fastest route: " + fastestRouteGroceries)
              tmpTxt = result.routes[0].legs[0].duration!.text.substring(0,result.routes[0].legs[0].duration!.text.indexOf(" "));
            }
          }
        })
      }
      for(let i = 0;i < markersWithInfoHealth.length;i++){
        algorithmService.route({
          origin:{
            lat:startPoint.lat,
            lng:startPoint.lng
          },
          destination:markersWithInfoHealth[i].location,
          travelMode:google.maps.TravelMode.WALKING
        },(result,status)=>{
          if(status === "OK" && result){     
            if(result.routes[0].legs[0].duration!.value < fastestRouteHealth ){
              fastestRouteHealth = result.routes[0].legs[0].duration!.value
              console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value)
              console.log("Current fastest route: " + fastestRouteHealth)
              tmpTxt = result.routes[0].legs[0].duration!.text.substring(0,result.routes[0].legs[0].duration!.text.indexOf(" "));
            }
          }
        })
      }

      for(let i = 0;i < markersWithInfoTransit.length;i++){
        algorithmService.route({
          origin:{
            lat:startPoint.lat,
            lng:startPoint.lng
          },
          destination:markersWithInfoTransit[i].location,
          travelMode:google.maps.TravelMode.WALKING
        },(result,status)=>{
          if(status === "OK" && result){
            if(result.routes[0].legs[0].duration!.value < fastestRouteTransit ){
              fastestRouteTransit = result.routes[0].legs[0].duration!.value
              console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value)
              console.log("Current fastest route: " + fastestRouteTransit)
              tmpTxt = result.routes[0].legs[0].duration!.text.substring(0,result.routes[0].legs[0].duration!.text.indexOf(" "));
              //Nachdem alles berechnet wurde, wird die folgende Rechnung getätigt. Das /60 ist, weil die Zeitangaben in Sekunden sind.
              finalMean = Math.ceil(((fastestRouteGroceries + fastestRouteHealth + fastestRouteTransit)/60)/3)
            }
          }
        })
      }
      //Im ScoreContainer wird der Text angepasst
      setTimeout(()=>{updateScore(finalMean.toString())},1500)
  }

  return (
  <div>
    <ControlContainer>
      <Places setSpot={(position) =>{
        //Schnellstwerte für neuen Durchlauf des Algorithmus zurücksetzen
        fastestRouteGroceries = 100000;
        fastestRouteHealth = 100000;
        fastestRouteTransit = 100000;
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
          setSpot(position);
          mapRef.current?.panTo(position)
          calculateScorePrototype(position);
        },2000);
        //Die flag der updateMarkers()-Funktion auf falsch stellen
        updateCheck=false;
        

      }}/>

    </ControlContainer>
    
      {directions && <Distance leg={directions.routes[0].legs[0]}/>}

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

      {shouldRenderCirlces && spot && circles.map((circles, index) => (
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
        selectRouteFromMarker(marker.location)}} ></Marker>)}
      
      {spot && markersWithInfoHealth.map(marker =>  <Marker key ={Math.random()+1} icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' title="Health marker" position={marker.location} onClick={()=>{
        setSelectedMarker(marker);
        selectRouteFromMarker(marker.location)}} ></Marker>)}
      
      {spot && markersWithInfoTransit.map(marker =>  <Marker key ={Math.random()+2} icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' title="Transit marker" position={marker.location} onClick={()=>{
        setSelectedMarker(marker);
        selectRouteFromMarker(marker.location)}} ></Marker>)}

      {selectedMarker && ( <InfoWindow onCloseClick={()=>{setSelectedMarker(null);}} position={{
        lat:selectedMarker.location.lat,
        lng:selectedMarker.location.lng
      }}>
        
        <div>
          <h2>{selectedMarker.name}</h2>
          <p>{selectedMarker.address}</p>
        </div>
        </InfoWindow>)}

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
