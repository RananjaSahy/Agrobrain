import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiX, FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import EditLocation from "./Editlocation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [Edit, setEdit] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    fieldsOwned: 0,
    cropsPlanted: 0,
    environmentalImpact: 0,
    cropAnalyses: 0,
    diseaseDetections: 0,
    weatherReports: 0,
    location: "Fetching location...",
  });

  const chartData = [
    { month: 'Jan', yield: 65 },
    { month: 'Feb', yield: 75 },
    { month: 'Mar', yield: 85 },
    { month: 'Apr', yield: 95 },
    { month: 'May', yield: 100 },
    { month: 'Jun', yield: 90 },
  ];

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
      setUserData(prev => ({ ...prev, location: savedLocation }));
    }
  }, []);

  const handleLocationUpdate = (newLoc) => {
    setUserData(prev => ({ ...prev, location: newLoc }));
    setEdit(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:flex-row">
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          <FiMenu className="text-2xl" />
        </button>
      </div>

      
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>

    
      <motion.div 
        className="flex-grow p-4 w-full sm:p-6 md:p-8 md:ml-72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800 md:mb-8 md:text-3xl">Farm Dashboard</h2>

        
          <motion.div
            className="overflow-hidden relative mb-6 bg-white rounded-xl shadow-lg md:mb-8 md:rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="relative h-24 md:h-32 bg-green-500/20">
              <div className="absolute left-4 -bottom-10 md:left-6 md:-bottom-12">
                <img
                  src={user?.picture || "/default-profile.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg md:w-24 md:h-24"
                />
              </div>
            </div>
            <div className="px-4 pt-12 pb-4 md:px-6 md:pt-16 md:pb-6">
              <div className="flex flex-col gap-4 justify-between items-start sm:flex-row">
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-800 md:text-2xl">{user?.name}</h3>
                  <div className="flex flex-wrap gap-2 items-center mt-2">
                    <span className="text-sm text-gray-600 md:text-base">📍 {userData.location}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setEdit(!Edit)}
                      className="text-green-600 hover:text-green-700"
                    >
                      {Edit ? <FiX size={18} /> : <FiEdit size={18} />}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {Edit && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 w-full sm:w-auto"
                      >
                        <EditLocation onLocationUpdate={handleLocationUpdate} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mb-8">
            <StatCard 
              title="Fields Owned" 
              value={userData.fieldsOwned} 
              icon="🌱" 
              color="bg-green-100" 
            />
            <StatCard 
              title="Crops Planted" 
              value={userData.cropsPlanted} 
              icon="🌾" 
              color="bg-amber-100" 
            />
            <StatCard 
              title="Environmental Impact" 
              value={`${userData.environmentalImpact}%`} 
              icon="🌍" 
              color="bg-blue-100" 
            />
            <StatCard 
              title="Crop Analyses" 
              value={userData.cropAnalyses} 
              icon="🔍" 
              color="bg-purple-100" 
            />
          </div>

       
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
            <motion.div 
              className="p-4 bg-white rounded-xl shadow-lg md:p-6 md:rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="mb-4 text-lg font-semibold md:text-xl">Yield Progress</h3>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="yield" 
                      fill="#5DB996" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <InfoCard 
                title="Recent Weather"
                value={`${userData.weatherReports} reports`}
                progress={60}
              />
              <InfoCard 
                title="Disease Detection"
                value={`${userData.diseaseDetections} cases`}
                progress={userData.diseaseDetections}
                color="bg-red-100"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    className={`p-4 rounded-xl shadow-md transition-shadow md:p-6 md:rounded-2xl ${color} hover:shadow-lg`}
    whileHover={{ y: -5 }}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xl font-bold text-gray-800 md:text-2xl">{value}</p>
        <p className="text-sm text-gray-600 md:text-base">{title}</p>
      </div>
      <span className="text-2xl md:text-3xl">{icon}</span>
    </div>
  </motion.div>
);

const InfoCard = ({ title, value, progress, color = "bg-green-100" }) => (
  <motion.div
    className="p-4 bg-white rounded-xl shadow-lg md:p-6 md:rounded-2xl"
    whileHover={{ scale: 1.02 }}
  >
    <h4 className="mb-2 text-sm font-semibold text-gray-800 md:text-base">{title}</h4>
    <p className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">{value}</p>
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div 
        className={`h-2 rounded-full transition-all duration-500 ${color}`} 
        style={{ width: `${progress}%` }}
      />
    </div>
  </motion.div>
);

export default Dashboard;