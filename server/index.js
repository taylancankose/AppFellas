import express from "express";
import cors from "cors";
import "./src/db/index.js";
import "dotenv/config";
import flightRouter from "./src/routers/flight.js";
import authRouter from "./src/routers/auth.js";
import reservationRoute from "./src/routers/reservation.js";
import airlineRoute from "./src/routers/airline.js";

// initializes express app
const app = express();

// parse json requests that will come
app.use(express.json());

// parse url-encoded form data
app.use(express.urlencoded({ extended: false }));

// enable cors
app.use(cors());

app.use("/api/flights", flightRouter);
app.use("/api/auth", authRouter);
app.use("/api/reservation", reservationRoute);
app.use("/api/airlines", airlineRoute);

const PORT = process.env.PORT;

// Start api server
app.listen(PORT, () => {
  console.log(`PORT is listening on ${PORT}`);
});
