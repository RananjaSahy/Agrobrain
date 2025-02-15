import { Link } from "react-router-dom";
import { FaTractor } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen text-center bg-green-50">
      <FaTractor className="mb-4 text-6xl text-green-600" />
      <h1 className="text-4xl font-bold text-green-700">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">
        Oops! The page you're looking for is not available.
      </p>
      <Link
        to="/"
        className="px-6 py-2 mt-4 text-white bg-green-600 rounded-md shadow-md transition hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
