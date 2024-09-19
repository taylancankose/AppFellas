import mongoose from "mongoose";
import Flight from "../models/flight.js";
import Reservation from "../models/reservation.js";
import User from "../models/user.js";

export const createReservation = async (req, res) => {
  const { flightID, price } = req.body;
  const userId = req.user.id;

  try {
    const flight = await Flight.findById({ _id: flightID });
    if (!flight) return res.status(403).json({ error: "Flight not found" });

    // user can make only one reservation
    const checkReservation = await Reservation.findOne({
      flight: flightID,
      owner: userId,
    });
    if (checkReservation)
      return res.status(400).json({
        message: "You have already reserved a ticket for this flight",
      });

    const flightDateTime = new Date(flight.scheduleDateTime);
    const currentDateTime = new Date();

    // flight must be in the future
    if (flightDateTime < currentDateTime) {
      return res
        .status(400)
        .json({ message: "Cannot reserve a ticket for a past flight" });
    }

    // create a new reservation
    const reservation = new Reservation({
      flight: flightID,
      owner: userId,
      price: price,
    });

    // save it
    await reservation.save();

    // Add reservation id to User document
    const user = await User.findById(userId);
    user.reservations.push(reservation._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while making the reservation" });
  }
};

export const getReservations = async (req, res) => {
  const userId = req.user.id;

  try {
    // find user and fill the reservations path
    const user = await User.findById(userId).populate({
      path: "reservations",
      populate: { path: "flight" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ reservations: user.reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
