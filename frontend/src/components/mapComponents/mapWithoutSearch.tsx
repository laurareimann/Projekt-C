/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../globals.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import styled from "styled-components";
import AddressData from "../../../ValuesForDetailedResult.json"

type MapOptions = google.maps.MapOptions;

const MapContainer = styled.div<{ height: string; width: string }>`
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border:none;
  border-radius:50px;
   @media (max-width: 768px) {
    width: 100%;
  } 
`

// Typescript Props
interface MapWithoutSearchProps {
  shouldRenderCircles?: boolean;
  circleRadii?: number[];
  circleColors?: string[];
  shouldRenderMarkers?: boolean;
  height?: string;
  width?: string;
}

const defaultColors = ["green", "yellow", "red"];

const startingSpot={lat: AddressData.currentStartingSpot[0], lng: AddressData.currentStartingSpot[1]};
const grocerySpot={lat: AddressData.currentClosestGrocery[0], lng: AddressData.currentClosestGrocery[1]};
const healthSpot ={lat: AddressData.currentClosestHealth[0], lng: AddressData.currentClosestHealth[1]};
const transitSpot={lat: AddressData.currentClosestTransit[0], lng: AddressData.currentClosestTransit[1]};


//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 
const MapWithoutSearch: React.FC<MapWithoutSearchProps> = ({
  shouldRenderCircles = true,
  circleRadii = [1250, 2500, 3750],
  circleColors = defaultColors,
  shouldRenderMarkers = true,
  height = "50vh", //default
  width = "50vh"   //default
  
}) => {

  //Wenn die map initialisiert wird, ist der default spot auf der Haw Finkenau
  //const center = useMemo<LatLngLiteral>(() => ({ lat: 53.5688823, lng: 10.0330191 }), []);
  //const [spot, setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [circles, setCircles] = useState<google.maps.Circle[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [reloadkey, setReloadKey] = useState(0);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: import.meta.env.VITE_MAP_ID
    }), []);


  useEffect(() => {
    if (mapLoaded && shouldRenderCircles) {
      // Clear existing circles
      circles.forEach((circle) => circle.setMap(null));

      // Create new circles
      const newCircles = circleRadii.map((radius, index) => {
        return new google.maps.Circle({
          radius,
          strokeColor: circleColors[index],
          strokeOpacity: 0.4,
          fillColor: circleColors[index],
          fillOpacity: 0,
          map: mapRef.current!,
        });
      });

      // Set the new circles
      setCircles(newCircles);
    } else {
      // Clear circles if shouldRenderCircles is false
      setCircles([]);
    }
  }, [mapLoaded, shouldRenderCircles, circleRadii]);

  //Der error ist irgendwie nicht entfernbar. Wenn man den type spezifiziert, funktioniert der Rest des codes nicht
  //Ist vorerst nicht wichtig, aber im Hinterkopf behalten!
  //Musste es jetzt mit explizitem any machen, bevor ich eine Lösung finde.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);



  return (
    <div>
      <MapContainer height={height} width={width}>
        <GoogleMap
          zoom={13}
          center={startingSpot}
          mapContainerClassName="map-container-without-search"
          options={options}
          onLoad={onLoad}
        >

        <Marker position={startingSpot}></Marker>

        {shouldRenderMarkers && (
        <Marker position={grocerySpot} icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'></Marker>
        )}
        {shouldRenderMarkers && (
          <Marker position={healthSpot} icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png'></Marker>
        )}
        {shouldRenderMarkers && (
            <Marker position={transitSpot} icon='http://maps.google.com/mapfiles/ms/icons/red-dot.png'></Marker>
        )}
        
         </GoogleMap>
        </MapContainer>
    </div>
  )
}

export default MapWithoutSearch;

