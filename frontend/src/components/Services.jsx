import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Leaf } from "lucide-react";

const services = [
  { title: "Crop-recommendation", description: "Understand nutrient levels, pH, and soil health.", image: "/plant.jpg" },
  { title: "Disease Predictor", description: "Yield predictions and disease prevention using AI.", image: "/glass.jpg" },
  { title: "Fertilizer Insights", description: "AI-driven insights for decision-making.", image: "/field.jpg", link: "https://huggingface.co/spaces/Nimbus10/FRS" }, // External Link
  { title: "Weather Forecasting", description: "Accurate weather predictions for farming.", image: "/sun.jpg", link: "http://cropsphere.onrender.com/" }, // External Link
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0, scale: 0.95 },
  onscreen: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#3A9278] to-[#5DB996] py-20 px-6" id="services">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <AnimatePresence>
          {isInView && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mb-4">
                <Leaf className="w-12 h-12 text-white" strokeWidth={2} />
              </motion.div>
              <motion.h2 className="mb-4 text-4xl font-bold text-white">Our Services</motion.h2>
              <motion.p className="mx-auto max-w-2xl text-lg text-white/90">
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
              className="relative cursor-pointer group"
              onClick={() => {
                if (service.link) {
                  window.open(service.link, "_blank"); // Open external links in a new tab
                } else {
                  navigate(`/services/${service.title.replace(/\s+/g, "-").toLowerCase()}`); // Navigate internally for other services
                }
              }}
            >
              <div className="overflow-hidden bg-white rounded-xl border-2 border-transparent shadow-lg transition-all duration-300 hover:shadow-xl hover:border-emerald-500">
                <motion.div whileHover={{ scale: 1.03 }} className="overflow-hidden relative h-48">
                  <img src={service.image} alt={service.title} className="object-cover w-full h-full transition-all duration-300" />
                </motion.div>
                <motion.div className="p-5 bg-gradient-to-b from-white to-gray-50" whileHover={{ y: -3 }}>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">{service.title}</h3>
                  <div className="mb-3 w-12 h-1 text-green-700 bg-gradient-to-r from-emerald-500 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
