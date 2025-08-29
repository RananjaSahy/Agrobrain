import React from 'react';
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { 
  Leaf, Droplet, Calendar, TrendingUp, Shovel, Mountain, LineChart, 
  ArrowUpRight, MapPin, Filter, Download, Plus, Search 
} from "lucide-react";

const StatCard = ({ title, value, percentage, Icon, color }) => {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
  };
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex gap-2 items-center mt-1">
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {percentage && (
              <span className="flex items-center text-sm font-medium text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                {percentage}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const CropRecommendations = () => {
  const recommendations = [
    { name: "Rice Cultivation Area A", yield: "500kg/acre", period: "90 days", soilDepth: "60cm", mineralContent: "High Phosphorus", pHLevel: "6.5", coordinates: "34°N, 118°W", status: "active", lastUpdated: "2h ago" },
    { name: "Wheat Zone B", yield: "420kg/acre", period: "120 days", soilDepth: "45cm", mineralContent: "Medium Nitrogen", pHLevel: "7.0", coordinates: "35°N, 119°W", status: "pending", lastUpdated: "4h ago" },
    { name: "Maize Region C", yield: "600kg/acre", period: "100 days", soilDepth: "75cm", mineralContent: "High Potassium", pHLevel: "6.8", coordinates: "33°N, 117°W", status: "active", lastUpdated: "1h ago" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-700",
      pending: "bg-amber-100 text-amber-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };
  
  const InfoRow = ({ Icon, title, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <div className="flex gap-3 items-center text-sm text-gray-500">
            <Icon className="w-5 h-5" />
            <span>{title}</span>
        </div>
        <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-grow p-6 ml-0 md:p-8 md:ml-72">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* --- Header --- */}
            <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 lg:text-4xl">Agricultural Mining Operations</h1>
                <p className="mt-2 text-gray-600">
                  Integrated analysis of soil conditions, mineral content, and crop suitability.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search operations..." 
                    className="px-4 py-2 pl-11 w-full text-gray-700 bg-white rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="flex gap-2 justify-center items-center px-5 py-2 font-semibold text-white bg-green-600 rounded-full shadow-md transition-all hover:bg-green-700 hover:shadow-lg">
                  <Plus className="w-5 h-5" />
                  <span>New Analysis</span>
                </button>
                <button className="flex gap-2 justify-center items-center px-5 py-2 font-semibold text-green-600 bg-white rounded-full border border-green-600 transition-all hover:bg-green-50">
                  <Download className="w-5 h-5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* --- Stat Cards --- */}
            <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Active Sites" value="24" percentage="12%" Icon={Mountain} color="green" />
                <StatCard title="Average Soil Quality" value="87%" percentage="5%" Icon={Shovel} color="blue" />
                <StatCard title="Monthly Yield" value="1.8K tons" Icon={LineChart} color="purple" />
                <StatCard title="Resource Efficiency" value="92%" percentage="8%" Icon={TrendingUp} color="amber" />
            </div>

            {/* --- Filter Bar --- */}
            <div className="flex flex-wrap gap-4 items-center p-4 mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                <span className="flex gap-2 items-center font-semibold text-gray-700">
                    <Filter className="w-5 h-5" />
                    Filters:
                </span>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">Status: Active</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">Grade: All</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">Yield: High to Low</button>
            </div>

            {/* --- Recommendation Cards --- */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((site, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{site.name}</h2>
                      <div className="flex gap-2 items-center mt-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{site.coordinates}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusColor(site.status)}`}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Soil Depth</p>
                      <p className="text-lg font-bold text-gray-800">{site.soilDepth}</p>
                    </div>
                     <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">pH Level</p>
                      <p className="text-lg font-bold text-gray-800">{site.pHLevel}</p>
                    </div>
                  </div>

                  <div className="flex-grow space-y-1">
                    <InfoRow Icon={Leaf} title="Mineral Content" value={site.mineralContent} />
                    <InfoRow Icon={Calendar} title="Growing Period" value={site.period} />
                    <InfoRow Icon={TrendingUp} title="Yield Potential" value={site.yield} />
                  </div>

                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Updated: {site.lastUpdated}</span>
                    <a href="#" className="flex gap-1 items-center text-sm font-semibold text-green-600 hover:underline">
                      View Details <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CropRecommendations;