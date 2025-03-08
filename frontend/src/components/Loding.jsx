import { motion } from "framer-motion";

export default function LoadingComponent() {
  const dotAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 0.6,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 rounded-full bg-green-500 opacity-80"
            variants={dotAnimation}
            initial="animate"
            animate="animate"
          />
        ))}
      </div>
    </div>
  );
}
