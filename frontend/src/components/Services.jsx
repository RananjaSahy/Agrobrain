import React from "react";
import { FaSeedling} from "react-icons/fa";
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

const Services = () => {
  return (
    <div className="bg-[#5DB996] py-12 px-6 relative" id="services">
      <h2 className="text-5xl font-bold text-white text-center mb-6 text-shadow">
        Our Services
      </h2>
      <p className="text-center text-gray-600 mb-10">
        At AgroBrain, we combine the power of AI and innovation to bring valuable services
        that transform traditional farming into smart farming.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="h-56 w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
              <p className="text-sm">{service.description}</p>
            </div>
            <h3 className="text-center font-bold text-xl p-4">{service.title}</h3>
          </div>
        ))}
      </div>
      <div className="absolute top-4 right-4">
  <FaSeedling className="text-white text-8xl" />
</div>
    </div>
  );
};

export default Services;
