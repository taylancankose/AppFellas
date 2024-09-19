// controllers/flightController.js
import axios from "axios";
import Flight from "../models/flight.js";

export const getFlights = async (req, res) => {
  const { page, fromDateTime, toDateTime } = req.query;
  let lastFlights = [];

  try {
    // Öncelikle veritabanından bu sayfadaki uçuşları getir
    const savedFlights = await Flight.find()
      .skip(page * 20)
      .limit(20);

    // Eğer veritabanında kayıtlı uçuş varsa, API'ye istek atmadan onları döndür
    if (savedFlights.length > 0) {
      return res.json(savedFlights);
    }

    const response = await axios.get(`${process.env.API_URL}/flights`, {
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
    });

    const flights = response.data.flights;

    if (!flights || flights.length === 0) {
      return res.status(200).json({ message: "Flight could not be found" });
    }

    // Get new flights from API and save them in database
    for (let flight of flights) {
      const checkExists = await Flight.findOne({ flightID: flight.id });

      if (!checkExists) {
        const destinationCode =
          flight.route.destinations[flight.route.destinations.length - 1];
        const airlineICAO = flight.prefixICAO;

        let destinationData = null;
        let airlineData = null;

        try {
          // Destination API isteği
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
          // Airline API isteği
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
          airlineData = null;
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

    // Son olarak kaydedilen uçuşları yeniden alıp geri döndür
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
  let newFlights = [];
  try {
    // API'ye uçuş yönüne göre istek at
    const response = await axios.get(`${process.env.API_URL}/flights`, {
      params: {
        includedelays: false,
        page: page || 0,
        sort: "+scheduleTime",
        fromDateTime,
        toDateTime,
        flightDirection: direction, // Uçuş yönü filtresi
      },
      headers: {
        app_id: process.env.APPLICATION_ID,
        app_key: process.env.API_KEY,
        ResourceVersion: "v4",
      },
    });

    const flights = response.data.flights;

    // Eğer API'den uçuşlar gelmediyse
    if (!flights || flights.length === 0) {
      return res
        .status(200)
        .json({ message: "No flights found for the given direction." });
    }

    for (let flight of flights) {
      const checkExists = await Flight.findOne({ flightID: flight.id });

      if (!checkExists) {
        const destinationCode =
          flight.route.destinations[flight.route.destinations.length - 1];
        const airlineICAO = flight.prefixICAO;

        let destinationData = null;
        let airlineData = null;

        try {
          // Destination API isteği
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
          // Airline API isteği
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
          airlineData = null;
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

        newFlights.push(createdFlight);
        await createdFlight.save();
      }
    }

    // Uçuşları yanıt olarak dön
    res.json({ newFlights });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while fetching flights by direction",
      error,
    });
  }
};
