import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
    },
    password:{
        type:String,
    }
})

const userModel = mongoose.model("userdatabases",UserSchema)

module.exports = userModel;