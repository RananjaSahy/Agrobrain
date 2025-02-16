import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, X, ChevronDown, User, Leaf } from "lucide-react";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();



  const handleNavClick = (id) => {
    if (id === 'home') {
      navigate('/');
      return;
    }
    

    setTimeout(() => {
      const element = document.getElementById(id.toLowerCase());
      if (!element) {
        console.log(`Element with id "${id.toLowerCase()}" not found`); 
        return;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
    { name: "News", id: "news" }
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 shadow-lg backdrop-blur-md transition-all duration-300 bg-white/95">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="p-2 bg-gradient-to-r from-green-700 to-green-600 rounded-lg shadow-sm">
              <Leaf className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-800 font-inter">
              <span className="text-green-700">Agro</span>Brain
            </span>
          </div>

          <div className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                className="relative px-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:text-green-700 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-green-700 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
              </button>
            ))}
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center p-1.5 space-x-2 transition-all duration-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-center items-center w-10 h-10 rounded-full border-2 border-green-100">
                    {user?.picture ? (
                      <img src={user.picture} alt="profile" className="rounded-full" />
                    ) : (
                      <User className="text-green-700" size={20} />
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 py-2 mt-2 w-48 bg-white rounded-lg ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="block w-full px-4 py-2.5 text-sm text-left text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="block w-full px-4 py-2.5 text-sm text-left text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 text-sm font-medium text-green-700 transition-all duration-300 rounded-lg hover:bg-green-50 hover:shadow-sm"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 bg-green-700 rounded-lg hover:bg-green-800 hover:shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-50"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="pb-4 md:hidden">
            <div className="pt-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.id);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-3 w-full text-left text-gray-700 rounded-lg hover:bg-green-50"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-4 pt-4 space-y-4 border-t">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full px-4 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => logout({ returnTo: window.location.origin })}
                      className="w-full px-4 py-2.5 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full px-4 py-2.5 text-sm font-medium text-center text-green-700 bg-white border border-green-700 rounded-lg hover:bg-green-50"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full px-4 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800"
                    >
                      Start Free Trial
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;