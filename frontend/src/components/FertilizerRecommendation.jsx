import React from 'react';
import { motion } from "framer-motion";
import { Search, Download, MapPin, TestTube, Rss, Info, CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import rice from "../../public/rice.webp"
import Wheat from "../../public/wheat.webp"

const fields = [
    {
        id: 1,
        location: 'Kolkata, WB',
        fieldName: 'Champ 1 - Riz',
        size: '10 ha',
        lastUpdated: '20 Déc 2024',
        image: rice,
        recommendations: {
            urea: '50 kg/ha',
            potassiumNitrate: '30 kg/ha',
            zincSulfate: '5 kg/ha',
            ph: 3
        },
        notes: [
            'Assurer une irrigation adéquate pour maximiser l’absorption des engrais.',
            'Effectuer un test de pH du sol pour de meilleurs résultats.'
        ]
    },
    {
        id: 2,
        location: 'Pendjab',
        fieldName: 'Champ 2 - Blé',
        size: '15 ha',
        lastUpdated: '22 Déc 2024',
        image: Wheat,
        recommendations: {
            urea: '60 kg/ha',
            potassiumNitrate: '35 kg/ha',
            zincSulfate: '7 kg/ha',
            ph: 6.8
        },
        notes: [
            'Surveiller les signes de carence en azote.',
            'La plage de pH optimale est comprise entre 6,0 et 7,0.'
        ]
    }
];

const RecommendationCard = ({ title, value }) => (
    <div className="p-4 rounded-lg border border-green-200 bg-green-50/70">
        <p className="text-sm text-green-800">{title}</p>
        <p className="text-xl font-bold text-green-900">{value}</p>
    </div>
);

const FertilizerRecommendation = () => {
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
                        <h1 className="text-3xl font-bold text-gray-800">Recommandation d'engrais</h1>
                        <p className="mt-2 text-gray-600">Des informations sur les engrais basées sur l'IA pour vos champs enregistrés.</p>
                    </motion.div>

                    {/* --- Search Bar --- */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by field name or location..."
                            className="py-3 pr-4 pl-12 w-full text-gray-700 bg-white rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                    {/* --- Fields List --- */}
                    <div className="space-y-8">
                        {fields.map((field, index) => (
                            <motion.div 
                                key={field.id} 
                                className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-5">
                                    {/* Left Side: Image and Details */}
                                    <div className="lg:col-span-2">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-bold text-gray-800">{field.fieldName}</h2>
                                                <div className="flex gap-2 items-center text-sm text-gray-500">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{field.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                                <span>Taille: {field.size}</span>
                                                <span>Modifié: {field.lastUpdated}</span>
                                            </div>
                                        </div>
                                        <img src={field.image} alt={field.fieldName} className="object-cover w-full h-48 lg:h-full lg:min-h-[300px]" />
                                    </div>

                                    {/* Right Side: Recommendations */}
                                    <div className="p-6 lg:col-span-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <RecommendationCard title="Urée" value={field.recommendations.urea} />
                                            <RecommendationCard title="Nitrate de Potassium" value={field.recommendations.potassiumNitrate} />
                                            <RecommendationCard title="Sulfate de Zinc" value={field.recommendations.zincSulfate} />
                                            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/70">
                                                <p className="text-sm text-blue-800">Niveau de pH actuel</p>
                                                <p className="text-4xl font-bold text-blue-900">{field.recommendations.ph}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 mt-6 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <div className="flex gap-3 items-center mb-2 font-semibold text-yellow-800">
                                                <Info className="w-5 h-5" />
                                                <span>Remarques importantes</span>
                                            </div>
                                            <ul className="pl-5 space-y-1 list-disc text-yellow-700">
                                                {field.notes.map((note, idx) => <li key={idx}>{note}</li>)}
                                            </ul>
                                        </div>

                                        <button className="flex gap-2 justify-center items-center px-6 py-3 mt-6 w-full font-semibold text-white bg-green-600 rounded-full shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg">
                                            <Download className="w-5 h-5" />
                                                Télécharger le rapport complet
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FertilizerRecommendation;