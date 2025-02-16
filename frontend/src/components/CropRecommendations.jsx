import React from 'react';
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { 
  Leaf,
  Droplet,
  Calendar,
  TrendingUp,
  Shovel,
  Mountain,
  LineChart,
  ArrowUpRight,
  MapPin,
  BadgeCheck,
  Filter,
  Download,
  Plus,
  Search
} from "lucide-react";

const CropRecommendations = () => {
  const recommendations = [
    {
      name: "Rice Cultivation Area A",
      score: 92,
      yield: "500kg/acre",
      water: "Moderate",
      period: "90 days",
      demand: "High",
      soilDepth: "60cm",
      mineralContent: "High Phosphorus",
      pHLevel: "6.5",
      landGrade: "Grade A",
      coordinates: "34°N, 118°W",
      status: "active",
      lastUpdated: "2h ago"
    },
    {
      name: "Wheat Zone B",
      score: 88,
      yield: "420kg/acre",
      water: "Low",
      period: "120 days",
      demand: "Medium",
      soilDepth: "45cm",
      mineralContent: "Medium Nitrogen",
      pHLevel: "7.0",
      landGrade: "Grade B",
      coordinates: "35°N, 119°W",
      status: "pending",
      lastUpdated: "4h ago"
    },
    {
      name: "Maize Region C",
      score: 85,
      yield: "600kg/acre",
      water: "High",
      period: "100 days",
      demand: "High",
      soilDepth: "75cm",
      mineralContent: "High Potassium",
      pHLevel: "6.8",
      landGrade: "Grade A",
      coordinates: "33°N, 117°W",
      status: "active",
      lastUpdated: "1h ago"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      inactive: "bg-red-50 text-red-700 border-red-200"
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div 
        className="fixed inset-0 bg-center bg-cover opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'url("/api/placeholder/1920/1080")',
          zIndex: 0 
        }} 
      />
      
      <Sidebar />
      <div className="flex-1 p-6 ml-[280px] lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
   
          <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 lg:text-4xl">Agricultural Mining Operations</h1>
              <p className="mt-2 text-slate-600">
                Integrated analysis of soil conditions, mineral content, and crop suitability
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search operations..." 
                  className="py-2 pr-4 pl-10 w-full bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="flex gap-2 justify-center items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>New Analysis</span>
              </button>
              <button className="flex gap-2 justify-center items-center px-4 py-2 text-green-600 bg-white rounded-lg border border-green-600 hover:bg-green-50">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

        
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white rounded-xl border shadow-sm border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Active Sites</p>
                  <div className="flex gap-2 items-center mt-1">
                    <p className="text-2xl font-bold text-slate-800">24</p>
                    <span className="flex items-center text-sm font-medium text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                      12%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Mountain className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Soil Quality</p>
                  <div className="flex gap-2 items-center mt-1">
                    <p className="text-2xl font-bold text-slate-800">87%</p>
                    <span className="flex items-center text-sm font-medium text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                      5%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Shovel className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Yield</p>
                  <div className="flex gap-2 items-center mt-1">
                    <p className="text-2xl font-bold text-slate-800">1.8K</p>
                    <span className="text-sm text-slate-600">tons</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <LineChart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-600">Resource Efficiency</p>
                  <div className="flex gap-2 items-center mt-1">
                    <p className="text-2xl font-bold text-slate-800">92%</p>
                    <span className="flex items-center text-sm font-medium text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                      8%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap gap-4 p-4 mb-6 bg-white rounded-lg border border-slate-100">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100">
              <Filter className="w-4 h-4" />
              All Filters
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100">
              Status: Active
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100">
              Grade: All
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100">
              Yield: High to Low
            </button>
          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((site, index) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden bg-white rounded-xl border shadow-sm transition-all group border-slate-100 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-bold transition-colors text-slate-800 group-hover:text-green-600">
                        {site.name}
                      </h2>
                      <div className="flex gap-2 items-center mt-1">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-500">{site.coordinates}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(site.status)}`}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-50">
                      <div className="flex gap-2 items-center mb-2 text-slate-600">
                        <Mountain className="w-4 h-4" />
                        <span className="text-sm font-medium">Soil Depth</span>
                      </div>
                      <span className="text-lg font-semibold text-slate-800">{site.soilDepth}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50">
                      <div className="flex gap-2 items-center mb-2 text-slate-600">
                        <Droplet className="w-4 h-4" />
                        <span className="text-sm font-medium">pH Level</span>
                      </div>
                      <span className="text-lg font-semibold text-slate-800">{site.pHLevel}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                      <div className="flex gap-2 items-center">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-600">Mineral Content</span>
                      </div>
                      <span className="font-medium text-slate-800">{site.mineralContent}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                      <div className="flex gap-2 items-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Growing Period</span>
                      </div>
                      <span className="font-medium text-slate-800">{site.period}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                      <div className="flex gap-2 items-center">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-slate-600">Yield Potential</span>
                      </div>
                      <span className="font-medium text-slate-800">{site.yield}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 mt-6 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                      Last updated: {site.lastUpdated}
                    </span>
                    <button className="flex gap-2 items-center text-green-600 hover:text-green-700">
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CropRecommendations;