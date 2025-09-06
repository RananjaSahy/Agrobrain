import React from "react";
import { Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container px-6 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <h3 className="ml-2 text-2xl font-bold text-gray-800">AgroBrain</h3>
            </div>
            <p className="text-gray-600">
              Révolutionner l’agriculture grâce à l’IA et aux informations basées sur les données pour un avenir durable.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-blue-600"><Facebook /></a>
              <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-sky-500"><Twitter /></a>
              <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-pink-600"><Instagram /></a>
              <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-blue-700"><Linkedin /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <div className="mt-4 space-y-2">
              {/* <a href="#about" className="block text-gray-600 transition-colors duration-300 hover:text-green-600">About Us</a> */}
              <a href="#services" className="block text-gray-600 transition-colors duration-300 hover:text-green-600">Services</a>
              <a href="#news" className="block text-gray-600 transition-colors duration-300 hover:text-green-600">Actualités</a>
              {/* <a href="#contact" className="block text-gray-600 transition-colors duration-300 hover:text-green-600">Contact</a> */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800">Contactez-nous</h4>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>Antananarivo, Madagascar</p>
              <p>ETU001855, ETU00XXXX</p>
              <p>Email : sahyrananja2003@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800">Restez à jour</h4>
            <p className="mt-4 text-gray-600">
              Abonnez-vous à notre newsletter pour connaître les dernières technologies agricoles.
            </p>
            <div className="flex mt-4">
              <input 
                type="email" 
                placeholder="Ton adresse email" 
                className="px-4 py-2 w-full text-gray-700 bg-white rounded-l-md border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-4 text-white bg-green-600 rounded-r-md transition-colors duration-300 hover:bg-green-700">
                S’abonner
              </button>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        <div className="flex flex-col justify-between items-center text-center text-gray-500 sm:flex-row">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} AgroBrain. All Rights Reserved.
            </p>
            <p className="mt-4 text-sm sm:mt-0">
                {/* Built with ❤️ by <a href="https://github.com/Debjyoti2004" target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 transition-colors hover:underline">Debjyoti</a> */}
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;