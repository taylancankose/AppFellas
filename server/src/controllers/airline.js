import axios from "axios";
import Airline from "../models/airline.js";

export const getAirlines = async (req, res) => {
  for (let page = 0; page <= 18; page++) {
    try {
      const allAirlines = await Airline.find();
      if (allAirlines.lenght < 310) {
        // Get data from API
        const response = await axios.get(
          `${process.env.API_URL}/airlines?page=${page}&sort=%2Biata`,
          {
            headers: {
              app_id: process.env.APPLICATION_ID,
              app_key: process.env.API_KEY,
              ResourceVersion: "v4",
            },
          }
        );

        const airlines = response.data.airlines;

        // Save data to db
        for (let airline of airlines) {
          // if airline is not found add it to the db
          const existingAirline = await Airline.findOne({ icao: airline.icao });
          if (!existingAirline) {
            const newAirline = new Airline({
              icao: airline.icao,
              nvls: airline.nvls,
              publicName: airline.publicName,
            });
            await newAirline.save();
            console.log(`Airline ${airline.publicName} saved to database.`);
          } else {
            console.log(
              `Airline ${airline.publicName} already exists in the database.`
            );
          }
        }
      } else {
        return res.json(allAirlines);
      }
    } catch (error) {
      console.error(`Failed to fetch or save airlines on page ${page}:`, error);
    }
  }
};
