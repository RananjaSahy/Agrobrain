import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout,  user, isAuthenticated, isLoading, error } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
   console.log(isAuthenticated)
  const toggleMenu = () => setMenuOpen(!menuOpen);
  useEffect(() => {
    if (isAuthenticated && user) {
      const saveUserToDB = async () => {
        try {
          await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          });
        } catch (err) {
          console.error("Error saving user:", err);
        }
      };
      saveUserToDB();
    }
  }, [isAuthenticated, user]);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a onClick={() => navigate("/")} className="cursor-pointer">
              <img src={image} alt="Logo" className="h-20 w-auto" />
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
          <a
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-green-600 font-semibold transition duration-200"
              >Home
              </a>
            {["About", "Services", "Contact", "News"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-600 font-semibold transition duration-200"
              >
                {item}
              </a>
            ))}
            {isAuthenticated && (
              <a
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-green-600 font-semibold transition duration-200"
              >
                Dashboard
              </a>
            )}
          </div>
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={()=>navigate('/login')}
                  className="px-4 py-2 bg-[#118B50] text-white rounded-md hover:bg-green-700 transition-all duration-200"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:ring-2 focus:ring-green-600"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white p-4 shadow-lg rounded-lg">
            <div className="space-y-4 mt-4">
            <a
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-green-600 font-semibold transition duration-200"
              >Home
              </a>
              {[ "About", "Services", "Contact", "News"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-green-600 font-semibold transition duration-200"
                >
                  {item}
                </a>
              ))}
              {isAuthenticated ? (
                <>
                  <a
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/dashboard");
                    }}
                   className="block text-gray-700 hover:text-green-600 font-semibold transition duration-200"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout({ returnTo: window.location.origin });
                    }}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={()=>navigate('/login')}
                    className="w-full px-4 py-2 bg-[#118B50] text-white rounded-md hover:bg-green-700 transition-all duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={()=>navigate('/login')}
                    className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-200"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
