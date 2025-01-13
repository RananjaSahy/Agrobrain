import React from "react";
import image from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-30 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-lg font-bold text-white">
              <img src={image} alt="Logo" className="h-20 w-auto" />
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-white hover:text-black transition duration-150"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white hover:text-black transition duration-150"
            >
              About
            </a>
            <a
              href="/services"
              className="text-white hover:text-black transition duration-150"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-white hover:text-black transition duration-150"
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-black focus:ring-2 focus:ring-white">
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
      </div>
    </nav>
  );
};

export default Navbar;
