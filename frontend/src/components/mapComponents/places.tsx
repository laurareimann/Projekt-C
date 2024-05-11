/* eslint-disable prefer-const */
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
import { Component, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { getFormattedAdressStrings } from "../tmpRefreshHelper";
import {useUpdateStreetContext} from "./StreetProvider";
let tempPreviewAdress:string;


type PlacesProps = {
  setSpot: (position: google.maps.LatLngLiteral) => void;
};



export default function Places({ setSpot }: PlacesProps) {
  
  const updateStreetName = useUpdateStreetContext();
  
  const [currentStreet,setStreet] = useState("");
  
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

    const results = await getGeocode({ address:val });

    const { lat, lng } = await getLatLng(results[0]);
    let address:string;
    //Adresse mit Postleitzahl et cetera
    address = results[0].formatted_address;

    updateStreetName(address);


    /* 
    legacy code, den ich wahrscheinlich später brauchen werde
    Ich bewahre ihn erstmal auf, aber wird wahrscheinlich in zukünftigen commits gelöscht

    if(results[0].address_components.find((component) => {
      return component.types.includes("street_address") ;
    })){
      address_PostalCode =(results[0].address_components.find((component) => {
        return component.types.includes("street_address")}))!.long_name;
    }else{
      console.log("This place doesn't have a postal_code");
    }
    
    for(let i = 0; i < results[0].address_components.length; i++){
      //console.log(results[0].address_components[i]);
    switch(results[0].address_components[i].types[0]){
      //Straßennummer
      case "street_number":
        getFormattedAdressStrings("street_number",results[0].address_components[i].long_name);
        break;
      case "postal_code":
        getFormattedAdressStrings("postal_code",results[0].address_components[i].long_name);
        break;
      case "route":
        getFormattedAdressStrings("street",results[0].address_components[i].long_name);
        break;
      case "locality":
        getFormattedAdressStrings("city",results[0].address_components[i].long_name);
        break;
        case "administrative_area_level_1":
        getFormattedAdressStrings("state",results[0].address_components[i].long_name);
    }
  
    }
    getFormattedAdressStrings("fix street appearance","now");
      //console.log(currentAddressStreet,currentAdressPostalCode,currentStreetNumber,currentCity,currentState);
*/

    //sanity check
    console.log("Gesamte Adresse: " + address);
    setSpot({ lat, lng });

  };

  return (

    <Combobox onSelect={handleSelect}>
      <ComboboxInput
              
        value={value}
        onChange={(e) => {setValue(e.target.value), tempPreviewAdress = e.target.value}}
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
