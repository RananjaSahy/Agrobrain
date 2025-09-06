import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Leaf, LayoutDashboard, LogOut } from "lucide-react";

const navItems = [
    { name: "Accueil", id: "home", path: "/" },
    // { name: "About", id: "about", path: "/#about" },
    { name: "Services", id: "services", path: "/#services" },
    // { name: "Contact", id: "contact", path: "/#contact" },
    { name: "Actualités", id: "news", path: "/#news" }
];

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollTo = (id) => {
    if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 backdrop-blur-sm bg-white/80">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">
              Agro<span className="text-green-600">Brain</span>
            </span>
          </Link>

          <div className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollTo(item.id)}
                className="relative text-base font-semibold text-gray-600 transition-colors duration-300 hover:text-green-600 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden items-center space-x-2 md:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex gap-2 items-center p-1 bg-gray-100 rounded-full transition-colors duration-200 hover:bg-gray-200"
                >
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div 
                      className="absolute right-0 py-2 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-xl origin-top-right"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex gap-2 items-center px-4 py-2 w-full text-gray-700 transition-colors hover:bg-gray-100">
                           <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <button
                          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                          className="flex gap-2 items-center px-4 py-2 w-full text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut size={18} /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => loginWithRedirect()}
                  className="px-5 py-2 text-sm font-semibold text-green-600 rounded-full transition-colors duration-300 hover:bg-green-50"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                  className="px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-full shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
                >
                  Commencer
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-600 rounded-lg hover:bg-gray-100">
              {menuOpen ? <X/> : <Menu/>}
            </button>
          </div>
        </div>

        <AnimatePresence>
            {menuOpen && (
                <motion.div 
                    className="md:hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="pt-2 pb-4 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => { handleScrollTo(item.id); setMenuOpen(false); }}
                                className="block px-4 py-3 w-full font-semibold text-left text-gray-700 rounded-lg hover:bg-gray-100"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;