import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit, 
  X, 
  Menu, 
  MapPin, 
  Sprout, 
  Wheat, 
  Globe, 
  Search, 
  Cloud, 
  Bug 
} from "lucide-react";
import Sidebar from "./Sidebar";
import EditLocation from "./Editlocation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth0();
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    fieldsOwned: 0,
    cropsPlanted: 0,
    environmentalImpact: 0,
    cropAnalyses: 0,
    diseaseDetections: 0,
    weatherReports: 0,
    location: "Kolkata",
  });

  const chartData = [
    { month: 'Jan', yield: 65 }, { month: 'Feb', yield: 75 }, { month: 'Mar', yield: 85 },
    { month: 'Apr', yield: 95 }, { month: 'May', yield: 100 }, { month: 'Jun', yield: 90 },
  ];

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
      setUserData(prev => ({ ...prev, location: savedLocation }));
    }
  }, []);

  const handleLocationUpdate = (newLoc) => {
    setUserData(prev => ({ ...prev, location: newLoc }));
    setIsEditLocation(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          {isMobileMenuOpen ? <X/> : <Menu/>}
        </button>
      </div>
      <div className={`fixed inset-0 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:relative md:w-64`}>
        <Sidebar />
      </div>

      <main className="flex-grow p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <motion.h1 
            className="mb-8 text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Tableau de bord
          </motion.h1>

          <motion.div
            className="overflow-hidden relative p-6 mb-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-gray-200 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col gap-6 items-center sm:flex-row">
              <img
                src={user?.picture || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <div className="flex gap-2 justify-center items-center mt-2 text-gray-600 sm:justify-start">
                  <MapPin size={16} />
                  <span>{userData.location}</span>
                  <button onClick={() => setIsEditLocation(!isEditLocation)} className="text-green-600 hover:text-green-800">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isEditLocation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <EditLocation onLocationUpdate={handleLocationUpdate} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
          >
            <StatCard title="Parcelles possédées" value={userData.fieldsOwned} Icon={Sprout} color="green" />
            <StatCard title="Cultures plantées" value={userData.cropsPlanted} Icon={Wheat} color="amber" />
            <StatCard title="Impact environnemental" value={`${userData.environmentalImpact}%`} Icon={Globe} color="blue" />
            <StatCard title="Analyses de cultures" value={userData.cropAnalyses} Icon={Search} color="purple" />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
            <motion.div 
              className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Progression du rendement (kg/ha)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip cursor={{ fill: 'rgba(236, 253, 245, 0.5)' }} contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                    <Bar dataKey="yield" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="space-y-8">
              <InfoCard title="Météo récente" value={`${userData.weatherReports} rapports`} Icon={Cloud} color="sky" />
              <InfoCard title="Détection des maladies" value={`${userData.diseaseDetections} cas`} Icon={Bug} color="red" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, Icon, color }) => {
  const colors = {
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return(
  <motion.div 
    className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
  >
    <div className="flex justify-between items-center">
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  </motion.div>
)};

const InfoCard = ({ title, value, Icon, color }) => {
    const colors = {
        sky: "bg-sky-100 text-sky-600",
        red: "bg-red-100 text-red-600",
    };
    return (
    <motion.div 
        className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
    >
        <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-700">{title}</h4>
            <div className={`p-2 rounded-lg ${colors[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </motion.div>
)};

export default Dashboard;