import axios, { all } from "axios";

export default async (req, res) => {
  // get the current weather of new york city
  const API_key = process.env.OPENWEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.71&lon=-74.00&appid=${API_key}&units=imperial`;

  const response = await axios({
    method: "get",
    url: url,
  });

  res.status(200).json(response.data);
};
