import mongoose, { model } from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    lastUpdatedAt: Date,
    actualLandingTime: Date,
    aircraftType: {
      iataMain: String,
      iataSub: String,
    },
    baggageClaim: {
      belts: [String],
    },
    codeshares: {
      codeshares: [String],
    },
    estimatedLandingTime: Date,
    expectedTimeOnBelt: Date,
    flightDirection: { type: String, enum: ["A", "D"] },
    flightName: String,
    flightNumber: Number,
    isOperationalFlight: Boolean,
    mainFlight: String,
    prefixIATA: String,
    prefixICAO: String,
    airlineCode: Number,
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
    serviceType: String,
    terminal: Number,
    schemaVersion: String,
    flightID: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

// Add a TTL of 24 hours for the documents. Remove documents after 1 day to prevent memory leaks and get used to unneccessary data
flightSchema.index({ scheduleDateTime: 1 }, { expireAfterSeconds: 86400 });

// Model create
export default model("Flight", flightSchema);
