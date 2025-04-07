import React, { useState } from 'react';
import Sidebar from './Sidebar';

const CropDiseaseDetection = () => {
  const [activeTab, setActiveTab] = useState('detection');

  const diseases = [
    {
      name: 'Blight',
      type: 'Fungal',
      probability: '40%',
      symptoms: 'Brown spots on leaves, wilting stems.',
      recovery: [
        'Apply copper-based fungicides.',
        'Remove and burn infected leaves.',
        'Improve drainage to avoid waterlogging.'
      ],
      // Keep using placeholder image
      image: '/api/placeholder/200/150'
    },
    {
      name: 'Rust',
      type: 'Fungal',
      probability: '25%',
      symptoms: 'Reddish-brown pustules on leaves.',
      recovery: [
        'Use rust-resistant crop varieties.',
        'Spray sulfur-based fungicides.',
        'Maintain proper spacing to improve airflow.'
      ],
      // Keep using placeholder image
      image: '/api/placeholder/200/150'
    },
    {
      name: 'Powdery Mildew',
      type: 'Fungal',
      probability: '30%',
      symptoms: 'White powdery spots on leaves and stems.',
      recovery: [
        'Apply potassium bicarbonate sprays.',
        'Increase air circulation around plants.',
        'Avoid overhead watering.'
      ],
      // Keep using placeholder image
      image: '/api/placeholder/200/150'
    },
    {
      name: 'Bacterial Spot',
      type: 'Bacterial',
      probability: '20%',
      symptoms: 'Water-soaked spots on leaves, fruits with scabby surface.',
      recovery: [
        'Apply copper-based bactericides.',
        'Practice crop rotation.',
        'Avoid working with wet plants.'
      ],
      // Keep using placeholder image
      image: '/api/placeholder/200/150'
    },
    {
      name: 'Mosaic Virus',
      type: 'Virus',
      probability: '15%',
      symptoms: 'Mottled pattern of yellow and green on leaves, stunted growth.',
      recovery: [
        'Remove and destroy infected plants.',
        'Control aphid populations.',
        'Use virus-resistant varieties when available.'
      ],
      // Keep using placeholder image
      image: '/api/placeholder/200/150'
    },
    {
      name: 'Nutrient Deficiency',
      type: 'Abiotic',
      probability: '35%',
      symptoms: 'Yellowing leaves, stunted growth, poor fruit development.',
      recovery: [
        'Conduct soil test to identify deficiencies.',
        'Apply appropriate fertilizers.',
        'Adjust soil pH if necessary.'
      ],
      // Keep using placeholder image
      image: '/api/placeholder/200/150'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
        <Sidebar></Sidebar>

      <header className="shadow-lg bg-gradient-to-r pl-80">
        <div className="container p-6 mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 lg:text-4xl">Crop Disease Detection</h1>
          <p className="mt-2 text-slate-600">Advanced analytics for healthier crops and sustainable farming</p>
        </div>
      </header>


      <nav className="bg-white shadow-md pl-80">
        <div className="container px-4 mx-auto pl-80">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('detection')}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === 'detection' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-green-600'}`}
            >
              Disease Detection
            </button>
            <button 
              onClick={() => setActiveTab('statistics')}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === 'statistics' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-green-600'}`}
            >
              Statistics
            </button>
            <button 
              onClick={() => setActiveTab('library')}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === 'library' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-green-600'}`}
            >
              Disease Library
            </button>
          </div>
        </div>
      </nav>

      <main className="container px-4 py-8 mx-auto pl-80">
        {activeTab === 'detection' && (
          <div className="space-y-8">
            <section className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Upload Plant Image</h2>
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex flex-col items-center justify-center w-full p-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer sm:w-1/2 bg-gray-50 hover:bg-gray-100">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Drag and drop an image or click to browse</p>
                  <button className="px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700">Upload Image</button>
                </div>
                <div className="w-full sm:w-1/2">
                  <h3 className="mb-2 text-lg font-medium text-gray-700">How It Works</h3>
                  <ol className="space-y-2 text-gray-600 list-decimal list-inside">
                    <li>Upload a clear image of the affected plant part</li>
                    <li>Our AI analyzes symptoms and identifies potential diseases</li>
                    <li>Review diagnosis and recommended treatment options</li>
                    <li>Track crop health over time with our management tools</li>
                  </ol>
                </div>
              </div>
            </section>


            <section className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Detection Results</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {diseases.slice(0, 4).map((disease, index) => (
                  <div key={index} className="overflow-hidden transition-shadow border rounded-lg hover:shadow-md">
                    <div className="flex items-start">
                      <img src={disease.image} alt={disease.name} className="object-cover w-24 h-24" />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-gray-800">{disease.name}</h3>
                          <span className="px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">{disease.type}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">Probability: <span className="font-medium">{disease.probability}</span></p>
                        <p className="mt-1 text-sm text-gray-600">Symptoms: {disease.symptoms}</p>
                      </div>
                    </div>
                    <div className="p-3 border-t bg-gray-50">
                      <h4 className="mb-1 text-sm font-medium text-gray-700">Recovery Steps:</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        {disease.recovery.map((step, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-1 mt-0.5 text-green-500">•</span> {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Disease Statistics</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-lg font-medium text-gray-700">Types of Disease Recovered</h3>
                <div className="flex items-center justify-center aspect-square">
                  <img src="/api/placeholder/400/400" alt="Pie chart showing disease types" className="max-w-full" />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 mr-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Fungal (35%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 mr-2 bg-orange-400 rounded-full"></span>
                    <span className="text-sm text-gray-600">Bacterial (6%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 mr-2 bg-gray-400 rounded-full"></span>
                    <span className="text-sm text-gray-600">Virus (11%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 mr-2 bg-yellow-300 rounded-full"></span>
                    <span className="text-sm text-gray-600">Abiotic (19%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 mr-2 bg-blue-300 rounded-full"></span>
                    <span className="text-sm text-gray-600">Insects (6%)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">No pathogen (23%)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-lg font-medium text-gray-700">Detection Accuracy Trends</h3>
                <div className="flex items-center justify-center aspect-square">
                  <img src="/api/placeholder/400/400" alt="Line chart showing accuracy trends" className="max-w-full" />
                </div>
                <p className="mt-4 text-sm text-gray-600">Our detection system shows continuous improvement, with accuracy rates increasing from 78% to 94% over the past year.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-lg font-medium text-gray-700">Seasonal Disease Prevalence</h3>
                <div className="flex items-center justify-center aspect-square">
                  <img src="/api/placeholder/400/400" alt="Bar chart showing seasonal disease prevalence" className="max-w-full" />
                </div>
                <p className="mt-4 text-sm text-gray-600">Fungal diseases peak during humid summer months, while viral infections show less seasonal variation.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-lg font-medium text-gray-700">Geographic Distribution</h3>
                <div className="flex items-center justify-center aspect-square">
                  <img src="/api/placeholder/400/400" alt="Map showing disease distribution" className="max-w-full" />
                </div>
                <p className="mt-4 text-sm text-gray-600">Regional analysis shows distinct patterns of crop diseases across different climate zones.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'library' && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Disease Library</h2>
            
            <div className="mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  placeholder="Search for diseases..."
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {diseases.map((disease, index) => (
                <div key={index} className="overflow-hidden transition-shadow border rounded-lg hover:shadow-md">
                  <img src={disease.image} alt={disease.name} className="object-cover w-full h-40" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{disease.name}</h3>
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{disease.type}</span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">Symptoms: {disease.symptoms}</p>
                    <h4 className="mb-1 text-sm font-medium text-gray-700">Recovery Steps:</h4>
                    <ul className="mb-3 space-y-1 text-xs text-gray-600">
                      {disease.recovery.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-1 mt-0.5 text-green-500">•</span> {step}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-2 text-sm text-white transition-colors bg-green-600 rounded-md hover:bg-green-700">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CropDiseaseDetection;