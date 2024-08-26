
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {Request, Response} from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import * as mongoose from 'mongoose';
import path from "path"
import test from 'node:test';
import fs from "fs";
import detailedResultValues from "../../frontend/ValuesForDetailedResult.json";
import { pathToFileURL } from 'url';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AddressModel = require("./db/usedAdresses");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const userModel = require("./db/user");

console.log(detailedResultValues);

//Configures environment variables -> mongoDB credentials
dotenv.config();

const filePathToJson = __dirname.split("C")[0] + "C" +"/frontend/ValuesForDetailedResult.json"

console.log(filePathToJson)

//Setup mongoDB | commented for now since we don't need it immediately
const mongoDB_URI = (process.env.MONGODB_URI);
console.log("Current URL: " + mongoDB_URI);

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
  }

  console.log("updating Json file...")

  try{
    console.log(data);

    const updatedJson = {
      currentScoreValue:data.currentScore,
      currentClosestGrocery:[data.GroceryLat,data.GroceryLng],
      currentClosestHealth:[data.HealthLat,data.HealthLng],
      currentClosestTransit:[data.TransitLat,data.TransitLng],
      currentTravelMode:data.TravelMode
    }

    const updatedJsonData = JSON.stringify(updatedJson,null,2);
   

    fs.writeFileSync(filePathToJson,updatedJsonData)
      console.log("Data written to file");
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
    currentUser:req.body.currentUser
  }

try{
  console.log(data);

  res.json("Address is being added");

  const testAdress = new AddressModel({address:data.Address,googleMapsLat:data.MapLat,googleMapsLng:data.MapLng,whoSaved:data.currentUser})

  testAdress.save();

  console.log("Address successfully added");
}
catch(e){
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