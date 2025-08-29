import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Leaf, User, Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs
      .sendForm(serviceId, templateId, e.target, userId)
      .then(
        (result) => {
          toast.success("🌱 Feedback sent successfully! Thank you for your insights.");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          toast.error("⚠️ Failed to send feedback. Please try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50/50" id="contact">
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block p-3 mb-4 bg-green-100 rounded-full">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
            Cultivate <span className="text-green-600">Connection</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Your insights help us grow better solutions for modern agriculture.
          </p>
        </motion.div>

        <motion.div
          className="grid overflow-hidden grid-cols-1 bg-white rounded-2xl border border-gray-200 shadow-xl lg:grid-cols-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="p-8 md:p-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="px-4 py-3 w-full bg-gray-100 rounded-lg border border-gray-200 transition outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="px-4 py-3 w-full bg-gray-100 rounded-lg border border-gray-200 transition outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Your Agricultural Insights</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Share your thoughts, questions, or ideas..." required rows={5} className="px-4 py-3 w-full bg-gray-100 rounded-lg border border-gray-200 transition outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center px-8 py-3 w-full text-base font-semibold text-white bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105 disabled:bg-gray-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>
                    <div className="mr-2 w-5 h-5 rounded-full border-2 border-white animate-spin border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="hidden relative lg:block">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Lush green crops in a field"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t to-transparent from-green-900/70 via-green-900/20"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="mb-3 text-2xl font-bold">Why Your Feedback Matters</h3>
              <p className="text-green-100">
                At AgroBrain, we believe in growing together. Your experiences shape our solutions, helping us develop smarter tools for sustainable farming and a healthier planet.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackForm;