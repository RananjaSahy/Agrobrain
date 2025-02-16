import { useState } from "react";

const EditLocation = ({ onLocationUpdate }) => {
  const [newLocation, setNewLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const apiKey = "82e7c90c7c53900a524412184efb2c8f";
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
      
    } catch (error) {
      setError(error.message || "Failed to update location");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Enter city name"
          className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isSubmitting}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
          disabled={isSubmitting || !newLocation.trim()}
        >
          {isSubmitting ? "Updating..." : "Update Location"}
        </button>
      </form>
    </div>
  );
};

export default EditLocation;