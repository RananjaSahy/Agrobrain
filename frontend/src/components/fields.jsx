import React from 'react';
import { motion } from "framer-motion";
import { FiMapPin, FiDroplet, FiThermometer, FiPackage, FiSun, FiWind } from "react-icons/fi";
import Sidebar from "./Sidebar";

const Fields = () => {
  const fields = [
    {
      location: "Kolkata, WB",
      crop: "Rice",
      size: "10 acres",
      yield: "80%",
      status: "Soil ready for sowing",
      lastActivity: "Fertilizer applied 2 days ago",
      diseases: "3 detections this year",
      soilMoisture: "62%",
      temperature: "28°C"
    },
    {
      location: "Punjab",
      crop: "Wheat",
      size: "15 acres",
      yield: "75%",
      status: "Growth phase: Vegetative",
      lastActivity: "Irrigation completed 1 day ago",
      diseases: "1 detection this year",
      soilMoisture: "58%",
      temperature: "25°C"
    },
    {
      location: "Goa",
      crop: "Rice",
      size: "8 acres",
      yield: "85%",
      status: "Seedling stage",
      lastActivity: "Pesticide applied 3 days ago",
      diseases: "No recent detections",
      soilMoisture: "65%",
      temperature: "30°C"
    },
    {
      location: "Bangalore, KA",
      crop: "Maize",
      size: "12 acres",
      yield: "78%",
      status: "Tasseling stage",
      lastActivity: "Fertilizer applied 5 days ago",
      diseases: "2 detections this year",
      soilMoisture: "60%",
      temperature: "27°C"
    },
    {
      location: "Hyderabad, TS",
      crop: "Cotton",
      size: "20 acres",
      yield: "82%",
      status: "Flowering stage",
      lastActivity: "Irrigation in progress",
      diseases: "4 detections this year",
      soilMoisture: "55%",
      temperature: "32°C"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div 
        className="fixed inset-0 bg-center bg-cover opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'url("/api/placeholder/1920/1080")',
          zIndex: 0 
        }} 
      />
      
      <Sidebar />
      
      <div className="overflow-y-auto relative z-10 flex-grow p-8 ml-72">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="flex gap-3 items-center text-4xl font-bold text-gray-800">
            <FiSun className="text-yellow-500" />
            Field Management
          </h1>
          <p className="mt-2 text-lg text-gray-600">Monitor and manage your agricultural fields</p>
        </motion.div>

        {/* Weather Summary */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 mb-8 rounded-xl shadow-lg backdrop-blur-sm bg-white/80"
        >
          <div className="flex gap-6 items-center">
            <FiWind className="text-2xl text-blue-500" />
            <div className="text-sm">
              <p className="font-medium">Current Weather Conditions</p>
              <p className="text-gray-600">Optimal for field operations</p>
            </div>
          </div>
        </motion.div>

        <div className="overflow-x-auto pb-6 mb-8">
          <div className="flex gap-6" style={{ minWidth: `${fields.length * 400}px` }}>
            {fields.map((field, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="w-[400px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex-shrink-0 border border-gray-100"
              >
                <div className="flex gap-3 items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiMapPin className="text-xl text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">{field.location}</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Crop Type</span>
                    <span className="font-medium text-green-700">{field.crop}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg transition-colors hover:bg-green-100">
                      <p className="text-sm text-gray-600">Field Size</p>
                      <p className="text-lg font-semibold">{field.size}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg transition-colors hover:bg-blue-100">
                      <p className="text-sm text-gray-600">Projected Yield</p>
                      <p className="text-lg font-semibold text-blue-600">{field.yield}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3 items-center p-2 text-sm rounded-lg transition-colors hover:bg-gray-50">
                      <FiThermometer className="text-gray-500" />
                      <span>Soil Status: {field.status}</span>
                    </div>
                    <div className="flex gap-3 items-center p-2 text-sm rounded-lg transition-colors hover:bg-gray-50">
                      <FiDroplet className="text-blue-500" />
                      <span>Soil Moisture: {field.soilMoisture}</span>
                    </div>
                    <div className="flex gap-3 items-center p-2 text-sm rounded-lg transition-colors hover:bg-gray-50">
                      <FiPackage className="text-orange-500" />
                      <span>Last Activity: {field.lastActivity}</span>
                    </div>
                  </div>

                  <div className="p-4 mt-4 bg-red-50 rounded-lg transition-colors hover:bg-red-100">
                    <p className="text-sm font-medium text-red-600">Disease Detections: {field.diseases}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

   
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-2xl border border-gray-100 shadow-lg backdrop-blur-sm bg-white/90"
        >
          <h2 className="flex gap-3 items-center mb-6 text-2xl font-semibold">
            <span className="p-2 bg-purple-100 rounded-lg">
              <FiPackage className="text-purple-600" />
            </span>
            Regional Performance
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 bg-green-50 rounded-xl transition-colors hover:bg-green-100">
              <p className="mb-2 text-gray-600">Total Cultivation Area</p>
              <p className="text-3xl font-bold text-green-700">65 acres</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl transition-colors hover:bg-blue-100">
              <p className="mb-2 text-gray-600">Average Yield</p>
              <p className="text-3xl font-bold text-blue-700">78.4%</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl transition-colors hover:bg-purple-100">
              <p className="mb-2 text-gray-600">Active Fields</p>
              <p className="text-3xl font-bold text-purple-700">{fields.length}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Fields;