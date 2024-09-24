import axios from "axios";
import Flight from "../models/flight.js";
import Airline from "../models/airline.js";

export const getFlights = async (req, res) => {
  const {
    airline,
    route,
    direction,
    page = 0,
    fromDateTime,
    toDateTime,
  } = req.query;

  if (!fromDateTime || !toDateTime) {
    return res.status(400).json({
      message: "fromDateTime and toDateTime are both required",
    });
  }

  try {
    // Get data from mongodb
    let query = {
      scheduleDateTime: { $gte: fromDateTime, $lte: toDateTime },
    };

    // Add filters
    if (airline) {
      query["airline.icao"] = airline;
    }
    if (route) {
      query["route.destinations"] = route;
    }
    if (direction) {
      query.flightDirection = direction;
    }

    const apiResponse = await axios.get(`${process.env.API_URL}/flights`, {
      params: {
        airline,
        route,
        flightDirection: direction,
        includedelays: false,
        page: page,
        sort: "+scheduleTime",
        fromDateTime,
        toDateTime,
      },
      headers: {
        app_id: process.env.APPLICATION_ID,
        app_key: process.env.API_KEY,
        ResourceVersion: "v4",
      },
    });

    const flights = apiResponse.data.flights;

    // If there is no flight response, return message
    if (!flights || flights.length === 0) {
      return res
        .status(200)
        .json({ message: "There is no flight at this preferences" });
    }

    // Save flights to db
    let savedFlights = [];
    for (let flight of flights) {
      const existingFlight = await Flight.findOne({ flightID: flight?.id });

      // if flight does not exists in db
      if (!existingFlight?.flightID) {
        const destinationCode =
          flight.route.destinations[flight.route.destinations.length - 1];
        const airlineICAO = flight.prefixICAO;
        // Get Destination and Airline data from API and db respectively
        let destinationData = await getDestinationData(destinationCode);
        let airlineData = await Airline.findOne({ icao: airlineICAO });

        if (!airlineData) {
          airlineData = "Unknown airline";
        }
        // create a new flight for flight
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

        // save the flight to db
        await createdFlight.save();
        // add array to createdFlight for return response
        savedFlights.push(createdFlight);
      } else {
        // add array to existingFlight for return response
        savedFlights.push(existingFlight);
      }
    }

    // Return results
    res.json({ lastFlights: savedFlights, page: page });
  } catch (error) {
    console.error(
      "An unexpected error occurred while saving the flights:",
      error.message
    );

    if (error.response) {
      console.error("Error response data:", error.response.data);
      return res.status(500).json({
        message: "An unexpected error occurred while saving the flights",
        error: error.response.data,
      });
    } else {
      return res.status(500).json({
        message: "An unexpected error occurred while saving the flights",
        error: error.message,
      });
    }
  }
};

// Yardımcı fonksiyon - Destination verisini almak için
const getDestinationData = async (destinationCode) => {
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
    return destinationResponse.data;
  } catch (error) {
    console.warn(`Destination API request failed: ${destinationCode}`, error);
    return null;
  }
};
