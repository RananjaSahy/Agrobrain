import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { WiDaySunny, WiRain, WiCloudy, WiThermometer } from "react-icons/wi";
import { TbDropletFilled, TbWind } from "react-icons/tb";

const Weather = () => {
  const [city, setCity] = useState("Fetching location...");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "82e7c90c7c53900a524412184efb2c8f";

  // Replace the fetchWeatherData function with this new one
  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const [weatherJson, forecastJson] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json()
      ]);

      setWeatherData(weatherJson);
      setForecastData(forecastJson.list.slice(0, 7));
      setCity(weatherJson.name);
    } catch (error) {
      setError("Could not fetch weather data for this city");
      setCity("Location unavailable");
    } finally {
      setLoading(false);
    }
  };

  // Replace the useEffect with this new one
  useEffect(() => {
    // Get the saved location from localStorage
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
      setCity(savedLocation);
      fetchWeatherByCity(savedLocation);
    } else {
      setError("No location set");
      setLoading(false);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: <WiDaySunny className="text-4xl text-yellow-500" />,
      Clouds: <WiCloudy className="text-4xl text-gray-500" />,
      Rain: <WiRain className="text-4xl text-blue-500" />,
    };
    return icons[condition] || <WiDaySunny className="text-4xl text-yellow-500" />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <motion.div 
        className="overflow-y-auto flex-grow p-8 ml-72"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Agricultural Weather Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            {error ? "Error fetching data" : `Real-time weather insights for ${city}`}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600 animate-pulse">Loading weather data...</div>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-red-600">Error: {error}</h2>
            <p className="mt-2 text-gray-600">Please try refreshing the page or check your location settings.</p>
          </div>
        ) : (
          <>
            {/* Current Weather Card */}
            <motion.div 
              variants={itemVariants}
              className="p-6 mb-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Main Weather Info */}
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    {weatherData && getWeatherIcon(weatherData.weather[0].main)}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {(weatherData.main.temp - 273.15).toFixed(1)}°C
                      </h2>
                      <p className="text-gray-600 capitalize">
                        {weatherData.weather[0].description}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-700">
                    {city}
                  </p>
                </div>

                {/* Weather Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-3 items-center p-4 bg-green-50 rounded-xl">
                    <TbDropletFilled className="text-2xl text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="font-semibold">{weatherData.main.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-4 bg-blue-50 rounded-xl">
                    <TbWind className="text-2xl text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Wind Speed</p>
                      <p className="font-semibold">{weatherData.wind.speed} km/h</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Feels Like</span>
                    <span className="font-semibold">
                      {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Pressure</span>
                    <span className="font-semibold">{weatherData.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Forecast Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-800">7-Day Forecast</h2>
              <div className="flex overflow-x-auto gap-4 pb-4">
                {forecastData.map((day, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="min-w-[150px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
                  >
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      {new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    {getWeatherIcon(day.weather[0].main)}
                    <p className="mt-2 text-lg font-semibold">
                      {(day.main.temp - 273.15).toFixed(1)}°C
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {day.weather[0].description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Agricultural Insights */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-green-700">Irrigation Schedule</h3>
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <TbDropletFilled className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Next irrigation recommended</p>
                    <p className="text-gray-600">Wednesday, 3:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-red-700">Pest Forecast</h3>
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-red-100 rounded-full">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Low risk detected</p>
                    <p className="text-gray-600">No immediate action needed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Weather;