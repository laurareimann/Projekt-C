/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
//Diese Komponente wird der map container für die Startseite

import './globals.css';
import styled from 'styled-components';
import { useState, useMemo, SetStateAction } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  LatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React from "react";
import { GoogleMapProps } from "react-google-maps";


const Map_Border = styled.div`
  border-color : var(--color--blue--1);
  border-radius: 30px;
  flex-shrink:0;
`;

const SearchBar_Input = styled.div`
  border-color : var(--color--pink--3);
  border-radius: 30px;
  flex-shrink:0;
  margin-bottom: 10px;
`;



export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState<google.maps.LatLng | google.maps.LatLngLiteral>();

  return (
    <>
      <SearchBar_Input>
        <PlacesAutocomplete setSelected={setSelected} />
        </SearchBar_Input>

      <Map_Border>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
      </Map_Border>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }:{setSelected:React.Dispatch<SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral | undefined>>}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address:string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

