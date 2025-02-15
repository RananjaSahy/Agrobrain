import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";
import EditLocation from "./Editlocation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [Edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    fieldsOwned: 0,
    cropsPlanted: 0,
    environmentalImpact: 0,
    cropAnalyses: 0,
    diseaseDetections: 0,
    weatherReports: 0,
    location: "Fetching location...",
  });

  // Sample chart data
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <motion.div 
        className="overflow-y-auto flex-grow p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto mr-20 max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">Farm Dashboard</h2>

          {/* Profile Section */}
          <motion.div
            className="overflow-hidden relative mb-8 bg-white rounded-2xl shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="relative h-32 bg-green-500/20">
              <div className="absolute left-6 -bottom-12">
                <img
                  src={user?.picture || "/default-profile.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>
            <div className="px-6 pt-16 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{user?.name}</h3>
                  <div className="flex gap-2 items-center mt-2">
                    <span className="text-gray-600">📍 {userData.location}</span>
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
                        className="mt-4"
                      >
                        <EditLocation onLocationUpdate={handleLocationUpdate} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3 lg:grid-cols-4">
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

          {/* Analytics Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div 
              className="p-6 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="mb-4 text-xl font-semibold">Yield Progress</h3>
              <div className="h-64">
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

            <div className="grid grid-cols-1 gap-6">
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
    className={`p-6 rounded-2xl shadow-md transition-shadow ${color} hover:shadow-lg`}
    whileHover={{ y: -5 }}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-gray-600">{title}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </motion.div>
);

const InfoCard = ({ title, value, progress, color = "bg-green-100" }) => (
  <motion.div
    className="p-6 bg-white rounded-2xl shadow-lg"
    whileHover={{ scale: 1.02 }}
  >
    <h4 className="mb-2 font-semibold text-gray-800">{title}</h4>
    <p className="mb-4 text-2xl font-bold text-gray-800">{value}</p>
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div 
        className={`h-2 rounded-full transition-all duration-500 ${color}`} 
        style={{ width: `${progress}%` }}
      />
    </div>
  </motion.div>
);

export default Dashboard;