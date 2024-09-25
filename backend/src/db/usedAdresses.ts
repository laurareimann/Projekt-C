import * as mongoose from "mongoose";

/*The shouldBeSaved attribute determines, whether the latest search will be saved or not
/It has three different states 1) Deciding 2) WasSaved 3) WontBeSaved
Deciding: when the address search was issued and added to the search history, the user can press
the "save address" button to save it for later. Once a new search is done, this attribute should be changed to
"WontBeSaved" in order to not show up when the saved results get listed

The two other states should be self-explanatory
*/

const AddressSchema = new mongoose.Schema({
    addressFull: String,
    addressZip:String,
    addressCity:String,
    addressStreet:String,
    googleMapsLat: Number,
    googleMapsLng: Number,
    savedName: String,
    whoSaved: String,
    shouldBeSaved:String,
})

const AddressModel = mongoose.model("formeradresses",AddressSchema)

module.exports = AddressModel;