const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    state: { type: String },
    notName: { type: String },
    selectedCargoVehicle: { type: String },
    selectedVehicleType: { type: String },
    selectedSeaterVehicle: { type: String },
    district: { type: String },
    town_taluka: { type: String },
    vechileType: {
      type: String,
      // enum: ["seater", "cargoVehicle"],
    },
    notInList: {
      type: String,
    },
    fuel: {
      type: String,
      // enum: ["petrol", "diesel"],
    },
    fare: { type: String },
    vechileSeater: {
      type: String,
      // enum: [
      //   "swift",
      //   "ertiga",
      //   "toyataInnova",
      //   "bolero",
      //   "traxCruiser",
      //   "forceTempoTraveller",
      // ],
    },
    acStatus: { type: String }, // enum:["ac","nonAc"],
    // photos: [
    //   {
    //     url: { type: String,},
    //   },
    // ],
    selectedImages: [String],
    des: { type: String },
  },
  {
    timestamps: true,
  }
);

const userData = mongoose.model("userData", userSchema);

module.exports = userData;
