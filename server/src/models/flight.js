import mongoose, { model } from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    lastUpdatedAt: Date,
    actualLandingTime: Date,
    estimatedLandingTime: Date,
    flightDirection: { type: String, enum: ["A", "D"] },
    mainFlight: String,
    prefixIATA: String,
    prefixICAO: String,
    publicFlightState: {
      flightStates: [String],
    },
    route: {
      destinations: [String],
      eu: String,
      visa: Boolean,
    },
    scheduleDateTime: Date,
    scheduleDate: String,
    scheduleTime: String,
    terminal: Number,
    flightID: { type: String, unique: true },
    airline: {
      iata: { type: String },
      icao: { type: String },
      nvls: { type: Number },
      publicName: { type: String },
    },
    destination: {
      city: { type: String },
      country: { type: String },
      iata: { type: String },
      publicName: {
        dutch: { type: String },
        english: { type: String },
      },
    },
    isReserved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Remove documents after 1 day to prevent memory leaks and get used to unneccessary data if it is not reserved
flightSchema.index(
  { scheduleDateTime: 1 },
  { expireAfterSeconds: 86400, partialFilterExpression: { isReserved: false } }
);

// Model create
export default model("Flight", flightSchema);
