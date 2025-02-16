import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./Loding";

const API_KEY = "53c8d29069084e49af47d657d3c57daa"; 
const API_URL = "https://newsapi.org/v2/everything";

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
   
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: "technology", 
            apiKey: API_KEY, 
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
    return <LoadingComponent/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
  <nav className="fixed top-0 right-0 left-0 z-50 bg-white bg-opacity-90 shadow-md backdrop-blur">
  <div className="flex justify-between items-center px-4 h-16 sm:px-6 lg:px-8">

    <div className="flex-shrink-0">
      <a onClick={() => navigate("/")} className="cursor-pointer">
        <img src={image} alt="Logo" className="w-auto h-20" />
      </a>
    </div>


    <div className="sm:hidden">
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 text-white bg-red-500 rounded-md transition-all duration-200 hover:bg-red-600"
      >
        Go Back
      </button>
    </div>


    <div className="hidden items-center sm:flex">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 text-white bg-red-500 rounded-md transition-all duration-200 hover:bg-red-600"
      >
        Go Back
      </button>
    </div>
  </div>
</nav>

    <br />
    <br />
    <br />
    <h1 class="mb-6 text-4xl font-bold text-center text-teal-600">Latest News</h1>
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
