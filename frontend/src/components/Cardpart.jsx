import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaBookOpen, FaLeaf } from "react-icons/fa";


import Revolutionize_Farming_with_AI from "../../public/ai-in-agriculture.webp";
import Educate_and_Inform_Farmers from "../../public/Objectives-of-Adult-Education-in-Agriculture.jpg";
import Foster_Sustainable_Agriculture from "../../public/Foster_Sustainable_Agriculture.jpg";

const capabilities = [
  {
    title: "Revolutionize Farming with AI",
    description: "Empower farmers with cutting-edge ML models for soil, crop, and weather analysis. We make precision farming accessible and efficient for everyone.",
    icon: <FaRobot className="w-8 h-8" />,
    image: Revolutionize_Farming_with_AI,
  },
  {
    title: "Educate and Inform Farmers",
    description: "Provide farmers with the knowledge and tools they need to optimize their practices and increase productivity.",
    icon: <FaBookOpen className="w-8 h-8" />,
    image: Educate_and_Inform_Farmers,
  },
  {
    title: "Foster Sustainable Agriculture",
    description: "Encourage eco-friendly farming techniques that protect the environment and ensure long-term agricultural sustainability.",
    icon: <FaLeaf className="w-8 h-8" />,
    image: Foster_Sustainable_Agriculture,
  },
];

const WhatAreWeCapableOf = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-24 bg-white" id="about">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
            What We're <span className="text-green-600">Capable Of</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            We're building the future of agriculture by combining advanced technology with a commitment to sustainability and education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div 
            className="flex flex-col space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            {capabilities.map((card, index) => (
              <div
                key={index}
                className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white border-green-500 shadow-2xl scale-105"
                    : "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-lg"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex items-start space-x-5">
                  <div className={`flex-shrink-0 p-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="relative w-full h-80 lg:h-full">
            <AnimatePresence>
              <motion.img
                key={activeIndex}
                src={capabilities[activeIndex].image}
                alt={capabilities[activeIndex].title}
                className="object-cover absolute w-full h-full rounded-xl shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAreWeCapableOf;