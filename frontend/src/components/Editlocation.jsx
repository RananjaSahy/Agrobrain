import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader, AlertCircle } from "lucide-react";

const EditLocation = ({ onLocationUpdate }) => {
  const [newLocation, setNewLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${apiKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }
      const weatherData = await weatherResponse.json();
      const validatedCityName = weatherData.name;

      localStorage.setItem("user_location", validatedCityName);
      onLocationUpdate(validatedCityName);
      setNewLocation("");

    } catch (err) {
      setError(err.message || "Failed to update location");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-green-200 bg-green-50/50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center sm:flex-row">
        <div className="relative w-full">
          <MapPin className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter new city name..."
            className="py-2 pr-4 pl-10 w-full text-gray-700 bg-white rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center px-6 py-2 w-full font-semibold text-white bg-green-600 rounded-full shadow-md transition-all duration-300 sm:w-auto hover:bg-green-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting || !newLocation.trim()}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 w-5 h-5 animate-spin" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </form>
      <AnimatePresence>
        {error && (
          <motion.p 
            className="flex gap-2 items-center mt-2 text-sm font-medium text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle size={16} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditLocation;