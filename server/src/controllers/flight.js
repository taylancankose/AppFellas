// controllers/flightController.js
import axios from "axios";
import Flight from "../models/flight.js";

export const getFlights = async (req, res) => {
  const { page, fromDateTime, toDateTime } = req.query;
  let lastFlights = [];
  try {
    // Find flights data according to date range
    const existingFlights = await Flight.find({
      scheduleDateTime: { $gte: fromDateTime, $lte: toDateTime },
    });

    const existingFlightIDs = existingFlights.map((flight) => flight.flightID);

    // Get data from api
    const response = await axios.get(
      `${process.env.API_URL}/flights?includedelays=false&page=${page}&sort=%2BscheduleTime&fromDateTime=${fromDateTime}&toDateTime=${toDateTime}`,
      {
        headers: {
          app_id: process.env.APPLICATION_ID,
          app_key: process.env.API_KEY,
          ResourceVersion: "v4",
        },
      }
    );

    const flights = response.data.flights;

    if (!flights || flights.length === 0) {
      return res.status(200).json({ message: "Flight could not be found" });
    }

    // Save data that are not found in db
    for (let flight of flights) {
      if (!existingFlightIDs.includes(flight.id)) {
        const destinationCode =
          flight.route.destinations[flight.route.destinations.length - 1];
        const airlineICAO = flight.prefixICAO;

        let destinationData = null;
        let airlineData = null;

        // Destination API
        try {
          const destinationResponse = await axios.get(
            `${process.env.API_URL}/destinations/${destinationCode}`,
            {
              headers: {
                app_id: process.env.APPLICATION_ID,
                app_key: process.env.API_KEY,
                ResourceVersion: "v4",
              },
            }
          );
          destinationData = destinationResponse.data;
        } catch (error) {
          console.warn(
            `Destination API request could not succeed: ${destinationCode}`
          );
          destinationData = null;
        }

        // Airline API
        try {
          const airlineResponse = await axios.get(
            `${process.env.API_URL}/airlines/${airlineICAO}`,
            {
              headers: {
                app_id: process.env.APPLICATION_ID,
                app_key: process.env.API_KEY,
                ResourceVersion: "v4",
              },
            }
          );
          airlineData = airlineResponse.data;
        } catch (error) {
          console.warn(`Airline request could not succeed: ${airlineICAO}`);
          airlineData = "Unknown airline";
        }

        // Save ne flight to db
        const createdFlight = new Flight({
          lastUpdatedAt: flight.lastUpdatedAt,
          actualLandingTime: flight.actualLandingTime,
          estimatedLandingTime: flight.estimatedLandingTime,
          flightDirection: flight.flightDirection,
          mainFlight: flight.mainFlight,
          prefixIATA: flight.prefixIATA,
          prefixICAO: flight.prefixICAO,
          publicFlightState: flight.publicFlightState,
          route: flight.route,
          scheduleDateTime: flight.scheduleDateTime,
          scheduleDate: flight.scheduleDate,
          scheduleTime: flight.scheduleTime,
          terminal: flight.terminal,
          flightID: flight.id,
          airline: airlineData,
          destination: destinationData,
        });

        await createdFlight.save();
        lastFlights.push(createdFlight); // add recently added flights to array
      } else {
        const existingFlight = await Flight.findOne({ flightID: flight.id });
        lastFlights.push(existingFlight);
      }
    }

    // Response
    res.json({ lastFlights });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while fetching flights",
      error,
    });
  }
};

export const getFlightsByDirection = async (req, res) => {
  const { direction, page = 0, fromDateTime, toDateTime } = req.query;
  let lastFlights = [];
  try {
    // Make request with direction
    const response = await axios.get(`${process.env.API_URL}/flights`, {
      params: {
        includedelays: false,
        page: page || 0,
        sort: "+scheduleTime",
        fromDateTime,
        toDateTime,
        flightDirection: direction, // Direction
      },
      headers: {
        app_id: process.env.APPLICATION_ID,
        app_key: process.env.API_KEY,
        ResourceVersion: "v4",
      },
    });

    const flights = response.data.flights;

    // if there is no flight
    if (!flights || flights.length === 0) {
      return res
        .status(200)
        .json({ message: "No flights found for the given direction." });
    }

    for (let flight of flights) {
      const checkExists = await Flight.findOne({ flightID: flight.id });
      if (checkExists) lastFlights.push(checkExists);
      if (!checkExists) {
        const destinationCode =
          flight.route.destinations[flight.route.destinations.length - 1];
        const airlineICAO = flight.prefixICAO;

        let destinationData = null;
        let airlineData = null;

        try {
          // Get Destination Data
          const destinationResponse = await axios.get(
            `${process.env.API_URL}/destinations/${destinationCode}`,
            {
              headers: {
                app_id: process.env.APPLICATION_ID,
                app_key: process.env.API_KEY,
                ResourceVersion: "v4",
              },
            }
          );
          destinationData = destinationResponse.data;
        } catch (error) {
          console.warn(
            `Destination API request could not succeed: ${destinationCode}`
          );
          destinationData = null;
        }
        try {
          // Get Airline Data
          const airlineResponse = await axios.get(
            `${process.env.API_URL}/airlines/${airlineICAO}`,
            {
              headers: {
                app_id: process.env.APPLICATION_ID,
                app_key: process.env.API_KEY,
                ResourceVersion: "v4",
              },
            }
          );
          airlineData = airlineResponse.data;
        } catch (error) {
          console.warn(`Airline request could not succeed: ${airlineICAO}`);
          airlineData = "Unknown airline";
        }

        const createdFlight = new Flight({
          lastUpdatedAt: flight.lastUpdatedAt,
          actualLandingTime: flight.actualLandingTime,
          estimatedLandingTime: flight.estimatedLandingTime,
          flightDirection: flight.flightDirection,
          mainFlight: flight.mainFlight,
          prefixIATA: flight.prefixIATA,
          prefixICAO: flight.prefixICAO,
          publicFlightState: flight.publicFlightState,
          route: flight.route,
          scheduleDateTime: flight.scheduleDateTime,
          scheduleDate: flight.scheduleDate,
          scheduleTime: flight.scheduleTime,
          terminal: flight.terminal,
          flightID: flight.id,
          airline: airlineData,
          destination: destinationData,
        });

        lastFlights.push(createdFlight);
        await createdFlight.save();
      }
    }

    // Response
    res.json({ lastFlights });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while fetching flights by direction",
      error,
    });
  }
};
