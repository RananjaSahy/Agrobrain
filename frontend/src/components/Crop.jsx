import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ArrowLeft, ChevronDown, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Régions de Madagascar (23 régions)
const states = [
  "Analamanga",
  "Vakinankaratra",
  "Itasy",
  "Bongolava",
  "Analanjirofo",
  "Alaotra-Mangoro",
  "Atsinanana",
  "Vatovavy",
  "Fitovinany",
  "Atsimo-Atsinanana",
  "Anosy",
  "Androy",
  "Atsimo-Andrefana",
  "Menabe",
  "Melaky",
  "Boeny",
  "Sofia",
  "Betsiboka",
  "Diana",
  "Sava",
  "Amoron’i Mania",
  "Haute Matsiatra",
  "Ihorombe"
];

// Exemple de districts (il y en a 119, j’en mets quelques-uns)
const dist = [
  "Antananarivo I",
  "Antsirabe I",
  "Ambatondrazaka",
  "Fianarantsoa I",
  "Toamasina I",
  "Mahajanga I",
  "Antsiranana I",
  "Toliara I"
];

// Saisons agricoles/climatiques de Madagascar
const seasons = [
  "Saison des pluies",     // Novembre à avril
  "Saison sèche",          // Mai à octobre
  "Culture de contre-saison", // Riziculture irriguée, maraîchage
  "Toute l'année"          // Cultures permanentes (bananes, café, etc.)
];


const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
    <input
      type="number"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="px-3 py-2 w-full bg-gray-50 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, disabled }) => (
  <div>
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
    <div className="relative">
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="px-3 py-2 w-full text-gray-700 bg-gray-50 rounded-md border border-gray-300 shadow-sm appearance-none outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-200"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option.trim()}>{option.trim()}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);

const CropCardSkeleton = () => (
    <div className="overflow-hidden relative h-32 bg-gray-200 rounded-lg animate-pulse group"></div>
);

const CropRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    state: "Odisha",
    district: "",
    season: "Kharif",
    N: "90",
    P: "40",
    K: "30",
    temperature: "25",
    humidity: "70",
    ph: "6.5",
    rainfall: "200",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations([]); 
    setImages({});
    try {
      const response = await axios.post("https://sujoy0011-crop-recommendation.hf.space/predict", formData);
      setRecommendations(response.data.recommendations);
      
      const mockRecommendations = ["Rice", "Jute", "Coffee", "Maize"];
      setRecommendations(mockRecommendations);

    } catch (error) {
      console.error("Erreur lors de la récupération des recommandations :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recommendations.length > 0) {
      const fetchImages = async () => {
        setImageLoading(true);
        const fetchedImages = {};
        for (const crop of recommendations) {
          try {
            const response = await axios.get("https://api.unsplash.com/search/photos", {
                params: { query: `${crop} plant field`, client_id: 'mFG31wnhGo0nAcunuKOPzQ1DFlO_vplI6jgB5XDUseE', per_page: 1 }
            });
            fetchedImages[crop] = data.results.length > 0 ? data.results[0].urls.regular : '/Objectives-of-Adult-Education-in-Agriculture.jpg';
          } catch (error) {
            console.error(`Erreur lors de la récupération de l'image pour ${crop}:`, error);
            fetchedImages[crop] = '/Objectives-of-Adult-Education-in-Agriculture.jpg';
          }
        }
        setImages(fetchedImages);
        setImageLoading(false);
      };
      fetchImages();
    }
  }, [recommendations]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">Recommandation de culture</span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour
            </button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg lg:col-span-1">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Détails de l'emplacement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <SelectField label="État" name="state" value={formData.state} onChange={handleChange} options={states} />
              <SelectField label="District" name="district" value={formData.district} onChange={handleChange} options={dist} disabled={!formData.state} />
              <SelectField label="Saison" name="season" value={formData.season} onChange={handleChange} options={seasons} />
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField label="N (kg/ha)" name="N" value={formData.N} onChange={handleChange} />
                <InputField label="P (kg/ha)" name="P" value={formData.P} onChange={handleChange} />
                <InputField label="K (kg/ha)" name="K" value={formData.K} onChange={handleChange} />
                <InputField label="pH" name="ph" value={formData.ph} onChange={handleChange} />
              </div>
              
              <InputField label="Température (°C)" name="temperature" value={formData.temperature} onChange={handleChange} />
              <InputField label="Humidité (%)" name="humidity" value={formData.humidity} onChange={handleChange} />
              <InputField label="Précipitations (mm)" name="rainfall" value={formData.rainfall} onChange={handleChange} />
              
              <button type="submit" disabled={loading} className="flex justify-center items-center px-6 py-3 mt-4 w-full font-semibold text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg disabled:bg-gray-400">
                {loading ? <Loader className="animate-spin" /> : "Obtenir une recommandation"}
              </button>
            </form>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg lg:col-span-2">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Cultures recommandées</h2>
            <AnimatePresence>
              {recommendations.length > 0 ? (
                <motion.div className="space-y-4">
                  {(imageLoading ? [...Array(4)] : recommendations).map((crop, index) =>
                    imageLoading ? <CropCardSkeleton key={index} /> : (
                    <motion.div
                      key={crop}
                      className="overflow-hidden relative rounded-lg group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img src={images[crop]} alt={crop} className="object-cover w-full h-32" />
                      <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/60 via-black/20"></div>
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold tracking-wide text-white capitalize">{crop}</h3>
                    </motion.div>
                    )
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center text-gray-500">
                  <Leaf size={48} className="mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold">Vos recommandations de cultures apparaîtront ici.</h3>
                  <p>Remplissez le formulaire pour commencer.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CropRecommendation;