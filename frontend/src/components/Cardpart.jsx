import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaBookOpen, FaLeaf } from "react-icons/fa";

const WhatAreWeCapableOf = () => {
  const cards = [
    {
      title: "Revolutionize Farming with AI",
      description:
        "Empower farmers through cutting-edge ML models for soil, crop, and weather analysis. We aim to make precision farming accessible and efficient for everyone.",
      icon: <FaRobot size={40} />,
    },
    {
      title: "Educate and Inform Farmers",
      description:
        "Provide farmers with the knowledge and tools they need to optimize their practices and increase productivity.",
      icon: <FaBookOpen size={40} />,
    },
    {
      title: "Foster Sustainable Agriculture",
      description:
        "Encourage eco-friendly farming techniques that protect the environment and ensure long-term agricultural sustainability.",
      icon: <FaLeaf size={40} />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="flex flex-col justify-center items-center p-8 bg-gray-100" id="about">
    <h2 className="p-4 mb-12 text-5xl font-bold text-center text-green-700 rounded-md text-shadow">
      <span className="text-shadow-lg">What are we capable of:</span>
    </h2>

    <div className="flex flex-wrap gap-4 justify-center">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`flex flex-col items-start p-6 w-full bg-white rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform sm:w-80`}
          animate={{
            scale: index === activeIndex ? 1 : 0.9,
          }}
        >
         
          <div className="mb-4 text-teal-600">{card.icon}</div>

  
          <h3 className="mb-2 text-xl font-semibold text-teal-700">{card.title}</h3>
          <p className="text-sm text-gray-600 md:text-base">{card.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
  );
};

export default WhatAreWeCapableOf;
