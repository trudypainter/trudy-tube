import Image from "next/image";
import { useEffect, useState } from "react";

export default function WeatherBox() {
  const [weather, setWeather] = useState("");

  //   // generate a gradient based on the weather
  //   function generateGradient(weather) {
  //     // temperature from 0 to 100, 0 being cold and 100 being hot
  //     // 0 is blue, 50 is yellow, 100 is red

  //     // gradient is

  // get the current weather of new york city
  useEffect(() => {
    const getWeather = async () => {
      const res = await fetch("/api/weather", {
        method: "GET",
      });
      const json = await res.json();

      // make a readable string for the weather
      // New York's current weather is 75°F with clear skies
      const weather = `New York's current weather is ${json.main.temp}°F with ${json.weather[0].description}`;
      setWeather(weather);
    };

    getWeather();
  }, []);

  return (
    <div>
      <div className="border-2 bg-white text-sm border-black border-b-0 px-4 py-2 w-fit ">
        Current Weather
      </div>
      <div className="border-2  border-black p-4 w-[800px] overflow-x-scroll ">
        {weather}. This background gradient is generated from this weather.
      </div>
      <div className="border-2 bg-white text-sm border-black border-t-0 px-4 py-2 w-fit float-right hover:cursor-pointer">
        Leave Me a Message
      </div>
    </div>
  );
}
