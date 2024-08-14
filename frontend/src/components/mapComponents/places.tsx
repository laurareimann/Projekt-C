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
import {useStreetNameNew,useZipCodeNew,useCityNew} from "./StreetProvider";
import {Bounce, ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
let tempPreviewAdress:string;


type PlacesProps = {
  setSpot: (position: google.maps.LatLngLiteral) => void;
};



export default function Places({ setSpot }: PlacesProps) {

  const notify = () => toast("Please enter a valid home address");
  
  const updateStreetName = useStreetNameNew().setStreet;

  const updateZipCode = useZipCodeNew().setZipCode;

  const updateCity = useCityNew().setCity;

  //Temporäre Variablen, um die Straße richtig anzuzeigen
  let tmpStreetName:string;
  let tmpStreetNumber:string;
  let tmpCheckForStreetNumber:boolean;
  let tmpCheckForZipCode:boolean;
  let tmpZipCode:string;
  tmpZipCode = "";
  tmpCheckForZipCode = false;
  tmpCheckForStreetNumber = false;
  
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


    //Es wird nach einem zipCode gechecked
    for(let i = 0; i < results[0].address_components.length;i++){
      if(results[0].address_components[i].types[0] === "street_number" ){

        //Wenn eine Postleitzahl besteht, wird diese trotzdem zwischengespeichert, um weiteres zu checken
        tmpCheckForStreetNumber = true;
        tmpStreetNumber = results[0].address_components[i].long_name;
      }




    }

    //Bspw. bei der Eingabe "Bremen" ist die Postleitzahl nur 2 Zeichen lang, weswegen ein popup erscheint, was den user prompted, eine "richtige Adresse einzugeben"
    if(tmpCheckForStreetNumber == false){
      //alert("Bitte gib eine richtige Adresse ein");
      toast.error('Please enter a valid home address!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return 0;
    }
    
    if(tmpCheckForStreetNumber == true){
    let address:string;
    //Adresse mit Postleitzahl et cetera
    address = results[0].formatted_address;

    //Es werden die einzelnen Teile der Addressen-Suche durchgegangen und dementsprechend die Werte angepasst
    for(let i = 0; i < results[0].address_components.length; i++){
      //console.log(results[0].address_components[i]);
    switch(results[0].address_components[i].types[0]){
      //Straßennummer
      case "street_number":
        tmpStreetNumber = results[0].address_components[i].long_name;
        console.log("Aktuelle Straßennummer: " + results[0].address_components[i].long_name )
        break; 
      case "postal_code":
        updateZipCode(results[0].address_components[i].long_name);
        break;
      case "route":
        tmpStreetName = results[0].address_components[i].long_name
        break;
      case "locality":
        updateCity(results[0].address_components[i].long_name);
        break;
        //Falls wir irgendwann noch das Bundesland brauchen
        case "administrative_area_level_1":

    }
  
    }
    //Da Straßennummer und Straßenname getrennt wurden, müssen die hier nochmal zusammengefügt werden
    tmpStreetName = tmpStreetName + " " + tmpStreetNumber;
    updateStreetName(tmpStreetName);

    //sanity check
    console.log("Gesamte Adresse: " + address);
    console.log(lat + " " + lng)
    setSpot({ lat, lng });
  }
  };

  return (
<div>
    
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
              
        value={value}
        onChange={(e) => {setValue(e.target.value), tempPreviewAdress = e.target.value}}
        disabled={!ready}
        className="combobox-input"
        placeholder="Enter your desired address"
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

    </div>
  );
}
