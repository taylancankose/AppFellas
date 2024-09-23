import mongoose, { model } from "mongoose";

const airlineSchema = new mongoose.Schema({
  icao: String,
  nvls: Number,
  publicName: String,
});

// Model create
export default model("Airline", airlineSchema);
