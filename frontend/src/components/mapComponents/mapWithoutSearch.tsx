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


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


const MapContainer = styled.div`
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
}

const defaultCenter: LatLngLiteral = { lat: 53.5688823, lng: 10.0330191 };

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 
const MapWithoutSearch: React.FC<MapWithoutSearchProps> = ({ center = defaultCenter, shouldRenderCircles = true, circleRadii = [1250, 2500, 3750] }) => {

  //Wenn die map initialisiert wird, ist der default spot auf der Haw Finkenau
  //const center = useMemo<LatLngLiteral>(() => ({ lat: 53.5688823, lng: 10.0330191 }), []);
  //const [spot, setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [reloadkey, setReloadKey] = useState(0);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: import.meta.env.VITE_MAP_ID
    }), []);



  useEffect(() => {
    if (mapRef.current && mapLoaded && shouldRenderCircles) {
      circles.forEach(circle => {
        if (circle instanceof google.maps.Circle) {
          circle.setMap(null); // This removes the circle from the map
        }
      });
      
      //setReloadKey(reloadkey + 1);	// Reload the map to remove previous circles

      // Gehgeschwindigkeit: 5km/h
      // Grün: 1250m, 15min zu Fuß
      // Gelb: 2500m, 30min zu Fuß
      // Rot: 3750m, 45min zu Fuß
      const circleConfigs = [
        { radius: circleRadii[0], options: { strokeColor: "green", fillOpacity: 0, strokeOpacity: 0.4 } },
        { radius: circleRadii[1], options: { strokeColor: "yellow", fillOpacity: 0, strokeOpacity: 0.4 } },
        { radius: circleRadii[2], options: { strokeColor: "red", fillOpacity: 0, strokeOpacity: 0.4 } },
      ];

      const generatedCircles = circleConfigs.map((config, index) => (
        <Circle
          key={index}
          center={center}
          radius={config.radius}
          options={config.options}
        />
      ));

      const marker = <Marker key='marker' position={center} />;

      // Set new circles
      setCircles([marker, ...generatedCircles]);


      // Cleanup function to remove previous circles
      return () => {
        setCircles([]);
      };
    }
  }, [mapLoaded, shouldRenderCircles, center, circleRadii]); // Linter beschwert sich hier, dass circles nicht in der Abhängigkeitsliste ist, aber das updated sonst im Loop


  //Der error ist irgendwie nicht entfernbar. Wenn man den type spezifiziert, funktioniert der Rest des codes nicht
  //Ist vorerst nicht wichtig, aber im Hinterkopf behalten!
  //Musste es jetzt mit explizitem any machen, bevor ich eine Lösung finde.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);


  return (
    <div>
      <MapContainer>
        <GoogleMap
          key={reloadkey}
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {/* Render dynamically generated circles */}
          {circles}

        </GoogleMap>
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
