import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Leaf } from "lucide-react"; 

const services = [
  {
    title: "Soil Analysis",
    description:
      "Detailed soil analysis to help farmers understand nutrient levels, pH, and soil health.",
    image: "/plant.jpg", 
  },
  {
    title: "Crop Analysis",
    description:
      "Insights into crop growth, yield predictions, and disease prevention using AI.",
    image: "/glass.jpg",
  },
  {
    title: "Agriculture Insights",
    description:
      "AI-driven insights for better decision-making in agriculture practices.",
    image: "/field.jpg",
  },
  {
    title: "Weather Forecasting",
    description:
      "Accurate weather predictions to optimize farming activities and schedules.",
    image: "/sun.jpg",
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
    scale: 0.95,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const floatingVariants = {
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-br from-[#3A9278] to-[#5DB996] py-20 px-6"
      id="services"
    >
      <div className="mx-auto max-w-7xl" ref={ref}>
        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block mb-4"
              >
                <Leaf className="w-12 h-12 text-white" strokeWidth={2} />
              </motion.div>
              <motion.h2
                className="mb-4 text-4xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Our Services
              </motion.h2>
              <motion.p
                className="mx-auto max-w-2xl text-lg text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Harnessing AI and Precision Analytics for Next-Gen Agricultural Solutions
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="relative group"
            >
              <div className="overflow-hidden bg-white rounded-xl border-2 border-transparent shadow-lg transition-all duration-300 hover:shadow-xl hover:border-emerald-500">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden relative h-48"
                >
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full transition-all duration-300"
                      onError={(e) => {
                        e.target.src = "/images/fallback-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-gray-200">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="flex absolute inset-0 justify-center items-center p-4 bg-black/50"
                  >
                    <motion.p
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                      className="text-sm text-center text-white"
                    >
                      {service.description}
                    </motion.p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="p-5 bg-gradient-to-b from-white to-gray-50"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <div className="mb-3 w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

       
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute left-8 top-1/4 opacity-20 mix-blend-overlay"
        >
          <Leaf className="text-[120px] text-white" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute right-8 bottom-16 opacity-20 mix-blend-overlay"
        >
          <Leaf className="text-[100px] text-white" strokeWidth={1.5} />
        </motion.div>
      </div>
    </div>
  );
};

export default Services;