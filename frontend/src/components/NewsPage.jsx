import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";
import { format } from 'date-fns';

const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
const API_URL = import.meta.env.VITE_NEWSAPI_URL;

const NewsCardSkeleton = () => (
  <div className="p-4 bg-white rounded-xl border border-gray-200">
    <div className="mb-4 w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
    <div className="mb-2 w-1/3 h-4 bg-gray-200 rounded animate-pulse"></div>
    <div className="mb-1 w-full h-6 bg-gray-200 rounded animate-pulse"></div>
    <div className="mb-4 w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
    <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
  </div>
);

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: "agriculture OR sustainable farming OR agritech",
            sortBy: "publishedAt",
            pageSize: 20, 
            language: 'en',
            apiKey: API_KEY,
          },
        });
        const filteredArticles = response.data.articles.filter(article => article.urlToImage);
        setNewsArticles(filteredArticles);
      } catch (error) {
        setError("Failed to fetch news. Please try again later.");
        console.error("News fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-sm bg-white/80">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">
                Agro<span className="text-green-600">Brain</span>
              </span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </nav>

      <main className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
            Latest Agricultural <span className="text-green-600">Insights</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Explore the latest news and trends shaping the future of farming and technology.
          </p>
        </div>

        {error && <div className="text-center text-red-500">{error}</div>}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(9)].map((_, index) => <NewsCardSkeleton key={index} />)
          ) : (
            newsArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                      <span className="font-medium truncate max-w-[150px]">{article.source.name}</span>
                      <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                    </div>
                    <h3 className="mb-4 text-lg font-bold leading-tight text-gray-800 transition-colors duration-300 group-hover:text-green-600 line-clamp-3">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center mt-auto font-semibold text-green-600">
                    Read Article
                    <ArrowLeft className="ml-2 w-5 h-5 transition-transform duration-300 transform -rotate-180 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsPage;