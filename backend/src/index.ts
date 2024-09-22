
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {} from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import * as mongoose from 'mongoose';
import fs from "fs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AddressModel = require("./db/usedAdresses");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const userModel = require("./db/user");

//Configures environment variables -> mongoDB credentials
dotenv.config();

const filePathToJsonDetailed = __dirname.split("-C")[0] + "-C" +"/frontend/ValuesForDetailedResult.json"
const filePathToJsonProfileLoad = __dirname.split("-C")[0] + "-C" +"/frontend/loadingFromProfileValues.json"


//Setup mongoDB | commented for now since we don't need it immediately
const mongoDB_URI = (process.env.MONGODB_URI);
//console.log("Current URL: " + mongoDB_URI);

mongoose.connect(mongoDB_URI).then(() => {
  console.log("Successfully connected to your databases");
})
.catch(() => {
  console.log("Connection failed");
})


//Setup express
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post("/saveSearchForLater",async(req,res)=>{

  const data = {
    savedName:req.body.nameToSave,
    whoSavedData:req.body.currentUser,
    SpotLat:req.body.currentSpotLat,
    SpotLng:req.body.currentSpotLng,
  }

  const decisionString = "Deciding";

  const decidedString = "WasSaved";

    try{

    const updateDecision = {
      shouldBeSaved: decidedString,
      savedName:data.savedName
    }

    const update = await AddressModel.findOneAndUpdate({
      "shouldBeSaved":decisionString,whoSaved:data.whoSavedData},updateDecision)

    //adressToSave.save();
    res.json("save successful");
    }
    catch(e){
      console.log(e)
    }
})

app.get("/GetSaved",async (req,res)=>{

  const data = {
    SentCurrentUser:req.query.currentUserParam,
  }

  const TempCurrentUser = data.SentCurrentUser;

  console.log(TempCurrentUser + " is trying to fetch their saved addresses");

  try{
    if(TempCurrentUser != ""){

      const SavedData = await AddressModel.find({"whoSaved":TempCurrentUser,shouldBeSaved:"WasSaved"})
      const responseArray = JSON.stringify(SavedData,null,2);
      res.json(responseArray)
    }
    else{
      console.log("Nobody's logged in");
    }
  
}catch(e){
    console.log(e)
  }
})

app.get("/getHistory",async (req,res)=>{

  const data = {
    SentCurrentUser:req.query.currentUserParam,
  }

  const TempCurrentUser = data.SentCurrentUser;

  console.log(TempCurrentUser + " is trying to fetch their search history");

  try{
    if(TempCurrentUser != ""){

      const historyData = await AddressModel.find({"whoSaved":TempCurrentUser})
      const responseArray = JSON.stringify(historyData,null,2);
      res.json(responseArray)
    }
    else{
      console.log("Nobody's logged in");
    }
  
}catch(e){
    console.log(e)
  }
})

app.get("/checkForLoadFromProfile",async(req,res)=>{

  try{

    const alternativeData =JSON.parse(fs.readFileSync(filePathToJsonProfileLoad,"utf-8"));
  

    const data = {
      AddressLatToSend:alternativeData.currentAddressLat,
      AddressLngToSend:alternativeData.currentAddressLng,
      ShouldLoadBool:alternativeData.currentFlag,
      AddressToSend:alternativeData.currentAddress,
      CityToSend:alternativeData.currentAddressCity,
      ZipToSend:alternativeData.currentAddressZip
    }

    const constCheckData = JSON.stringify(data,null,2)

    res.json(constCheckData);
  }catch(e){
    console.log(e)
  }

})

app.post("/updateJson",async(req,res)=>{

  const data = {
    GroceryLat:req.body.GroceryLat,
    GroceryLng:req.body.GroceryLng,
    TravelMode:req.body.tempCurrentTravelMode,
    currentScore:req.body.tempCurrentScore,
    HealthLat:req.body.HealthLat,
    HealthLng:req.body.HealthLng,
    TransitLat:req.body.TransitLat,
    TransitLng:req.body.TransitLng,
    SpotLat:req.body.SpotLat,
    SpotLng:req.body.SpotLng,
    currentGroceryDuration:req.body.currentGroceryDuration,
    currentHealthDuration:req.body.currentHealthDuration,
    currentTransitDuration:req.body.currentTransitDuration,
    currentStartingAddressName:req.body.currentStartPointAddress,
    currentClosestGroceryAddress:req.body.currentClosestGroceryAddress,
    currentClosestHealthAddress:req.body.currentClosestHealthAddress,
    currentClosestTransitAddress:req.body.currentClosestTransitAddress,
    currentClosestGroceryName:req.body.currentClosestGroceryName,
    currentClosestHealthName:req.body.currentClosestHealthName,
    currentClosestTransitName:req.body.currentClosestTransitName
  }

  const resetCheckArray = JSON.parse(fs.readFileSync(filePathToJsonProfileLoad,"utf-8"))

  const resetData = {
    currentAddressLat:resetCheckArray.currentAddressLat,
    currentAddressLng:resetCheckArray.currentAddressLng,
    ShouldLoadBool:false,
    currentAddress:resetCheckArray.currentAddress,
    currentAddressCity:resetCheckArray.currentAddressCity,
    currentAddressZip:resetCheckArray.currentAddressZip
  }

  console.log("updating Json file...")

  try{

    const updatedJson = {
      currentScoreValue:data.currentScore,
      currentStartingSpot:[data.SpotLat,data.SpotLng],
      currentClosestGrocery:[data.GroceryLat,data.GroceryLng],
      currentClosestHealth:[data.HealthLat,data.HealthLng],
      currentClosestTransit:[data.TransitLat,data.TransitLng],
      currentTravelMode:data.TravelMode,
      currentGroceryDuration:data.currentGroceryDuration,
      currentHealthDuration:data.currentHealthDuration,
      currentTransitDuration:data.currentTransitDuration,
      currentStartAddress:data.currentStartingAddressName,
      currentClosestGroceryAddress:data.currentClosestGroceryAddress,
      currentClosestHealthAddress:data.currentClosestHealthAddress,
      currentClosestTransitAddress:data.currentClosestTransitAddress,
      currentClosestGroceryName:data.currentClosestGroceryName,
      currentClosestHealthName:data.currentClosestHealthName,
      currentClosestTransitName:data.currentClosestTransitName
    }

    const updatedJsonData = JSON.stringify(updatedJson,null,2);
   
    fs.writeFileSync(filePathToJsonDetailed,updatedJsonData)
      console.log("Data written to file");
      console.log("Resetting profile check");
    fs.writeFileSync(filePathToJsonProfileLoad,JSON.stringify(resetData,null,2))
      res.json("update successful")

    

      }
  catch(e){
    console.log(e)
  }
})

app.post("/saveAddress", async(req,res) => {
  
  const data ={
    MapLat:req.body.lat,
    MapLng:req.body.lng,
    Address:req.body.address,
    currentUser:req.body.currentUser,
    AddressZip:req.body.tmpZipCode,
    AddressCity:req.body.tmpCityName,
    savedName:req.body.tmpName
  }

  const initialDecisionString:string = "Deciding";
  const dontSaveString:string = "WontBeSaved";

try{
  console.log(data);

  //Before new address is added, check if another search was issued beforehand and set that one to not be saved

  const denySave = {
    shouldBeSaved:dontSaveString
  }

  const tempSaveName:string = "";

  const setPossiblePriorResult = await AddressModel.findOneAndUpdate({
    "shouldBeSaved":initialDecisionString,whoSaved:data.currentUser},denySave)


  res.json("Address is being added");

  const testAdress = new AddressModel({
    addressFull:data.Address,
    googleMapsLat:data.MapLat,
    googleMapsLng:data.MapLng,
    whoSaved:data.currentUser,
    addressCity:data.AddressCity,
    addressZip:data.AddressZip,
    shouldBeSaved:initialDecisionString,
    savedName:data.savedName
    })

  testAdress.save();

  console.log("Address successfully added");

  
}
catch(e){
  console.log(e);
}
})

app.post("/prepareLoadFromProfile",async(req,res)=>{

  const setFlag = req.body.shouldLoadBool;
  const address = req.body.addressToLoad;
  const addressLat = req.body.addressLat;
  const addressLng = req.body.addressLng;
  const addressZip = req.body.addressZip;
  const addressCity = req.body.addressCity;

  console.log("Updating preparation json");

  try{
    const updatedJson = 
    {
      currentFlag:setFlag,
      currentAddress:address,
      currentAddressLat:addressLat,
      currentAddressLng:addressLng,
      currentAddressCity:addressCity,
      currentAddressZip:addressZip,
    }

  const updatedJsonData = JSON.stringify(updatedJson,null,2);

  fs.writeFileSync(filePathToJsonProfileLoad,updatedJsonData);
  console.log("Data written to file");
  res.json("update successful");
  }catch(e){
  console.log(e);
}

})



app.post("/signup", async(req,res) => {
  
  const{user,password,passwordConfirm} = req.body;

  console.log(req.body);

  console.log("test");

  const data={
    UserName:req.body.user,
    Password:req.body.password,
    PasswordConfirm:req.body.passwordConfirm
  }

  try{
    const check = await userModel.findOne({Username:data.UserName})

    if(check != null){
      console.log("User already exists");
      res.json("exists")
    }else{
      
      if(password === passwordConfirm){
        const newUser = new userModel({Username: data.UserName, password:data.Password})
        newUser.save();
        console.log("User successfully added")
        res.json("SignUpSuccess")
        
      }
      if(password!=passwordConfirm){
        res.json("Passwords not matching");
        console.log("Passwords not matching");
      }
    }
  }
  catch(e){
    console.log("Error message: " + e);
  }

})

app.post("/login",async(req,res)=>{

  const userParam = req.body.user;
  const passwordParam = req.body.password;

  console.log(req.body);

  try{
    const checkForUser = await userModel.findOne({Username:userParam});
    if(checkForUser != null){
      if(checkForUser.password != passwordParam || checkForUser.Username != userParam){
        console.log("Wrong credentials");
        res.json("Wrong credentials!")
      }else{
        console.log("Login successful")
        res.json("exist");
        
      }
    }if(checkForUser == null){
      console.log("User not yet registered");
      res.json("notexist");
    }
    
  }
  catch(e){
    console.log("Error message " + e);
  }
})


//start server
const PORT: number = parseInt((process.env.PORT || 8080) as string, 10);
app.listen(PORT,() => {
    console.log("Server started at http://localhost:" + PORT);
    

  })




/*
In case we need to clean up the databases
userModel.deleteMany({}).then(
      console.log("Database deleted")
    );
    AddressModel.deleteMany({}).then(
      console.log("Database deleted")
    );

*/