import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa"; // React Icon for the arrow
import { useNavigate } from "react-router-dom";
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetching the top 3 news from the agriculture industry
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: "agriculture",
              sortBy: "publishedAt", // Sort by most recent
              pageSize: 3, // Top 3 news
              apiKey: "53c8d29069084e49af47d657d3c57daa", // Replace with your NewsAPI key
            },
          }
        );
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-[#5DB996] p-8 rounded-lg shadow-xl" id="news">
      <h2 className="text-4xl font-extrabold text-white text-center mb-4">
        Latest News
      </h2>
      <p className="text-lg text-white text-center mb-8">
        Stay updated with the latest trends and developments in the agriculture industry.
      </p>

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="space-y-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-[#5DB996] mb-3">
                {article.title}
              </h3>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <div className="flex justify-between items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-lg font-medium flex items-center"
                >
                  Read more
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All News Button */}
      <div className="text-center mt-6">
        <a
          onClick={() => navigate("/news")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white bg-[#5DB996] px-6 py-3 rounded-lg hover:bg-[#4a9f85] flex items-center justify-center mx-auto transition duration-200"
        >
          View All News
        </a>
      </div>
    </div>
  );
};

export default News;
