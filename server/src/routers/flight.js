import express from "express";
import { getFlights, getFlightsByDirection } from "../controllers/flight.js";

const router = express.Router();

router.get("/getAll", getFlights);
router.get("/get-by-direction", getFlightsByDirection);

export default router;
