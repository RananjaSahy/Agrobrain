import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import robot from "../../public/screen.png";

const BrandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col lg:flex-row h-screen">
      {/* Left Section (Login) */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center bg-white p-10 relative overflow-hidden">
        {/* Abstract Shapes - More visible on mobile */}
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-green-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-[-40px] right-[-40px] w-28 h-28 bg-green-400 rounded-full opacity-50"></div>
        <div className="absolute top-[50%] left-[80%] w-20 h-20 bg-green-600 rounded-full opacity-30"></div>

        {/* Additional shapes for mobile */}
        <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-green-200 rounded-full opacity-40 lg:hidden"></div>
        <div className="absolute bottom-[15%] left-[15%] w-12 h-12 bg-green-500 rounded-full opacity-40 lg:hidden"></div>
        <div className="absolute bottom-[5%] right-[20%] w-10 h-10 bg-green-700 rounded-full opacity-30 lg:hidden"></div>

        <h1 className="text-3xl lg:text-4xl font-bold text-green-700 z-10">Log In</h1>
        <p className="text-gray-600 mt-2 text-center z-10 px-5 lg:px-0">
          Create an account and let AI-powered farming enhance your agricultural success.
        </p>
        
        {/* Log In Button */}
        <button
          onClick={() => loginWithRedirect()}
          className="bg-green-600 text-white px-6 lg:px-8 py-3 mt-5 rounded-full hover:bg-green-700 text-lg shadow-lg transition-transform transform hover:scale-105 z-10"
        >
          Log In with Auth0
        </button>

        {/* Sign Up Link */}
        <p className="mt-5 z-10">
          Not a member?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => loginWithRedirect({ screen_hint: "signup" })}
          >
            Sign Up
          </span>
        </p>

        {/* Continue Without Signing In Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-5 text-green-700 border border-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all z-10"
        >
          Continue without Signing In
        </button>
      </div>

      {/* Right Section (Branding) - Hidden on mobile */}
      <div className="lg:w-1/2 w-full bg-gradient-to-br from-green-300 to-green-600 flex-col justify-center items-center text-white relative overflow-hidden py-10 hidden lg:flex">
        {/* Abstract Shapes */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-lg opacity-20 transform rotate-12"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-28 h-28 bg-green-700 rounded-full opacity-40"></div>

        <h2 className="text-2xl lg:text-3xl font-bold z-10">Join AgroBrain Today!</h2>
        <img src={robot} alt="Analytics" className="mt-5 w-100 lg:w-100 z-10 shadow-lg" />
      </div>
    </div>
  );
};

export default BrandingPage;
