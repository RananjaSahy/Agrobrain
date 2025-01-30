import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
// News API Key and Endpoint
const API_KEY = "53c8d29069084e49af47d657d3c57daa"; // Use your own API key
const API_URL = "https://newsapi.org/v2/everything";

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch news articles on component mount
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: "technology", // Query parameter for news topic
            apiKey: API_KEY, // Pass your API key
          },
        });
        setNewsArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur shadow-md">
  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
    {/* Logo Section */}
    <div className="flex-shrink-0">
      <a onClick={() => navigate("/")} className="cursor-pointer">
        <img src={image} alt="Logo" className="h-20 w-auto" />
      </a>
    </div>

    {/* Mobile 'Go Back' Button */}
    <div className="sm:hidden">
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
      >
        Go Back
      </button>
    </div>

    {/* Desktop 'Go Back' Button */}
    <div className="hidden sm:flex items-center">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
      >
        Go Back
      </button>
    </div>
  </div>
</nav>

    <br />
    <br />
    <br />
    <h1 class="text-4xl font-bold text-center text-teal-600 mb-6">Latest News</h1>
      <div className="news-container">
        {newsArticles.map((article, index) => (
          <div className="news-card" key={index}>
            <img
              src={article.urlToImage || "https://via.placeholder.com/150"}
              alt={article.title}
            />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
