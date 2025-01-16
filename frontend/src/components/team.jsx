import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Progya",
    image: "/i4.jpg",
    linkedin: "https://www.linkedin.com/in/progya-bhattacharjee-427149298",
    github: "https://github.com/ProgyaBhattachrjee",
    email: "mailto:progya56@gmail.com",
  },
  {
    name: "Debjoyti",
    image: "/i1.jpg",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    email: "mailto:janesmith@example.com",
  },
  {
    name: "Sujoy",
    image: "/i2.jpg",
    linkedin: "https://www.linkedin.com/in/dutta-sujoy",
    github: "https://github.com/dutta-sujoy",
    email: "mailto:duttasujoy1415@gmail.com",
  },
  {
    name: "Sagnik",
    image: "/i3.jpg",
    linkedin: "https://linkedin.com/in/bobbrown",
    github: "https://www.linkedin.com/in/sagnik-mitra10",
    email: "mailto:sagnikmitra008@gmail.com",
  },
];

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 relative px-10">
      {/* Robot Illustration */}
      <div className="lg:mr-12 mb-6 lg:mb-0 relative flex flex-col items-center lg:mt-0 mt-6">
        <img
          src="/screen.png"
          alt="Screen Illustration"
          style={{ width: "600px", height: "300px", marginRight: "30px" }}
        />
        <img
          src="/robot.png"
          alt="Robot Illustration"
          style={{
            width: "400px",
            height: "400px",
            position: "absolute",
            top: "0",
          }}
        />
      </div>

      {/* Team Component */}
      <div className="relative w-96 h-96 sm:w-64 sm:h-64 rounded-full border-8 border-transparent bg-gray-50 flex items-center justify-center lg:mt-12 mt-6">
        {/* Big Circle with Blurred Border */}
        <div
          className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-[#5DB996] to-[#a3e1c4] opacity-50"
          style={{ filter: "blur(20px)" }}
        ></div>
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold text-black sm:text-2xl">Meet Our</h1>
          <h1 className="text-4xl font-bold text-[#5DB996] sm:text-2xl">
            Team
          </h1>
        </div>

        {teamMembers.map((member, index) => {
          const angle = (360 / teamMembers.length) * index;
          const radius = 200; // Distance from center
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          const isTop = y < 0; // If the circle is on the top
          const isSide = Math.abs(y) < 40; // Near horizontal

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              className="absolute transition-all duration-300"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Larger Circle */}
              <div
                className={`w-32 h-32 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border-4 border-white transition-transform duration-300 ${
                  hoveredMember === index ? "scale-100" : "scale-75"
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Hover Card */}
              {hoveredMember === index && (
                <div
                  className={`absolute ${
                    isTop
                      ? "top-full mt-1"
                      : isSide
                      ? "top-full mt-1"
                      : "bottom-full mb-1"
                  } left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg p-4 text-center`}
                  style={{ zIndex: 10 }}
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {member.name}
                  </h2>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-xl"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-gray-600 text-xl"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={member.email}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
