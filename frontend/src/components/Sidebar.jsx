import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiGrid, 
  FiCloud, 
  FiMap, 
  FiActivity,
  FiAlertCircle,
  FiDroplet,
  FiDollarSign,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", route: "/", icon: <FiHome /> },
    { name: "Dashboard", route: "/dashboard", icon: <FiGrid /> },
    { name: "Weather Details", route: "/weather", icon: <FiCloud /> },
    { name: "Fields", route: "/Fields", icon: <FiMap /> },
    { name: "Crop Recommendations", route: "/CropRecommendations", icon: <FiActivity /> },
    { name: "Crop Diseases Detection", route: "/diseases", icon: <FiAlertCircle /> },
    { name: "Fertilizer Recommendations", route: "/fertilizers", icon: <FiDroplet /> },
  ];

  const sidebarVariants = {
    initial: { 
      x: -100,
      opacity: 0
    },
    animate: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0,
      x: -20
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="w-72 bg-[#1a2e35] p-6 flex flex-col gap-6 h-screen overflow-y-auto fixed shadow-lg"
      initial="initial"
      animate="animate"
      variants={sidebarVariants}
    >
     
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 p-4 rounded-lg bg-white/10"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg">
          {user?.picture ? (
            <img src={user.picture} alt="profile" className="rounded-lg" />
          ) : (
            <span className="text-xl text-white">🌱</span>
          )}
        </div>
        <div>
          <p className="font-medium text-white">{user?.name || "Guest"}</p>
          <p className="text-sm text-green-300">{user?.email}</p>
        </div>
      </motion.div>

    
      <ul className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.name}
            variants={itemVariants}
            className={`flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-all duration-200
              ${location.pathname === item.route 
                ? 'bg-white/20 text-white' 
                : 'text-green-100 hover:bg-white/10'
              }`}
            onClick={() => navigate(item.route)}
            whileHover={{ x: 4 }}
            style={{ 
              transitionProperty: 'all',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'ease-out'
            }}
          >
            <span className={`text-xl ${
              location.pathname === item.route ? 'text-white' : 'text-green-400'
            }`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </motion.li>
        ))}
      </ul>

      
      <motion.button
        variants={itemVariants}
        whileHover={{ x: 4 }}
        onClick={() => logout()}
        className="flex items-center gap-3 p-3 mt-auto font-medium text-red-400 transition-all duration-200 rounded-lg hover:bg-red-500/10"
      >
        <FiLogOut className="text-xl" />
        Logout
      </motion.button>
    </motion.div>
  );
}