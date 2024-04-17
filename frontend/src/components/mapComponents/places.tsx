/* eslint-disable @typescript-eslint/no-unused-vars */
//Places ist ne API für die Navigierung der Karte und später auch für die Bewertung der location wichtig

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "../../globals.css";
import "../Inputforms";
import "../MapSearchInput";
import MapInputBar from "../MapSearchInput";

type PlacesProps = {
  setSpot: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setSpot }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setSpot({ lat, lng });
  };

  return (

    <Combobox onSelect={handleSelect}>
      <ComboboxInput
      
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search preview address"
      />
      <i className ="icon"></i>
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
}