import React, { useState } from "react";
import emailjs from "emailjs-com"; // Importing emailjs for sending emails
import { FaEnvelope } from "react-icons/fa"; // Email icon for decoration

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
      .then(
        (result) => {
          setStatus("Feedback sent successfully!");
          setLoading(false);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("An error occurred. Please try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between w-full max-w-4xl gap-6">
        {/* Feedback Form */}
        <div className="w-full md:w-1/2 p-6 bg-[#E3F0AF] rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#a3b18a] mb-4 text-center">
            Send Us Your Feedback
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50]"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50]"
              />
            </div>
            <div className="flex flex-col">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50]"
                rows="5"
              ></textarea>
            </div>

            {status && (
              <p className="font-semibold text-center text-[#588157]">{status}</p>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="w-full text-white bg-[#577602] p-3 rounded-lg hover:bg-[#0f7b42] transition duration-200"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Feedback"}
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="items-center justify-center hidden w-1/2 p-6 md:flex">
          <img
            src="/feedb.svg" 
            alt="Feedback"
            className="rounded-lg shadow-xl "
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
