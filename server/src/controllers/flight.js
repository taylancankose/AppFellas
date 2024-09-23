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

  let limit = 10; // MongoDB için kullanılacak limit

  try {
    // MongoDB'den verileri al
    let query = {
      scheduleDateTime: { $gte: fromDateTime, $lte: toDateTime },
    };

    // MongoDB sorgusuna filtreler ekle
    if (airline) {
      query["airline.icao"] = airline;
    }
    if (route) {
      query["route.destinations"] = route;
    }
    if (direction) {
      query.flightDirection = direction;
    }

    // Sayfalama için skip ve limit değerlerini ayarla
    const validPage = Math.max(page, 1);
    const skip = (validPage - 1) * limit;

    // MongoDB'den uçuşları getir
    let lastFlights = await Flight.find(query).skip(skip).limit(limit);

    if (lastFlights.length > 0) {
      return res.json({ lastFlights, page: validPage, limit });
    }

    // Eğer MongoDB'de veri yoksa, API'den veri çek
    const apiResponse = await axios.get(`${process.env.API_URL}/flights`, {
      params: {
        airline,
        route,
        flightDirection: direction,
        includedelays: false,
        page: validPage,
        // size parametresi artık eklenmiyor!
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

    if (!flights || flights.length === 0) {
      return res
        .status(200)
        .json({ message: "There is no flight at this preferences" });
    }

    // Uçuşları veritabanına kaydet
    let savedFlights = [];
    for (let flight of flights) {
      const existingFlight = await Flight.findOne({ flightID: flight.id });
      if (!existingFlight) {
        const destinationCode =
          flight.route.destinations[flight.route.destinations.length - 1];
        const airlineICAO = flight.prefixICAO;

        // Destination ve Airline verilerini al
        let destinationData = await getDestinationData(destinationCode);
        let airlineData = await Airline.findOne({ icao: airlineICAO });

        if (!airlineData) {
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

        await createdFlight.save();
        savedFlights.push(createdFlight);
      }
    }

    // Sonuçları döndür
    res.json({ lastFlights: savedFlights, page: validPage, limit });
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
