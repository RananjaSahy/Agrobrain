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
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6" id="about">
      <h2 className="text-3xl md:text-5xl font-bold text-teal-600 mb-8 text-center text-shadow">
        What are we capable of:
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`w-full sm:w-80 p-6 bg-white rounded-lg shadow-lg flex flex-col items-start transform transition-transform duration-500 ease-in-out`}
            animate={{
              scale: index === activeIndex ? 1 : 0.9,
            }}
          >
            <div className="text-teal-600 mb-4">{card.icon}</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-700">
              {card.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatAreWeCapableOf;
