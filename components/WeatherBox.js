import Image from "next/image";
import { useEffect, useState } from "react";

export default function WeatherBox() {
  const [weather, setWeather] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const getNYCTime = async () => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    });
    // get time in 12 hour format string HH:MM:SS AM/PM
    setCurrentTime(currentTime);
  };

  // useEffect to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      getNYCTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // get the current weather of new york city
  useEffect(() => {
    const getWeather = async () => {
      const res = await fetch("/api/weather", {
        method: "GET",
      });
      const json = await res.json();

      // make a readable string for the weather
      // New York's current weather is 75°F with clear skies
      const weather = `The current weather is ${json.main.temp}°F with ${json.weather[0].description}`;
      setWeather(weather);
    };

    getWeather();
  }, []);

  return (
    <div className="laptop:w-[800px] mb-16 phone:w-[calc(100vw-1rem)] mx-auto">
      <div className="border-2 bg-white text-sm border-black border-b-0 px-4 py-2 w-fit ">
        Current Weather
      </div>
      <div className="border-2  border-black   overflow-x-scroll ">
        <div className="bg-white p-4">
          It is {currentTime} in NYC. {weather}. This background color is
          generated from the weather. Warmer weather is red, colder weather is
          blue.
        </div>

        <div className="flex justify-between">
          <div className="w-4 h-48 bg-white"></div>
          <div className="w-4 h-48 bg-white"></div>
          <div className="w-4 h-48 bg-white"></div>
        </div>
        <div className="w-full h-4 bg-white"></div>
        <div className="flex justify-between">
          <div className="w-4 h-48 bg-white"></div>
          <div className="w-4 h-48 bg-white"></div>
          <div className="w-4 h-48 bg-white"></div>
        </div>
        <div className="w-full h-4 bg-white"></div>
      </div>
      {/* window */}
    </div>
  );
}
