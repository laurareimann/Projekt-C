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
import MapLegend from "./mapLegend";

import walkingIcon from "../../assets/walkingIcon.svg";
import { Container } from "react-bootstrap";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;





const MapContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border:none;
  border-radius:50px;
  margin-bottom:10px;
  
`




// Typescript Props
interface MapWithoutSearchProps {
  center: LatLngLiteral;
  shouldRenderCircles?: boolean;
  circleRadii?: number[];
  circleColors?: string[];
}

const defaultCenter: LatLngLiteral = { lat: 53.5688823, lng: 10.0330191 };
const defaultColors = ["green", "yellow", "red"];

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 
const MapWithoutSearch: React.FC<MapWithoutSearchProps> = ({
  center = defaultCenter,
  shouldRenderCircles = true,
  circleRadii = [1250, 2500, 3750],
  circleColors = defaultColors
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
          center,
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
  }, [mapLoaded, shouldRenderCircles, center, circleRadii]);

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
      <MapContainer>
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerClassName="map-container-without-search"
          options={options}
          onLoad={onLoad}
        >
          {/* Render dynamically generated circles */}
          {shouldRenderCircles && (
            <Marker position={center} />
          )}

        </GoogleMap>

        {shouldRenderCircles && (
          <MapLegend
            circleRadii={circleRadii}
            circleColors={circleColors}
            logo={walkingIcon}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default MapWithoutSearch;

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
