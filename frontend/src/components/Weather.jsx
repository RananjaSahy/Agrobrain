import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { 
  WiDaySunny, WiCloudy, WiRain, WiShowers, WiThunderstorm, WiSnow, WiFog 
} from "react-icons/wi";
import { Thermometer, Droplets, Wind, Compass, Sunrise, Sunset, AlertTriangle, Droplet } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


const getWeatherIcon = (iconCode, size = "text-5xl") => {
  const code = iconCode.slice(0, 2);
  const icons = {
    "01": <WiDaySunny className={`text-yellow-500 ${size}`} />,
    "02": <WiCloudy className={`text-gray-500 ${size}`} />,
    "03": <WiCloudy className={`text-gray-500 ${size}`} />,
    "04": <WiCloudy className={`text-gray-500 ${size}`} />,
    "09": <WiShowers className={`text-blue-500 ${size}`} />,
    "10": <WiRain className={`text-blue-500 ${size}`} />,
    "11": <WiThunderstorm className={`text-purple-500 ${size}`} />,
    "13": <WiSnow className={`text-cyan-500 ${size}`} />,
    "50": <WiFog className={`text-gray-400 ${size}`} />,
  };
  return icons[code] || <WiDaySunny className={`text-yellow-500 ${size}`} />;
};

const Weather = () => {
  const [city, setCity] = useState("Aucun emplacement défini");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async (cityName) => {
      setLoading(true);
      setError(null);
      try {
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=fr`)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) throw new Error('Échec de la récupération des données météorologiques.');
        
        const weather = await weatherRes.json();
        const forecast = await forecastRes.json();
        
        setWeatherData(weather);
        const dailyForecast = forecast.list.filter((reading, index, arr) =>
          index === 0 || new Date(reading.dt_txt).getDate() !== new Date(arr[index - 1].dt_txt).getDate()
        ).slice(0, 7);
        setForecastData(dailyForecast);
        setCity(weather.name);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
        fetchWeather(savedLocation);
    } else {
        setLoading(false);
        setError("Emplacement introuvable dans le stockage local. Veuillez le définir sur le tableau de bord.");
        setCity("Emplacement inconnu");
    }
  }, [apiKey]);
  
  const StatCard = ({ Icon, title, value, color }) => (
    <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-grow p-6 ml-0 md:p-8 md:ml-64">
        <div className="mx-auto max-w-7xl">
            <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Tableau de bord météo agricole</h1>
                <p className="mt-2 text-gray-600">Des informations météorologiques en temps réel pour <span className="font-semibold text-green-600">{city}</span></p>
            </motion.div>

            {loading ? (
                <div className="py-20 text-center">Loading weather data...</div>
            ) : error ? (
                <div className="p-6 text-center text-red-700 bg-red-50 rounded-xl">{error}</div>
            ) : weatherData && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="flex flex-col justify-center items-center p-6 text-center bg-white rounded-2xl border border-gray-200 shadow-lg lg:col-span-1">
                            {getWeatherIcon(weatherData.weather[0].icon)}
                            <p className="mt-2 text-6xl font-bold text-gray-800">{Math.round(weatherData.main.temp)}°C</p>
                            <p className="text-lg text-gray-600 capitalize">{weatherData.weather[0].description}</p>
                            <p className="mt-4 text-sm text-gray-500">
                                {/* Feels like {Math.round(weatherData.main.feels_like)}°C */}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                           <StatCard Icon={Droplets} title="Humidité" value={`${weatherData.main.humidity}%`} color="blue" />
                           <StatCard Icon={Wind} title="Vitesse du vent" value={`${weatherData.wind.speed} km/h`} color="sky" />
                           <StatCard Icon={Compass} title="Pression" value={`${weatherData.main.pressure} hPa`} color="slate" />
                           <StatCard Icon={Thermometer} title="Haut / Bas" value={`${Math.round(weatherData.main.temp_max)}° / ${Math.round(weatherData.main.temp_min)}°`} color="orange" />
                           <StatCard Icon={Sunrise} title="Lever du soleil" value={format(new Date(weatherData.sys.sunrise * 1000), 'p',{ locale: fr })} color="amber" />
                           <StatCard Icon={Sunset} title="Coucher du soleil" value={format(new Date(weatherData.sys.sunset * 1000), 'p',{ locale: fr })} color="indigo" />
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Prévisions sur 7 jours</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
                            {forecastData.map((day, index) => (
                                <motion.div 
                                    key={index}
                                    className="p-4 text-center bg-white rounded-xl border border-gray-200 shadow-md"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <p className="font-semibold text-gray-700">{format(new Date(day.dt_txt), 'EEE', { locale: fr })}</p>
                                    <div className="my-2">{getWeatherIcon(day.weather[0].icon, 'text-4xl')}</div>
                                    <p className="font-bold text-gray-800">{Math.round(day.main.temp_max)}°</p>
                                    <p className="text-sm text-gray-500">{Math.round(day.main.temp_min)}°</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                     <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
                           <h3 className="mb-4 text-xl font-semibold text-gray-800">Calendrier d'arrosage</h3>
                           <div className="flex gap-4 items-center">
                              <div className="p-3 bg-blue-100 rounded-full"><Droplet className="w-6 h-6 text-blue-600" /></div>
                              <div>
                                 <p className="font-semibold text-gray-700">Prochain arrosage recommandé</p>
                                 <p className="text-gray-500">Mercredi, 15h00</p>
                              </div>
                           </div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
                           <h3 className="mb-4 text-xl font-semibold text-gray-800">Prévisions antiparasitaires</h3>
                           <div className="flex gap-4 items-center">
                              <div className="p-3 bg-red-100 rounded-full"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
                              <div>
                                 <p className="font-semibold text-gray-700">Faible risque détecté</p>
                                 <p className="text-gray-500">Aucune action immédiate nécessaire</p>
                              </div>
                           </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Weather;