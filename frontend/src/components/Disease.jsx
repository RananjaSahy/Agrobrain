import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ArrowLeft, UploadCloud, Camera, Video, AlertTriangle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const predictApiCall = async (file) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    predicted_disease: "Tomato Late Blight",
    cure_steps: "1. Remove and destroy infected plants.\n2. Apply a copper-based fungicide.\n3. Ensure good air circulation around plants.\n4. Water at the base of the plant to keep foliage dry."
  };
  
   /*
   const formData = new FormData();
   formData.append("file", file);
   const response = await fetch("https:sujoy0011-plant-disease-api.hf.space/predict", {
     method: "POST",
     body: formData,
   });
   if (!response.ok) throw new Error("Prediction failed");
   return await response.json();
   */
};


const DiseasePredictor = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [cureSteps, setCureSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction(null);
      setCureSteps([]);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!imageFile) {
      setError("Veuillez d'abord sélectionner une image.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await predictApiCall(imageFile);
      setPrediction(data.predicted_disease);
      const formattedSteps = data.cure_steps.split("\n").filter(step => step.trim()).map(step => step.replace(/^\d+\.\s*/, ""));
      setCureSteps(formattedSteps);
    } catch (err) {
      setError("Impossible d'obtenir une prédiction. Veuillez essayer une autre image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const openCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraOpen(true);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }, 100);
    } catch (err) {
        console.error("Accès à la caméra refusé :", err);
        setError("L'accès à la caméra a été refusé. Veuillez l'activer dans les paramètres de votre navigateur.");
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(blob => handleFileChange(new File([blob], "capture.png", { type: "image/png" })));
    video.srcObject.getTracks().forEach(track => track.stop());
    setIsCameraOpen(false);
  };
  
  const resetState = () => {
      setImageFile(null);
      setImagePreview(null);
      setPrediction(null);
      setCureSteps([]);
      setError(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">Prédicteur de maladie</span>
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div 
            className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isCameraOpen ? (
                <motion.div key="camera-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="mb-4 text-xl font-bold text-center text-gray-800">Webcam View</h3>
                    <video ref={videoRef} autoPlay className="mb-4 w-full bg-gray-900 rounded-lg shadow-inner" />
                    <button onClick={captureImage} className="px-6 py-3 w-full font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                      Capturer une image
                    </button>
                </motion.div>
              ) : imagePreview ? (
                <motion.div key="preview-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="mb-4 text-xl font-bold text-center text-gray-800">Image Preview</h3>
                  <img src={imagePreview} alt="Selected plant" className="object-contain mb-4 w-full max-h-80 rounded-lg shadow-md" />
                  <div className="grid grid-cols-2 gap-4">
                      <button onClick={resetState} className="px-6 py-3 w-full font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                          Effacer l'image
                      </button>
                      <button onClick={handlePredict} disabled={loading} className="flex justify-center items-center px-6 py-3 w-full font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                        {loading ? <div className="w-5 h-5 rounded-full border-2 border-white animate-spin border-t-transparent" /> : 'Predict Disease'}
                      </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="upload-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="mb-4 text-xl font-bold text-center text-gray-800">Télécharger une image</h3>
                  <div 
                    className="flex flex-col justify-center items-center p-8 mb-4 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <UploadCloud className="mb-4 w-12 h-12 text-gray-400" />
                    <p className="font-semibold text-gray-700">Cliquez pour télécharger ou glisser-déposer</p>
                    <p className="text-sm text-gray-500">PNG, JPG, ou WEBP</p>
                  </div>
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])} className="hidden" />
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                  <button onClick={openCamera} className="flex gap-2 justify-center items-center px-6 py-3 w-full font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800">
                    <Video /> Use Webcam
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-800">Résultats de prédiction</h3>
            <AnimatePresence mode="wait">
            {loading ? (
                <motion.div key="loading" className="flex flex-col justify-center items-center h-full">
                    <div className="mb-4 w-12 h-12 text-green-600 rounded-full border-4 border-green-200 animate-spin border-t-green-600" />
                    <p className="font-semibold text-gray-600">Analyse de l'image...</p>
                </motion.div>
            ) : error ? (
                <motion.div key="error" className="flex flex-col justify-center items-center p-6 h-full text-center bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="mb-4 w-12 h-12 text-red-500" />
                    <h4 className="mb-2 text-lg font-bold text-red-700">L'analyse a échoué</h4>
                    <p className="text-red-600">{error}</p>
                </motion.div>
            ) : prediction ? (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="p-6 mb-6 bg-green-50 rounded-lg border border-green-200">
                        <p className="mb-1 text-sm font-semibold text-green-700">Maladie prédite</p>
                        <h4 className="text-2xl font-bold text-green-800">{prediction}</h4>
                    </div>
                    <div>
                        <h4 className="mb-4 text-xl font-bold text-gray-700">Étapes du traitement</h4>
                        <ul className="space-y-3">
                            {cureSteps.map((step, index) => (
                                <motion.li key={index} className="flex items-start" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                                    <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 font-bold text-white bg-green-600 rounded-full flex-center">{index + 1}</div>
                                    <span className="text-gray-600">{step}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ) : (
                <motion.div key="waiting" className="flex flex-col justify-center items-center h-full text-center text-gray-500">
                    <Sparkles className="mb-4 w-12 h-12 text-gray-300" />
                    <h4 className="text-lg font-semibold">Vos résultats apparaîtront ici.</h4>
                    <p>Téléchargez une image et cliquez sur « Prédire » pour commencer.</p>
                </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DiseasePredictor;