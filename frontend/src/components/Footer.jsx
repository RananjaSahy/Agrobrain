import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#5DB996] text-white py-8 p-8">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-2xl font-bold">Agrobrain</h3>
          <p>&copy; 2025 Agrobrain. All Rights Reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-200"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-200"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
