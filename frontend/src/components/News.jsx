import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { format } from 'date-fns';
import { Link } from "react-router-dom"; 

const NewsCardSkeleton = () => (
  <div className="p-4 bg-white rounded-xl border border-gray-200">
    <div className="mb-4 w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
    <div className="mb-2 w-1/3 h-4 bg-gray-200 rounded animate-pulse"></div>
    <div className="mb-1 w-full h-6 bg-gray-200 rounded animate-pulse"></div>
    <div className="mb-4 w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
    <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
  </div>
);

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "agriculture OR sustainable farming OR agritech",
            sortBy: "relevancy",
            pageSize: 3,
            language: 'en',
            apiKey: "53c8d29069084e49af47d657d3c57daa",
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 bg-white" id="news">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-block p-3 mb-4 bg-green-100 rounded-full">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
            Agricultural <span className="text-green-600">Insights</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Stay updated with the latest innovations and trends in sustainable farming.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {loading ? (
            [...Array(3)].map((_, index) => <NewsCardSkeleton key={index} />)
          ) : (
            news.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex overflow-hidden flex-col bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2"
                variants={cardVariants}
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={article.urlToImage || '/fallback-agriculture-image.jpg'}
                    alt={article.title}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                      <span>{article.source.name}</span>
                      <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                    </div>
                    <h3 className="mb-4 text-lg font-bold leading-tight text-gray-800 transition-colors duration-300 group-hover:text-green-600">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center mt-auto font-semibold text-green-600">
                    Read Article
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.a>
            ))
          )}
        </motion.div>

        {!loading && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/news"
              className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
            >
              Explore More Insights
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default News;