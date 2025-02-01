import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import image from "../assets/logo.png";
export default function Sidebar() {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", route: "/" },
    { name: "Dashboard", route: "/dashboard" },
    { name: "Weather Details", route: "/weather" },
    { name: "Fields", route: "/fields" },
    { name: "Crop Recommendations", route: "/recommendations" },
    { name: "Crop Diseases Detection", route: "/diseases" },
    { name: "Fertilizer Recommendations", route: "/fertilizers" },
    { name: "Market", route: "/market" },
  ];

  return (
    <div className="w-full md:w-1/4 bg-green-200 p-5 flex flex-col gap-6 shadow-lg h-screen overflow-y-auto">
     <div className="flex-shrink-0">
                <a onClick={() => navigate("/")} className="cursor-pointer">
                  <img src={image} alt="Logo" className="h-40 w-auto" />
                </a>
              </div>

      {/* Menu */}
      <ul className="flex flex-col gap-10">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.route)}
            className="p-2 cursor-pointer font-semibold text-green-900 bg-green-200 hover:bg-green-400 hover:shadow-lg transition-all rounded-md"
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button
        onClick={() => logout()}
        className="mt-auto p-2 text-red-600 font-semibold hover:bg-red-100 hover:shadow-md rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
