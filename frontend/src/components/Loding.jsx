import { motion } from "framer-motion";

export default function LoadingComponent() {
  const dotAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#5DB996" }}
            variants={dotAnimation}
            initial="animate"
            animate="animate"
          />
        ))}
      </div>
    </div>
  );
}
