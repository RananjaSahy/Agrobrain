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
      <h2 className="mb-6 text-5xl font-bold text-center text-white text-shadow">
        Our Services
      </h2>
      <p className="mb-10 text-center text-gray-600">
        At AgroBrain, we combine the power of AI and innovation to bring valuable services
        that transform traditional farming into smart farming.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="overflow-hidden relative bg-white rounded-lg shadow-md transition-shadow duration-300 group hover:shadow-xl"
          >
            <img
              src={service.image}
              alt={service.title}
              className="object-cover w-full h-56"
            />
            <div className="flex absolute inset-0 justify-center items-center p-4 text-white bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-sm">{service.description}</p>
            </div>
            <h3 className="p-4 text-xl font-bold text-center">{service.title}</h3>
          </div>
        ))}
      </div>
      <div className="absolute top-4 right-4">
  <FaSeedling className="text-8xl text-white" />
</div>
    </div>
  );
};

export default Services;