import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa"; // React Icon for the arrow

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-[#adc178] p-8 rounded-lg shadow-xl" id="news">
      <h2 className="mb-4 text-4xl font-extrabold text-center text-white">
        Latest News
      </h2>
      <p className="mb-8 text-lg text-center text-white">
        Stay updated with the latest trends and developments in the agriculture industry.
      </p>

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <div className="space-y-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-[#adc178] mb-3">
                {article.title}
              </h3>
              <p className="mb-4 text-gray-700">{article.description}</p>
              <div className="flex items-center justify-between">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg font-medium text-blue-500 hover:text-blue-700"
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
      <div className="mt-6 text-center">
        <a
          href="/news"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white bg-[#577602] px-6 py-3 rounded-lg hover:bg-[#0f7b42] flex items-center justify-center mx-auto transition duration-200"
        >
          View All News
        </a>
      </div>
    </div>
  );
};

export default News;
