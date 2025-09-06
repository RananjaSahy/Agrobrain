import React, { useState } from 'react';
import { motion } from "framer-motion";
import Sidebar from './Sidebar';
import { Leaf, UploadCloud, Stethoscope, BarChart2, Library } from "lucide-react";

const diseases = [
    { 
        name: 'Brûlure', 
        type: 'Fongique', 
        probability: 40, 
        symptoms: 'Taches brunes sur les feuilles, tiges flétries.', 
        recovery: [
            'Appliquer des fongicides à base de cuivre.', 
            'Retirer et brûler les feuilles infectées.', 
            'Améliorer le drainage pour éviter l’engorgement en eau.'
        ], 
        image: 'https://images.unsplash.com/photo-1617293541285-5204a2ab3a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGJsaWdodHxlbnwwfHx8fDE3MDgzNDM2Mzh8MA&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Rouille', 
        type: 'Fongique', 
        probability: 25, 
        symptoms: 'Pustules brun-rougeâtre sur les feuilles.', 
        recovery: [
            'Utiliser des variétés résistantes à la rouille.', 
            'Pulvériser des fongicides à base de soufre.', 
            'Maintenir un espacement adéquat pour améliorer la circulation de l’air.'
        ], 
        image: 'https://images.unsplash.com/photo-1588695954631-53a56213a48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHJ1c3R8ZW58MHx8fHwxNzA4MzQzNjM4fDA&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Oïdium', 
        type: 'Fongique', 
        probability: 30, 
        symptoms: 'Taches blanches poudreuses sur les feuilles et les tiges.', 
        recovery: [
            'Appliquer des pulvérisations de bicarbonate de potassium.', 
            'Augmenter la circulation de l’air autour des plantes.', 
            'Éviter l’arrosage par aspersion.'
        ], 
        image: 'https://images.unsplash.com/photo-1621275994273-51a82b36e8e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwb3dkZXJ5JTIwbWlsZGV3fGVufDB8fHx8MTcwODM0MzY3MHww&ixlib=rb-4.0.3&q=80&w=1080' 
    },
    { 
        name: 'Tache bactérienne', 
        type: 'Bactérienne', 
        probability: 20, 
        symptoms: 'Taches détrempées sur les feuilles, fruits croûteux.', 
        recovery: [
            'Appliquer des bactéricides à base de cuivre.', 
            'Pratiquer la rotation des cultures.', 
            'Éviter de travailler avec des plantes mouillées.'
        ], 
        image: 'https://images.unsplash.com/photo-1588695954631-53a56213a48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzczNDZ8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHJ1c3R8ZW58MHx8fHwxNzA4MzQzNjM4fDA&ixlib=rb-4.0.3&q=80&w=1080' 
    },
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
                <h1 className="text-3xl font-bold text-gray-800">Détection des maladies des cultures</h1>
                <p className="mt-2 text-gray-600">Des analyses avancées pour des cultures plus saines et une agriculture durable.</p>
            </motion.div>

            {/* --- Tabs --- */}
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-6">
                    <TabButton active={activeTab === 'detection'} onClick={() => setActiveTab('detection')}>Détection des maladies</TabButton>
                    <TabButton active={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')}>Statistiques</TabButton>
                    <TabButton active={activeTab === 'library'} onClick={() => setActiveTab('library')}>Bibliothèque de maladies</TabButton>
                </nav>
            </div>
            
            <div className="mt-8">
                {activeTab === 'detection' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {/* --- Upload Section --- */}
                        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
                                <h2 className="mb-4 text-2xl font-bold text-gray-800">Télécharger l'image de la plante</h2>
                                <div className="flex flex-col justify-center items-center p-8 mt-4 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                                    <UploadCloud className="mb-4 w-12 h-12 text-gray-400" />
                                    <p className="font-semibold text-gray-700">Faites glisser et déposez une image ou cliquez pour parcourir</p>
                                    <button className="px-5 py-2 mt-4 font-semibold text-white bg-green-600 rounded-full hover:bg-green-700">Télécharger une image</button>
                                </div>
                            </div>
                            <div className="p-8 bg-green-50 rounded-2xl border border-green-200">
                                <h3 className="mb-4 text-2xl font-bold text-green-800">How It Works</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">1</div><span className="text-gray-700">Téléchargez une image claire de la partie de la plante affectée.</span></li>
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">2</div><span className="text-gray-700">Notre IA analyse les symptômes et identifie les maladies potentielles.</span></li>
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">3</div><span className="text-gray-700">Passez en revue le diagnostic et les options de traitement recommandées.</span></li>
                                    <li className="flex items-start"><div className="flex-shrink-0 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">4</div><span className="text-gray-700">Suivez la santé des cultures au fil du temps grâce à nos outils de gestion.</span></li>
                                </ul>
                            </div>
                        </section>
                        
                        {/* --- Detection Results --- */}
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Résultats de détection</h2>
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
                                                        <p className="text-sm text-gray-500">Probabilité: {disease.probability}%</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${getTypeColor(disease.type)}`}>{disease.type}</span>
                                            </div>
                                            <p className="mt-4 text-gray-600">{disease.symptoms}</p>
                                        </div>
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                            <h4 className="mb-2 font-semibold text-gray-700">Étapes de récupération :</h4>
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
                {activeTab === 'statistics' && <div className="p-20 text-center bg-white rounded-2xl shadow-lg">Contenu des statistiques ici</div>}
                {activeTab === 'library' && <div className="p-20 text-center bg-white rounded-2xl shadow-lg">Contenu de la bibliothèque de maladies ici</div>}
            </div>
        </div>
      </main>
    </div>
  );
};

export default CropDiseaseDetection;