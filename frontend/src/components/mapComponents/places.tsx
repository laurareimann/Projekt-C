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
import {useStreetNameNew,useZipCodeNew,useCityNew,useNearby} from "./StreetProvider";
import {Bounce,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { useMemo } from "react";
let setupCheck:boolean = false;

type PlacesProps = {
  setSpot: (position: google.maps.LatLngLiteral) => void;
};
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

//Damit das alles so funktioniert muss quasi eine "zweite" map generiert werden
//Werde noch schauen, ob das auch einfacher geht
let placesMap: google.maps.Map;
let service: google.maps.places.PlacesService;

//temporäre arrays für den Algorithmus bzw. die Anzeige auf der Karte
const currentByFootV2: Array<google.maps.LatLngLiteral> = []

const setCookie = (name: string,value: unknown,days: number) =>{
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()};path=/`

}

const getCookie = (name:string) =>{
  const cookies = document.cookie.split("; ").find((row)=> row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
}


const currentUser = getCookie("username");


function InitMap(){

  /*
  const defaultCenter = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);

  const options = useMemo<MapOptions>(
    ()=> ({
      center:defaultCenter,
      zoom:15
    }),[defaultCenter]
  )
  

  placesMap = new google.maps.Map(document.getElementById("map") as HTMLElement,options);
    
  service = new google.maps.places.PlacesService(placesMap);

  console.log("Helper map successfully set up");
*/
}


export default function Places({ setSpot }: PlacesProps) {

  const defaultCenter = useMemo<LatLngLiteral>(() => ({lat:53.5688823,lng:10.0330191}),[]);

  const options = useMemo<MapOptions>(
    ()=> ({
      center:defaultCenter,
      zoom:15
    }),[defaultCenter]
  )

 
//Wenn die helper map noch nicht initialisiert wurde -> dies bitte tun
  if(setupCheck == false){
    setTimeout(()=>{
      placesMap = new google.maps.Map(document.getElementById("map") as HTMLElement,options);
      service = new google.maps.places.PlacesService(placesMap);
      console.log("Helper map successfully set up");
    },2000);
    //Danach die flag auf true setzen
    setupCheck= true;
  }

  //Context-Variablen
  const updateStreetName = useStreetNameNew().setStreet;
  const updateZipCode = useZipCodeNew().setZipCode;
  const updateCity = useCityNew().setCity;
  const updateNearby = useNearby().setNearby;

  //Temporäre Variablen, um die Straße richtig anzuzeigen
  let tmpStreetName:string;
  let tmpStreetNumber:string;
  let tmpCheckForStreetNumber:boolean;
  let tmpCheckForZipCode:boolean;
  let tmpZipCode:string;
  let tempPreviewAdress:string;
  tmpZipCode = "";
  tmpCheckForZipCode = false;
  tmpCheckForStreetNumber = false;
  
  let goodDuration:number;
  let okayDuration:number;
  let badDuration:number;

  goodDuration = 15;
  okayDuration = 25;
  badDuration = 35;

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

 //Funktionen
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 function callback(results:any,status:any){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    currentByFootV2.splice(0,currentByFootV2.length);
    for(let i = 0; i < results.length;i++){
      currentByFootV2.push({
        lat: results[i].geometry.location.lat(),
        lng: results[i].geometry.location.lng()
      })
      updateNearby(currentByFootV2);
  }}
}

async function performNearbySearch(requestParam: google.maps.places.PlaceSearchRequest){
  
  service.nearbySearch(requestParam,callback);
  updateNearby(currentByFootV2);
  
}

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address:val });

    const { lat, lng } = await getLatLng(results[0]);


    //Es wird nach einem zipCode gechecked
    for(let i = 0; i < results[0].address_components.length;i++){
      if(results[0].address_components[i].types[0] === "street_number" ){

        tmpCheckForStreetNumber = true;
        tmpStreetNumber = results[0].address_components[i].long_name;
      }
    }

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
      //Adresse mit Postleitzahl et cetera
      let address:string;
      address = results[0].formatted_address;
      //Es werden die einzelnen Teile der Addressen-Suche durchgegangen und dementsprechend die Werte angepasst
      for(let i = 0; i < results[0].address_components.length; i++){
        switch(results[0].address_components[i].types[0]){
        //Straßennummer
          case "street_number":
            tmpStreetNumber = results[0].address_components[i].long_name;
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

    try{
       axios.post("http://localhost:8080/saveAddress",{
        lat,lng,address,currentUser
      })
      console.log("Adding address to database");
    }catch(e){
      console.log(e);
    }
    
    //Da Straßennummer und Straßenname getrennt wurden, müssen die hier nochmal zusammengefügt werden
    tmpStreetName = tmpStreetName + " " + tmpStreetNumber;
    updateStreetName(tmpStreetName);


    /* Erstmal auskommentiert, falls wir die NearbySearch nochmal in places.tsx machen müssen
    let request = {
      location:{lat,lng},
      radius: 100
    }

    await(performNearbySearch(request)).then(
      () => {     
        console.log("Derzeitige Marker in places.tsx");
        console.log(currentByFootV2);
      }
    );
   */
   
    setSpot({ lat, lng });
  }
  };

  


  return (
  <div>
    
    <div id ="map">

    </div>

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
