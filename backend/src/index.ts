
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



app.post("/", async(req,res) => {
  
  const{user,password} = req.body;

  try{
    const check = await userModel.findOne({userName:user})

    if(check){
      res.json("exist");
    }else{
      res.json("not exist");
    }

  }
  catch(e){
    res.json("notexist");
  }

})

app.post("/signup", async(req,res) => {
  
  const{user,password} = req.body;

  const data={
    UserName:user,
    Password:req.body.password
  }

  try{
    const check = await userModel.findOne({Username:data.UserName})

    if(check != ""){
      console.log("User already exists");
    }else{
      res.json("User not signed up yet");
      
      const testUser = new userModel({Username: data.UserName, password:data.Password})

      testUser.save();

      console.log("User successfully added")
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






