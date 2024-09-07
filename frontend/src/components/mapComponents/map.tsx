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
import { useScore } from "./StreetProvider";
import axios from "axios";
import FilterOverlay from "../filterComponents/FilterOverlay";
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

const defaultColors = ["green", "yellow", "red"];

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 

export default function Map({ shouldRenderCircles = true, circleRadii = [1250, 2500, 3750], circleColors = defaultColors }) {

  const [helpCounter, setHelpCounter] = useState(0);

  //Wenn die map initialisiert wird, ist der default spot auf der HAW Finkenau
  const center = useMemo<LatLngLiteral>(() => ({ lat: 53.5688823, lng: 10.0330191 }), []);
  const [directions, setDirections] = useState<DirectionsResult>();
  const [spot, setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const directService = new google.maps.DirectionsService();

  //Variablen zur Score-Berechnung 
  const [selectedMarker, setSelectedMarker] = useState<MarkerWindow | null>()
  const [isGroceriesPriority, setGroceriesPriority] = useState(false);
  const [isHealthPriority, setHealthPriority] = useState(false);
  const [isTransitPriority, setTransitPriority] = useState(false);
  const [InitialCalculationDone, setCalculationDone] = useState(false);
  const [travelMode, setTravelMode] = useState("walking");
  const [currentDurationUseState, setCurrentDuration] = useState(0);

  //Kontextvariablen
  const updateScore = useScore().setScore;


  //Temporöre Variablen zu Kontextvariablen
  const tempGroceryArray: Array<number> = [0.2, 0.1];
  const tempHealthArray: Array<number> = [1.3, 4.2];
  const tempTransitArray: Array<number> = [5.2, 2.5];
  let tempHealthDuration: number = 42;
  let tempGroceryDuration: number = 42;
  let tempTransitDuration: number = 42;
  const tempSearchResultArray: Array<number> = [1.2, 3.4];



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
    const SpotLat = tempSearchResultArray[0];
    const SpotLng = tempSearchResultArray[1];
    const currentGroceryDuration = tempGroceryDuration;
    const currentHealthDuration = tempHealthDuration;
    const currentTransitDuration = tempTransitDuration;


    try {
      await axios.post("http://localhost:8080/updateJson", {
        GroceryLat,
        GroceryLng,
        HealthLat,
        HealthLng,
        TransitLat,
        TransitLng,
        SpotLat,
        SpotLng,
        currentGroceryDuration,
        currentHealthDuration,
        currentTransitDuration,
        tempCurrentTravelMode,
        tempCurrentScore,
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


  //Suche in der Nähe gelegender places
  async function performNearbySearch(requestList: google.maps.places.PlaceSearchRequest[]) {
    service.nearbySearch(requestList[0], callback);
    service.nearbySearch(requestList[1], callback);
    service.nearbySearch(requestList[2], callback);
  }

  //Wenn die helper map noch nicht initialisiert wurde -> dies bitte tun
  if (setupCheck == false) {
    setTimeout(() => {
      placesMapV2 = new google.maps.Map(document.getElementById("map") as HTMLElement, optionsHelper);
      service = new google.maps.places.PlacesService(placesMapV2);
      infowindow = new google.maps.InfoWindow();

      console.log("Helper mapV2 successfully set up");
    }, 2000);
    //Danach die flag auf true setzen
    setupCheck = true;
  }


  //Callback-Funktion für die NearbySearch
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function callback(results: any, status: any) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        console.log("You are requesting too fast");
      }

      for (let i = 0; i < results.length; i++) {
        //Supermärkte werden in Array 1 abgelegt
        if (results[i].types.includes("grocery_or_supermarket")) {
          console.log("Supermarkt: " + results[i].name)
          markersWithInfoGroceries.push({
            id: i,
            location: {
              lat: results[i].geometry.location.lat(),
              lng: results[i].geometry.location.lng()
            },
            address: results[i].vicinity,
            name: results[i].name,
            prevState: null
          })
        }
        //Apotheken, Kliniken et cetera
        if (results[i].types.includes("doctor")) {
          console.log("Gesundheitswesen: " + results[i].name)
          markersWithInfoHealth.push({
            id: i,
            location: {
              lat: results[i].geometry.location.lat(),
              lng: results[i].geometry.location.lng()
            },
            address: results[i].vicinity,
            name: results[i].name,
            prevState: null
          })
        }
        //Öffentlicher Personen-Nahverkehr
        if (results[i].types.includes("transit_station")) {
          console.log("ÖPNV: " + results[i].name)
          console.log("ÖPNV-Typ: " + results[i].types)
          markersWithInfoTransit.push({
            id: i,
            location: {
              lat: results[i].geometry.location.lat(),
              lng: results[i].geometry.location.lng()
            },
            address: results[i].vicinity,
            name: results[i].name,
            prevState: null
          })
        }
      }
    }

    /*For debugging & sanity checks in the console
    console.log("Supermärkte");
    console.log(markersWithInfoGroceries);
    console.log("Gesundheitswesen");
    console.log(markersWithInfoHealth);
    console.log("ÖPNV");
    console.log(markersWithInfoTransit);
    */
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
  console.log(shouldRenderCircles);

  //Kleine Helferfunktion. Inkrementiert eine Variable, damit sich die Karte aktualisiert. Werde noch testen, ob diese am Ende vonnöten ist oder nicht
  function updateMarkers() {
    if (updateCheck == false) {
      setHelpCounter(helpCounter + 1);
    }
  }

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
    finalMean = 10000;
    let finalDivisor: number = 3;
    fastestRouteGroceries = 10000;
    fastestRouteHealth = 10000;
    fastestRouteTransit = 10000;
    //setCurrentTravelMode(transitMode)
    //Text, der im ScoreContainer gesetzt wird
    //console.log(transitMode)

    switch (transitMode) {
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
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempGroceryArray)

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
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempHealthArray)

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
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempTransitArray)

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
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempGroceryArray)
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
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempHealthArray)
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
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempTransitArray)

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
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempGroceryArray)

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
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempHealthArray)
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
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempTransitArray)

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
                    tempGroceryArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempGroceryArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempGroceryArray)
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
                    tempHealthArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempHealthArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempHealthArray)
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
                    tempTransitArray[0] = MarkersArrayTogether[i][j].location.lat;
                    tempTransitArray[1] = MarkersArrayTogether[i][j].location.lng;
                    console.log("Duration of current route: " + result.routes[0].legs[0].duration!.value);
                    console.log(tempTransitArray)
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

      //Werte für JSON-Datei zwischenspeichern
      tempGroceryDuration = Math.ceil(fastestRouteGroceries / 60);
      tempHealthDuration = Math.ceil(fastestRouteHealth / 60);
      tempTransitDuration = Math.ceil(fastestRouteTransit / 60);
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

      //Finale Berechnung des Scores und updaten der JSON-Datei
      finalMean = Math.ceil(((fastestRouteGroceries + fastestRouteHealth + fastestRouteTransit) / 60 / finalDivisor));
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
        //setGroceriesPriority(!isGroceriesPriority)
        break;
      case "Health":
        if (isHealthPriority === true) {
          HealthButtonString = ""
        } else {
          HealthButtonString = "darkPink"
        }
        //setHealthPriority(!isHealthPriority)
        break;
      case "Transit":
        if (isTransitPriority === true) {
          TransitButtonString = ""
        } else {
          TransitButtonString = "darkPink"
        }
        //setTransitPriority(!isTransitPriority)
        break;
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

            //Die Arrays leeren
            currentCategory1.splice(0, currentCategory1.length);
            currentCategory2.splice(0, currentCategory2.length);
            currentCategory3.splice(0, currentCategory3.length);
            //"Neue" arrays
            markersWithInfoTransit.splice(0, markersWithInfoTransit.length)
            markersWithInfoGroceries.splice(0, markersWithInfoGroceries.length)
            markersWithInfoHealth.splice(0, markersWithInfoHealth.length)
            //NearbySearch-Requests für die verschiedenen types
            const request = {
              location: { lat, lng },
              radius: 5000,
              type: "grocery_or_supermarket"
            }
            const request_2 = {
              location: { lat, lng },
              radius: 5000,
              type: "doctor"
            }
            const request_3 = {
              location: { lat, lng },
              radius: 5000,
              type: "transit_station"
            }
            const requesttypes = [request, request_2, request_3]
            //Es wird im vorgegebenen Umkreis nach places gesucht
            performNearbySearch(requesttypes);
            //Timeout von +- 1 Sekunde, damit die Marker richtig laden
            setTimeout(() => {
              setCalculationDone(true);
              setSpot(position);
              mapRef.current?.panTo(position)
              calculateScorePrototype(position, travelMode);
            }, 2000);
            //Die flag der updateMarkers()-Funktion auf falsch stellen
            updateCheck = false;
          }} />
        </ControlContainer>
        <FilterOverlay />
      </Searchbar>

      <ButtonGrid>
        <StyledButton color={WalkingButtonString} onClick={() => { setCurrentTravelMode("walking"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "walking"); } }}> <img src={walkingIcon} alt="Walking Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
        <StyledButton color={DrivingButtonString} onClick={() => { setCurrentTravelMode("driving"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "driving") } }}><img src={carIcon} alt="Car Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
        <StyledButton color={TransitButtonStringTravelMode} onClick={() => { setCurrentTravelMode("transit"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "transit") } }}><img src={transitIcon} alt="Tram Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
        <StyledButton color={BicycleButtonString} onClick={() => { setCurrentTravelMode("bicycle"); if (InitialCalculationDone == true) { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, "bicycle") } }}><img src={bikeIcon} alt="bike Icon" style={{ width: "30px", height: "30px" }} /></StyledButton>
      </ButtonGrid>

      <MapAndPrioGrid>
        <div></div> {/* Empty div for left column of MapAndPrioGrid */}

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


          {selectedMarker && <InfoWindow onCloseClick={() => { setSelectedMarker(null); }} position={{
            lat: selectedMarker.location.lat,
            lng: selectedMarker.location.lng
          }}>
            <div>
              <h2>{selectedMarker.name}</h2>
              <h3>{travelMode}: {Math.ceil(currentDurationUseState / 60)} min </h3>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>}
          {shouldRenderCircles && spot && (
            <MapLegend
              circleRadii={circleRadii}
              circleColors={circleColors}
              logo={walkingIcon}
            />
          )}
        </GoogleMap>

        <PriorityGrid>
          <StyledPrioButton color={GroceryButtonString} onClick={() => {
            setPriorityButton("Groceries");
            setGroceriesPriority(!isGroceriesPriority);
            groceryBool = !groceryBool;
            console.log("Grocerybool is: " + groceryBool);
            console.log(isGroceriesPriority);
            if (InitialCalculationDone) {
              { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
            }

          }}>Prioritise Groceries</StyledPrioButton>
          <StyledPrioButton color={HealthButtonString} onClick={() => {
            setPriorityButton("Health");
            setHealthPriority(!isHealthPriority);
            healthBool = !healthBool;
            console.log("Healthbool is: " + healthBool);
            console.log(isHealthPriority)
            if (InitialCalculationDone) {
              { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
            }

          }}>Prioritise health departments</StyledPrioButton>
          <StyledPrioButton color={TransitButtonString} onClick={() => {
            setPriorityButton("Transit");
            setTransitPriority(!isTransitPriority);
            console.log(isTransitPriority);
            transitBool = !transitBool;
            console.log("Transitbool is: " + transitBool);
            if (InitialCalculationDone) {
              { calculateScorePrototype({ lat: spot!.lat, lng: spot!.lng }, travelMode); }
            }
          }}>Prioritise transit stations</StyledPrioButton>
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
