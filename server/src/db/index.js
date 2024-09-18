import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Connecting mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => {
    console.log("Error connecting to Mongoose database: " + err);
  });
