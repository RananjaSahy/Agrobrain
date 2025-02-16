import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@mui/material"; 

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "agriculture sustainable farming",
            sortBy: "publishedAt",
            pageSize: 3,
            apiKey: "53c8d29069084e49af47d657d3c57daa",
          },
        });
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white" id="news">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-block p-4 mb-4 bg-green-100 rounded-full">
            <FaLeaf className="text-4xl text-green-700" />
          </div>
          <h2 className="mb-4 text-4xl font-bold font-playfair">
            <span className="text-gray-800">Agricultural</span>{" "}
            <span className="text-[#5DB996]">Insights</span>
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with the latest innovations in sustainable farming
          </p>
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <div className="grid gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 bg-white rounded-lg shadow-md"
                >
                  <Skeleton variant="rectangular" height={200} className="mb-4 rounded-lg" />
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="text" width="100%" height={72} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-8 md:grid-cols-3"
            >
              {news.map((article, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="overflow-hidden bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  {article.urlToImage && (
                    <div className="overflow-hidden relative h-48">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/fallback-agriculture-image.jpg';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-green-800">
                      {article.title}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {article.description}
                    </p>
                    <motion.a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium text-green-700 hover:text-green-900 group"
                      whileHover={{ x: 5 }}
                    >
                      Read More
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <a
            href="/news"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-green-700 rounded-lg transition-all duration-300 hover:bg-green-800 hover:shadow-lg"
          >
            Explore More Insights
            <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default News;