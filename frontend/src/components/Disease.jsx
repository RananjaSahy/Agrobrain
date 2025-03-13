import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ArrowLeft, Camera, Crop } from "react-feather";
import LoadingComponent from "./Loding";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const DiseasePredictor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [cureSteps, setCureSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Open Camera
  const openCamera = async () => {
    setIsCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // Capture Image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to File
    canvas.toBlob((blob) => {
      const file = new File([blob], "captured-image.png", { type: "image/png" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      setSelectedImage(URL.createObjectURL(file));
    });

    // Stop Webcam
    video.srcObject.getTracks().forEach((track) => track.stop());
    setIsCameraOpen(false);
  };

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setPrediction("");
      setCureSteps([]);
    }
  };

  // Predict Disease
  const predictDisease = async () => {
    if (!fileInputRef.current.files.length) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    setPrediction("Predicting...");
    setCureSteps([]);

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    try {
      const response = await fetch("https://sujoy0011-plant-disease-api.hf.space/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Prediction failed");
      const data = await response.json();

      // Extract disease and cure steps
      setPrediction(`Disease: ${data.predicted_disease}`);
      const formattedSteps = data.cure_steps.split("\n").filter(step => step.trim()).map((step) => step.replace(/^\d+\.\s*/, ""));
      setCureSteps(formattedSteps);
    } catch (error) {
      setPrediction("Error: Unable to get prediction");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-green-100 shadow-md w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Crop className="text-green-700 w-8 h-8" />
          <h1 className="text-2xl font-bold text-green-700">Plant Disease Predictor</h1>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </nav>

      <div className="flex gap-5 items-center justify-center min-h-screen bg-gray-300 px-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center mt-5">
          {selectedImage && (
            <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded-md shadow-md mb-4" />
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-700 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-500 file:text-white cursor-pointer"
          />

          {/* Mobile Camera Capture */}
          <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" id="cameraInput" />
          <label
            htmlFor="cameraInput"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all cursor-pointer mt-2"
          >
            Capture from Mobile Camera
          </label>

          {/* Laptop Webcam Capture */}
          {!isCameraOpen ? (
            <button
              onClick={openCamera}
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all cursor-pointer mt-2 mb-5"
            >
              <Camera className="w-5 h-5 inline" /> Open Webcam
            </button>
          ) : (
            <div className="mt-4">
              <video ref={videoRef} autoPlay className="w-full rounded-md shadow-md" />
              <button
                onClick={captureImage}
                className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all cursor-pointer mt-2"
              >
                Capture Image
              </button>
            </div>
          )}

          <button
            onClick={predictDisease}
            className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md transition-all"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>

          {prediction && <div className="mt-4 text-lg font-semibold text-gray-800">{prediction}</div>}
        </div>

        {/* Cure Steps Section */}
        {loading ? <LoadingComponent /> : cureSteps.length > 0 && (
          <div className="mt-4 w-full text-left">
            <h2 className="text-lg font-bold text-green-700 mb-2">Treatment Steps</h2>
            {cureSteps.map((step, index) => (
              <div key={index} className="bg-white shadow-md p-3 mb-2 rounded-md border-l-4 border-green-500">
                <span className="font-semibold text-green-600">Step {index + 1}:</span> {step}
              </div>
            ))}
            <h2 className="text-lg font-bold text-red-600 mt-4">Precautions</h2>
            <div className="bg-gray-100 shadow-md p-3 rounded-md border-l-4 border-red-500 mb-10">
              Ensure proper soil drainage, avoid overhead watering, remove infected leaves immediately, and use disease-resistant plant varieties.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DiseasePredictor;
