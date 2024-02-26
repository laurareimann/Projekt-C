/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {Request, Response} from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';
import path from "path"

//Configures environment variables -> mongoDB credentials
//dotenv.config();


//Setup express
const app = express();

app.use(
    cors({
        credentials:true,
        origin:["http://localhost:8080"],
    })
)

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors);

//Setup cors
app.use(cors());

/*Setup mongoDB | commented for now since we don't need it immediately
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/Project-C-Cluster'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })
*/

//start server
const PORT: number = parseInt((process.env.PORT || 8080) as string, 10);
app.listen(PORT,() => {
    console.log('Server started at http://localhost: ${PORT}');
})






