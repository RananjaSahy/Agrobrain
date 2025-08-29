import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "react-feather";

const HeroSection = () => {
  return (
    <div className="overflow-hidden relative w-full h-screen">
      
      <div className="absolute inset-0 z-0">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/video-poster.jpg" 
        >
          <source src="./../public/agrobrain.mp4" type="video/mp4" />
          <source src="./../public/agrobrain.mp4" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

   
      <div className="flex relative z-10 flex-col justify-center items-center h-full bg-black/25">
        
      

      </div>
    </div>
  );
};

export default HeroSection;
