import React from 'react';
import { motion } from "framer-motion";
import { 
  MapPin, Droplet, Thermometer, Box, Sun, Wind, Leaf, Activity, AlertTriangle, AreaChart 
} from "lucide-react";
import Sidebar from "./Sidebar";

const fields = [
    { location: "Kolkata, WB", crop: "Riz", size: 10, yield: 80, status: "Prêt pour le semis", lastActivity: "Engrais appliqué il y a 2 jours", diseases: "3 détections", soilMoisture: 62 },
    { location: "Pendjab", crop: "Blé", size: 15, yield: 75, status: "Végétatif", lastActivity: "Irrigation effectuée il y a 1 jour", diseases: "1 détection", soilMoisture: 58 },
    { location: "Goa", crop: "Riz", size: 8, yield: 85, status: "Stade plantule", lastActivity: "Pesticide appliqué il y a 3 jours", diseases: "Aucune détection récente", soilMoisture: 65 },
    { location: "Bangalore, KA", crop: "Maïs", size: 12, yield: 78, status: "Floraison (panicule)", lastActivity: "Engrais appliqué il y a 5 jours", diseases: "2 détections", soilMoisture: 60 },
];

const StatCard = ({ title, value, Icon, color }) => (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
        <div className="flex justify-between items-center">
            <div className={`p-3 rounded-xl bg-${color}-100 text-${color}-600`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    </div>
);

const Fields = () => {
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
                <h1 className="text-3xl font-bold text-gray-800">Gestion de champs</h1>
                <p className="mt-2 text-gray-600">Surveillez et gérez vos champs agricoles.</p>
            </motion.div>

            {/* --- Current Weather & Add Field --- */}
            <div className="flex flex-col gap-4 justify-between items-start mb-8 sm:flex-row sm:items-center">
                <div className="flex gap-4 items-center p-4 bg-white rounded-xl border border-gray-200 shadow-md">
                    <div className="p-2 bg-yellow-100 rounded-full">
                        <Sun className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Conditions météorologiques actuelles</p>
                        <p className="text-sm text-gray-500">Idéal pour les opérations de champs</p>
                    </div>
                </div>
                <button className="px-6 py-3 font-semibold text-white bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105">
                    + Nouveau champ
                </button>
            </div>

            {/* --- Fields Grid --- */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {fields.map((field, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-3 items-center">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <h2 className="text-xl font-bold text-gray-800">{field.location}</h2>
                            </div>
                            <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">{field.crop}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Taille du champ</p>
                                <p className="text-lg font-bold text-gray-800">{field.size} ha</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Rendement projeté</p>
                                <div className="flex gap-2 items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${field.yield}%` }}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-800">{field.yield}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3 items-center"><Leaf className="w-4 h-4 text-green-500" /><span className="text-gray-500">Statut du sol :</span> <strong className="text-gray-700">{field.status}</strong></div>
                            <div className="flex gap-3 items-center"><Droplet className="w-4 h-4 text-blue-500" /><span className="text-gray-500">Humidité du sol :</span> <strong className="text-gray-700">{field.soilMoisture}%</strong></div>
                            <div className="flex gap-3 items-center"><Activity className="w-4 h-4 text-purple-500" /><span className="text-gray-500">Dernière activité :</span> <strong className="text-gray-700">{field.lastActivity}</strong></div>
                        </div>
                        
                        <div className="p-3 mt-4 text-center text-red-700 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-semibold">{field.diseases}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- Regional Performance --- */}
            <motion.div 
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Performance régionale</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard title="Superficie totale de culture" value="65 ha" Icon={AreaChart} color="green" />
                    <StatCard title="Rendement moyen" value="78.4%" Icon={Thermometer} color="blue" />
                    <StatCard title="Champs actifs" value={fields.length} Icon={Box} color="purple" />
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Fields;