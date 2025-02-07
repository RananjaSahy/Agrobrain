import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Weather = () => {
  const [city, setCity] = useState("Fetching location...");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState(null);
  const apiKey = "82e7c90c7c53900a524412184efb2c8f";

  // Fetch weather by location coordinates
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const weatherJson = await weatherResponse.json();
      const forecastJson = await forecastResponse.json();

      setWeatherData(weatherJson);
      setForecastData(forecastJson.list.slice(0, 7));
      setCity(weatherJson.name); // Set the city name from API response
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setCity("Location permission denied");
        }
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-green-100 to-white">
      <Sidebar />
      <div className="flex-grow p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-800">
          Weather Details for {city}
        </h1>

        {/* Current Weather */}
        <div className="bg-gradient-to-r from-green-300 to-white p-6 rounded-lg shadow-md mb-8">
          {weatherData ? (
            <>
              <h2 className="text-2xl font-bold mb-2">
                Current Weather in {weatherData.name}
              </h2>
              <p className="text-xl">
                Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C
              </p>
              <p className="text-md text-gray-700">
                Feels like: {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
              </p>
              <p className="text-md text-gray-600 capitalize">
                Weather: {weatherData.weather[0].description}
              </p>
              <div className="flex gap-4 mt-4">
                <p className="bg-white p-2 rounded shadow">
                  Humidity: {weatherData.main.humidity}%
                </p>
                <p className="bg-white p-2 rounded shadow">
                  Pressure: {weatherData.main.pressure} hPa
                </p>
                <p className="bg-white p-2 rounded shadow">
                  Wind Speed: {weatherData.wind.speed} km/h
                </p>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7 Days Forecast</h2>
          <div className="flex overflow-x-scroll space-x-4">
            {forecastData.map((day, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-md">
                <p>
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <p>{(day.main.temp - 273.15).toFixed(1)}°C</p>
                <p className="capitalize">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Farming Index and Additional Sections */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-green-50 p-4 rounded shadow-md">
            <h3 className="font-bold mb-2">Irrigation Schedule</h3>
            <p>Next irrigation is on Wednesday</p>
          </div>
          <div className="bg-red-50 p-4 rounded shadow-md">
            <h3 className="font-bold mb-2">Pest Forecast</h3>
            <p>No emergency detected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
