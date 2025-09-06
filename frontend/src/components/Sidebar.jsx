import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";
import { 
  Home, 
  LayoutDashboard, 
  Cloud, 
  Map, 
  Activity,
  Stethoscope,
  TestTube,
  LogOut,
  Leaf
} from "lucide-react";

const menuItems = [
    { name: "Accueil", route: "/", icon: <Home size={20} /> },
    { name: "Tableau de bord", route: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Météo", route: "/weather", icon: <Cloud size={20} /> },
    { name: "Champs", route: "/Fields", icon: <Map size={20} /> },
    { name: "Recommendations de culture", route: "/CropRecommendations", icon: <Activity size={20} /> },
    { name: "Détection des maladies des cultures", route: "/diseases", icon: <Stethoscope size={20} /> },
    { name: "Recommandations d'engrais", route: "/fertilizers", icon: <TestTube size={20} /> },
];

const NavLink = ({ item }) => {
    const location = useLocation();
    const isActive = location.pathname === item.route;
    
    return (
        <li>
            <Link
              to={item.route}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </Link>
        </li>
    );
};

export default function Sidebar() {
  const { logout, user, isLoading } = useAuth0();
  
  return (
    <aside className="flex fixed flex-col p-4 w-64 h-screen bg-white border-r border-gray-200">
      <div className="flex gap-2 items-center px-4 mb-8">
        <Leaf className="w-8 h-8 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Agro<span className="text-green-600">Brain</span>
        </h1>
      </div>

      <div className="flex gap-3 items-center p-3 mb-6 bg-gray-50 rounded-xl border border-gray-200">
        {isLoading ? (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        ) : (
            <img 
                src={user?.picture} 
                alt={user?.name} 
                className="w-10 h-10 rounded-full" 
            />
        )}
        <div className="overflow-hidden">
            <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="flex items-center w-full gap-3 px-4 py-2.5 font-semibold text-red-500 rounded-lg transition-colors hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}