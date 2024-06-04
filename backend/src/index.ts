
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {Request, Response} from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import * as mongoose from 'mongoose';
import path from "path"
import test from 'node:test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AddressModel = require("./db/usedAdresses");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const userModel = require("./db/user");

//Configures environment variables -> mongoDB credentials
dotenv.config();


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



app.post("/saveAddress", async(req,res) => {
  
  const data ={
    MapLat:req.body.lat,
    MapLng:req.body.lng,
    Address:req.body.address,
  }

try{
  console.log(data);

  res.json("Address is being added");

  const testAdress = new AddressModel({address:data.Address,googleMapsLat:data.MapLat,googleMapsLng:data.MapLng,whoSaved:"TestUser"})

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
        const testUser = new userModel({Username: data.UserName, password:data.Password})
        testUser.save();
        console.log("User successfully added")
      }
      else{
        res.json("Passwords not matching");
        console.log("Passwords not matching");
      }
    }

  }
  catch(e){
    console.log("Error message: " + e);
  }

})




//start server
const PORT: number = parseInt((process.env.PORT || 8080) as string, 10);
app.listen(PORT,() => {
    console.log("Server started at http://localhost:" + PORT);
    

  })






