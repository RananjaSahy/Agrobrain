import React, { useState } from "react";
import image from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-30 backdrop-blur shadow-md" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-lg font-bold text-white">
              <img src={image} alt="Logo" className="h-20 w-auto" />
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-black hover:text-white transition duration-150"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-black hover:text-white transition duration-150"
            >
              About
            </a>
            <a
              href="#services"
              className="text-black hover:text-white transition duration-150"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-black hover:text-white transition duration-150"
            >
              Contact
            </a>
            <a
              href="#news"
              className="text-black hover:text-white transition duration-150"
            >
              News
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-gray focus:ring-2 focus:ring-white"
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
                href="/"
                className="block text-black hover:text-white transition duration-150"
              >
                Home
              </a>
              <a
                href="#about"
                className="block text-black hover:text-white transition duration-150"
              >
                About
              </a>
              <a
                href="#services"
                className="block text-black hover:text-white transition duration-150"
              >
                Services
              </a>
              <a
                href="#contact"
                className="block text-black hover:text-white transition duration-150"
              >
                Contact
              </a>
              <a
                href="#news"
                className="block text-black hover:text-white transition duration-150"
              >
                News
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
