import { Router } from "express";
import { authCheck } from "../middlewares/auth.js";
import {
  createReservation,
  getReservations,
} from "../controllers/reservation.js";

const router = Router();

router.get("/my-reservations", authCheck, getReservations);
router.post("/reserve", authCheck, createReservation);

export default router;
