import express from "express";
import { getFlights } from "../controllers/flight.js";

const router = express.Router();

router.get("/getAll", getFlights);

export default router;
