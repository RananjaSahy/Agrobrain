import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
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
  FiLogOut
} from "react-icons/fi";

export default function Sidebar() {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", route: "/", icon: <FiHome /> },
    { name: "Dashboard", route: "/dashboard", icon: <FiGrid /> },
    { name: "Weather Details", route: "/weather", icon: <FiCloud /> },
    { name: "Fields", route: "/Fields", icon: <FiMap /> },
    { name: "Crop Recommendations", route: "/recommendations", icon: <FiActivity /> },
    { name: "Crop Diseases Detection", route: "/diseases", icon: <FiAlertCircle /> },
    { name: "Fertilizer Recommendations", route: "/fertilizers", icon: <FiDroplet /> },
    { name: "Market", route: "/market", icon: <FiDollarSign /> },
  ];

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { x: -300 },
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300 }
    },
    closed: { opacity: 0, x: -50 },
  };

  return (
    <motion.div 
      className="w-72 bg-[#1a2e35] p-6 flex flex-col gap-6 h-screen overflow-y-auto fixed shadow-xl"
      initial="closed"
      animate="open"
      variants={sidebarVariants}
    >
      {/* Profile Section */}
      <motion.div
        className="flex gap-4 items-center p-4 rounded-lg bg-white/10"
        variants={itemVariants}
      >
        <div className="flex justify-center items-center w-12 h-12 bg-green-500 rounded-full">
          {user?.picture ? (
            <img src={user.picture} alt="profile" className="rounded-full" />
          ) : (
            <span className="text-xl text-white">🌱</span>
          )}
        </div>
        <div>
          <p className="font-medium text-white">{user?.name || "Guest"}</p>
          <p className="text-sm text-green-300">{user?.email}</p>
        </div>
      </motion.div>

      {/* Logo */}
      <motion.div
        className="flex justify-center mb-8"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
      >
      </motion.div>

      {/* Menu Items */}
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.name}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              x: 10,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            className="flex gap-3 items-center p-3 text-green-100 rounded-lg transition-all duration-200 cursor-pointer hover:bg-white/5"
            onClick={() => navigate(item.route)}
          >
            <span className="text-xl text-green-400">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </motion.li>
        ))}
      </ul>

      {/* Logout Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ 
          x: 10,
          backgroundColor: "rgba(239,68,68,0.1)"
        }}
        onClick={() => logout()}
        className="flex gap-3 items-center p-3 mt-auto font-medium text-red-400 rounded-lg transition-all duration-200 hover:bg-red-500/10"
      >
        <FiLogOut className="text-xl" />
        Logout
      </motion.button>
    </motion.div>
  );
}