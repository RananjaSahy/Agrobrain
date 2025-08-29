import React, { useState } from 'react';
import { motion } from "framer-motion";
import Sidebar from './Sidebar';
import { Leaf, UploadCloud, Stethoscope, BarChart2, Library } from "lucide-react";

// --- Mock Data ---
const diseases = [
    { name: 'Blight', type: 'Fungal', probability: 40, symptoms: 'Brown spots on leaves, wilting stems.', recovery: ['Apply copper-based fungicides.', 'Remove and burn infected leaves.', 'Improve drainage to avoid waterlogging.'], image: 'https://images.unsplash.com/photo-1617293541285-5204a2ab3a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGJsaWdodHxlbnwwfHx8fDE3MDgzNDM2Mzh8MA&ixlib=rb-4.0.3&q=80&w=1080' },
    { name: 'Rust', type: 'Fungal', probability: 25, symptoms: 'Reddish-brown pustules on leaves.', recovery: ['Use rust-resistant crop varieties.', 'Spray sulfur-based fungicides.', 'Maintain proper spacing to improve airflow.'], image: 'https://images.unsplash.com/photo-1588695954631-53a56213a48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHJ1c3R8ZW58MHx8fHwxNzA4MzQzNjM4fDA&ixlib=rb-4.0.3&q=80&w=1080' },
    { name: 'Powdery Mildew', type: 'Fungal', probability: 30, symptoms: 'White powdery spots on leaves and stems.', recovery: ['Apply potassium bicarbonate sprays.', 'Increase air circulation around plants.', 'Avoid overhead watering.'], image: 'https://images.unsplash.com/photo-1621275994273-51a82b36e8e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwb3dkZXJ5JTIwbWlsZGV3fGVufDB8fHx8MTcwODM0MzY3MHww&ixlib=rb-4.0.3&q=80&w=1080' },
    { name: 'Bacterial Spot', type: 'Bacterial', probability: 20, symptoms: 'Water-soaked spots on leaves, scabby fruits.', recovery: ['Apply copper-based bactericides.', 'Practice crop rotation.', 'Avoid working with wet plants.'], image: 'https://images.unsplash.com/photo-1588695954631-53a56213a48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHJ1c3R8ZW58MHx8fHwxNzA4MzQzNjM4fDA&ixlib=rb-4.0.3&q=80&w=1080' },
];

const TabButton = ({ active, onClick, children }) => (
    <button 
      onClick={onClick}
      className={`px-4 py-3 font-semibold transition-colors duration-200 ${
          active 
          ? 'text-green-600 border-b-2 border-green-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
);

const CropDiseaseDetection = () => {
  const [activeTab, setActiveTab] = useState('detection');

  const getTypeColor = (type) => {
    const colors = {
      Fungal: "bg-orange-100 text-orange-700",
      Bacterial: "bg-red-100 text-red-700",
      Virus: "bg-purple-100 text-purple-700",
      Abiotic: "bg-blue-100 text-blue-700"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-grow p-6 ml-0 md:p-8 md:ml-64">
        <div className="mx-auto max-w-7xl">
            {/* --- Header --- */}
            <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Crop Disease Detection</h1>
                <p className="mt-2 text-gray-600">Advanced analytics for healthier crops and sustainable farming.</p>
            </motion.div>

            {/* --- Tabs --- */}
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-6">
                    <TabButton active={activeTab === 'detection'} onClick={() => setActiveTab('detection')}>Disease Detection</TabButton>
                    <TabButton active={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')}>Statistics</TabButton>
                    <TabButton active={activeTab === 'library'} onClick={() => setActiveTab('library')}>Disease Library</TabButton>
                </nav>
            </div>
            
            <div className="mt-8">
                {activeTab === 'detection' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {/* --- Upload Section --- */}
                        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
                                <h2 className="mb-4 text-2xl font-bold text-gray-800">Upload Plant Image</h2>
                                <div className="flex flex-col justify-center items-center p-8 mt-4 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                                    <UploadCloud className="mb-4 w-12 h-12 text-gray-400" />
                                    <p className="font-semibold text-gray-700">Drag and drop an image or click to browse</p>
                                    <button className="px-5 py-2 mt-4 font-semibold text-white bg-green-600 rounded-full hover:bg-green-700">Upload Image</button>
                                </div>
                            </div>
                            <div className="p-8 bg-green-50 rounded-2xl border border-green-200">
                                <h3 className="mb-4 text-2xl font-bold text-green-800">How It Works</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">1</div><span className="text-gray-700">Upload a clear image of the affected plant part.</span></li>
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">2</div><span className="text-gray-700">Our AI analyzes symptoms and identifies potential diseases.</span></li>
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">3</div><span className="text-gray-700">Review diagnosis and recommended treatment options.</span></li>
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">4</div><span className="text-gray-700">Track crop health over time with our management tools.</span></li>
                                </ul>
                            </div>
                        </section>
                        
                        {/* --- Detection Results --- */}
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Detection Results</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {diseases.slice(0, 4).map((disease, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-4 items-center">
                                                    <img src={disease.image} alt={disease.name} className="object-cover w-16 h-16 rounded-lg" />
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">{disease.name}</h3>
                                                        <p className="text-sm text-gray-500">Probability: {disease.probability}%</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${getTypeColor(disease.type)}`}>{disease.type}</span>
                                            </div>
                                            <p className="mt-4 text-gray-600">{disease.symptoms}</p>
                                        </div>
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                            <h4 className="mb-2 font-semibold text-gray-700">Recovery Steps:</h4>
                                            <ul className="space-y-2 text-gray-600">
                                                {disease.recovery.map((step, i) => (
                                                    <li key={i} className="flex items-start text-sm">
                                                        <div className="flex-shrink-0 mt-1 mr-3 w-4 h-4 text-green-500 bg-green-100 rounded-full flex-center">✓</div>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}
                {/* Placeholder content for other tabs */}
                {activeTab === 'statistics' && <div className="p-20 text-center bg-white rounded-2xl shadow-lg">Statistics Content Here</div>}
                {activeTab === 'library' && <div className="p-20 text-center bg-white rounded-2xl shadow-lg">Disease Library Content Here</div>}
            </div>
        </div>
      </main>
    </div>
  );
};

export default CropDiseaseDetection;