import * as mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    address: String,
    googleMapsLatLngLiteral: String,
    savedName: String,
    whoSaved: String
})

const AddressModel = mongoose.model("formeradresses",AddressSchema)

module.exports = AddressModel;