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
  },
  {
    timestamps: true,
  }
);

// Add a TTL of 24 hours for the documents. Remove documents after 1 day to prevent memory leaks and get used to unneccessary data
flightSchema.index({ scheduleDateTime: 1 }, { expireAfterSeconds: 86400 });

// Model create
export default model("Flight", flightSchema);
