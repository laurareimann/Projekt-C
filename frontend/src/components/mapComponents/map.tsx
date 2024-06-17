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
const ControlContainer = styled.div`
  height:fit-content;
  width: 500px;
  margin:auto;
  padding: 0.3rem;
  background-color: var(--color--pink-3);
  border-radius:20px;
  margin-bottom:10px;
`


const defaultColors = ["green", "yellow", "red"];

//Map component aus Google-Tutorial. Ist jetzt erstmal für unsere test page. 

export default function Map({ shouldRenderCircles = true, circleRadii = [1250, 2500, 3750], circleColors = defaultColors }) {

  //Wenn die map initialisiert wird, ist der default spot auf der Haw Finkenau
  const center = useMemo<LatLngLiteral>(() => ({ lat: 53.5688823, lng: 10.0330191 }), []);
  const [spot, setSpot] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
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

  }, [spot]); // Linter beschwert sich hier, dass circles nicht in der Abhängigkeitsliste ist, aber das updated sonst im Loop


  //Der error ist irgendwie nicht entfernbar. Wenn man den type spezifiziert, funktioniert der Rest des codes nicht
  //Ist vorerst nicht wichtig, aber im Hinterkopf behalten!
  //Musste es jetzt mit explizitem any machen, bevor ich eine Lösung finde.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  console.log(shouldRenderCircles);


  return (
    <div>
      <ControlContainer>

        <Places setSpot={(position) => {
          setSpot(position);
          mapRef.current?.panTo(position);
        }} />
      </ControlContainer>
      <MapContainer>
        <GoogleMap zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >

          {shouldRenderCircles && spot && circles.map((circles, index) => (
            <Circle
              key={index}
              center={spot}
              radius={circles.radius}
              options={circles.options}
            />
          ))}

          {spot && <Marker position={spot} />}

        </GoogleMap>

        {shouldRenderCircles && spot && (
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
