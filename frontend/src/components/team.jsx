import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Progya",
    role: "Full Stack Developer",
    image: "/i1.jpg",
    linkedin: "https://www.linkedin.com/in/progya-bhattacharjee-427149298",
    github: "https://github.com/ProgyaBhattachrjee",
    email: "mailto:progya56@gmail.com",
  },
  {
    name: "Debjyoti",
    role: "DevOps | Fullstack Developer | Cloud Engineer",
    image: "/i4.png",
    linkedin: "https://www.linkedin.com/in/debjyotishit/",
    github: "https://github.com/Debjyoti2004",
    email: "mailto:debjyotishit27@gmail.com",
},
  {
    name: "Sujoy",
    role: "ML engineer",
    image: "/i2.jpg",
    linkedin: "https://www.linkedin.com/in/dutta-sujoy",
    github: "https://github.com/dutta-sujoy",
    email: "mailto:duttasujoy1415@gmail.com",
  },
  {
    name: "Sagnik",
    role: "ML engineer",
    image: "/i3.jpg",
    linkedin: "https://www.linkedin.com/in/sagnik-mitra10",
    github: "https://github.com/iamsagnik",
    email: "mailto:sagnikmitra008@gmail.com",
  },
];

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newRotation = (scrollPosition % 360) * 0.5;
      setRotation(newRotation);
    };

    const handleVisibility = () => {
      const element = document.getElementById('team-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleVisibility);
    handleVisibility(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleVisibility);
    };
  }, []);

  return (
    <div id="team-section" className="relative py-20 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute w-full h-full bg-[url('/grid.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-100 to-transparent rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Meet Our <span className="text-green-700">Team</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Dedicated professionals working together to bring innovation and excellence to every project.
          </p>
        </div>
        <div className="flex relative justify-center items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative w-[600px] h-[600px] mx-auto">
              {teamMembers.map((member, index) => {
                const angle = ((360 / teamMembers.length) * index + rotation) * (Math.PI / 180);
                const radius = 250;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${300 + x}px`,
                      top: `${300 + y}px`,
                      zIndex: hoveredMember === index ? 50 : 1,
                    }}
                    onMouseEnter={() => setHoveredMember(index)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className={`group relative transition-all duration-300 ${
                      hoveredMember === index ? 'scale-110' : 'scale-100'
                    }`}>
                      <div className="overflow-hidden w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:border-green-400">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      {hoveredMember === index && (
                        <div className="absolute -bottom-24 left-1/2 p-4 w-64 text-center bg-white rounded-xl shadow-2xl transform -translate-x-1/2">
                          <h3 className="mb-1 text-xl font-bold text-gray-800">{member.name}</h3>
                          <p className="mb-3 text-sm text-gray-600">{member.role}</p>
                          <div className="flex justify-center space-x-4">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 transition-colors hover:text-blue-600"
                            >
                              <FaLinkedin size={24} />
                            </a>
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 transition-colors hover:text-gray-900"
                            >
                              <FaGithub size={24} />
                            </a>
                            <a
                              href={member.email}
                              className="text-red-500 transition-colors hover:text-red-600"
                            >
                              <FaEnvelope size={24} />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="absolute top-1/2 left-1/2 z-10 text-center transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-center items-center w-48 h-48 bg-white rounded-full shadow-lg">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-green-700">Our Team</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;