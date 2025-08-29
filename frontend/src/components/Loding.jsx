import React from 'react';
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const LoadingComponent = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const leafVariants = {
    start: {
      scale: 1,
      opacity: 0.5,
    },
    end: {
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  
  return (
    <div className="flex flex-col justify-center items-center py-20 w-full">
      <motion.div
        className="flex justify-center items-center"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        <motion.div variants={leafVariants}>
          <Leaf className="w-16 h-16 text-green-500" />
        </motion.div>
      </motion.div>
      <p className="mt-4 text-lg font-semibold text-gray-600">Loading Data...</p>
    </div>
  );
};

export default LoadingComponent;