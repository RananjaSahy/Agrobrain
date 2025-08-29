import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaLeaf, FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
          toast.success("🌱 Feedback successfully submitted! We'll respond within 24 hours");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          toast.error("⚠️ Failed to send feedback. Please try again later");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white" id="contact">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-block p-4 mb-4 bg-green-100 rounded-full"
          >
            <FaLeaf className="text-4xl text-green-700" />
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold font-playfair">
            <span className="text-gray-800">Cultivate</span>{" "}
            <span className="text-green-700">Connection</span>
          </h2>
          <p className="text-lg text-gray-600">
            Your insights help us grow better solutions for modern agriculture
          </p>
        </div>

        <div className="grid gap-10 items-center lg:grid-cols-2">
     
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="p-8 bg-white rounded-2xl border border-green-100 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
               
                <div className="relative">
                  <FaUser className="absolute top-4 left-4 text-green-600" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="py-3 pr-4 pl-12 w-full rounded-lg border border-green-200 transition-all outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

               
                <div className="relative">
                  <FaEnvelope className="absolute top-4 left-4 text-green-600" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="py-3 pr-4 pl-12 w-full rounded-lg border border-green-200 transition-all outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

         
                <div className="relative">
                  <FaCommentDots className="absolute top-4 left-4 text-green-600" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your agricultural insights..."
                    className="py-3 pr-4 pl-12 w-full h-40 rounded-lg border border-green-200 transition-all outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <span className="absolute bottom-2 right-3 text-sm text-gray-400">
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex gap-2 justify-center items-center px-6 py-4 w-full font-medium text-white bg-green-700 rounded-lg transition-colors hover:bg-green-800"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white animate-spin border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaLeaf className="text-lg" />
                    Submit Feedback
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="hidden lg:block relative bg-green-700 rounded-2xl overflow-hidden min-h-[500px]"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Farm Consultation"
              className="object-cover w-full h-full opacity-90"
            />
            <div className="absolute right-0 bottom-0 left-0 p-8 bg-gradient-to-t from-green-900/90">
              <h3 className="mb-3 text-2xl font-semibold text-white">
                Why Your Feedback Matters
              </h3>
              <p className="leading-relaxed text-green-100">
                At AgroTech, we believe in growing together. Your experiences shape our
                agricultural solutions, helping us develop smarter tools for sustainable
                farming and crop management.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </section>
  );
};

export default FeedbackForm;