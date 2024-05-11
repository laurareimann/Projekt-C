/* eslint-disable @typescript-eslint/no-unused-vars */
//Dieser Code wird wie in places.tsx erwähnt bestimmt bald gelöscht werden, aber vorerst behalte
//ich ihn, weil er eventuell für die Places-API noch wichtig wird




import React from "react";
import { useState } from "react";

let currentAdressPostalCodeTMP:string;
let currentAddressStreetTMP:string;
let currentStreetNumberTMP:string;
let currentCityTMP:string;
let currentStateTMP:string;
let forceRenderHelper:number;


forceRenderHelper = 0;


 export const getFormattedAdressStrings = (addressComponent:string,value:string) => {

    switch(addressComponent){
      case "street_number":
        currentStreetNumberTMP = value;
        console.log(currentStreetNumberTMP);
        break;
    
      case "postal_code":
        currentAdressPostalCodeTMP = value;  
        console.log(currentAdressPostalCodeTMP);
        break;
    
      case "city":
        currentCityTMP = value;
        console.log(currentCityTMP);
        break;
    
      case "street":
        currentAddressStreetTMP = value;
        console.log(currentAddressStreetTMP);
        break;
    
      case "state":
        currentStateTMP = value;
        console.log(currentStateTMP);
        break;
    
      case "fix street appearance":
        currentAddressStreetTMP += (" " + currentStreetNumberTMP);
    }
    
    forceRenderHelper++;
    console.log("Current force Variable: " + forceRenderHelper);
    
    }


    export {forceRenderHelper,currentAddressStreetTMP,currentAdressPostalCodeTMP,currentStreetNumberTMP,currentStateTMP,currentCityTMP}