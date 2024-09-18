// controllers/flightController.js
import axios from "axios";
import Flight from "../models/flight.js"; // Flight modelimizi içe aktarıyoruz

// API'den uçuşları almak ve veritabanına kaydetmek için kullanılacak sayfa numarasını tutalım.

// Schiphol API'den manuel tetikleme ile bir sayfa uçuşu al ve MongoDB'ye kaydet
export const getFlights = async (req, res) => {
  const { page, fromDateTime, toDateTime } = req.query;
  try {
    const response = await axios.get(
      `https://api.schiphol.nl/public-flights/flights`,
      {
        params: {
          includedelays: false,
          page: page || 0,
          sort: "+scheduleTime",
          fromDateTime,
          toDateTime,
        },
        headers: {
          app_id: process.env.APPLICATION_ID,
          app_key: process.env.API_KEY,
          ResourceVersion: "v4",
        },
      }
    );
    const flights = await response.data.flights;

    if (!flights || flights.length === 0) {
      return res.status(200).json({ message: "Flight could not be found" });
    }

    for (let flight of flights) {
      const checkExists = await Flight.findOne({ flightID: flight?.id });
      if (!checkExists) {
        const createdFlight = new Flight({
          lastUpdatedAt: flight.lastUpdatedAt,
          actualLandingTime: flight.actualLandingTime,
          aircraftType: flight.aircraftType,
          baggageClaim: flight.baggageClaim,
          codeshares: flight.codeshares,
          estimatedLandingTime: flight.estimatedLandingTime,
          expectedTimeOnBelt: flight.expectedTimeOnBelt,
          flightDirection: flight.flightDirection,
          flightName: flight.flightName,
          flightNumber: flight.flightNumber,
          flightID: flight.id,
          isOperationalFlight: flight.isOperationalFlight,
          mainFlight: flight.mainFlight,
          prefixIATA: flight.prefixIATA,
          prefixICAO: flight.prefixICAO,
          airlineCode: flight.airlineCode,
          publicFlightState: flight.publicFlightState,
          route: flight.route,
          scheduleDateTime: flight.scheduleDateTime,
          scheduleDate: flight.scheduleDate,
          scheduleTime: flight.scheduleTime,
          serviceType: flight.serviceType,
          terminal: flight.terminal,
          schemaVersion: flight.schemaVersion,
        });

        await createdFlight.save();
      }
    }

    res.json({ message: "Flight data fetched and saved" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured while fetching flights", error });
  }
};
