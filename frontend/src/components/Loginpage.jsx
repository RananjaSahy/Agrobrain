import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import robot from "../../public/screen.png";

const BrandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="flex relative flex-col h-screen lg:flex-row">
      <div className="flex overflow-hidden relative flex-col justify-center items-center p-10 w-full bg-white lg:w-1/2">
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-green-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-[-40px] right-[-40px] w-28 h-28 bg-green-400 rounded-full opacity-50"></div>
        <div className="absolute top-[50%] left-[80%] w-20 h-20 bg-green-600 rounded-full opacity-30"></div>
        <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-green-200 rounded-full opacity-40 lg:hidden"></div>
        <div className="absolute bottom-[15%] left-[15%] w-12 h-12 bg-green-500 rounded-full opacity-40 lg:hidden"></div>
        <div className="absolute bottom-[5%] right-[20%] w-10 h-10 bg-green-700 rounded-full opacity-30 lg:hidden"></div>
        <h1 className="z-10 text-3xl font-bold text-green-700 lg:text-4xl">Log In</h1>
        <p className="z-10 px-5 mt-2 text-center text-gray-600 lg:px-0">
          Create an account and let AI-powered farming enhance your agricultural success.
        </p>
        
        <button
          onClick={() => loginWithRedirect()}
          className="z-10 px-6 py-3 mt-5 text-lg text-white bg-green-600 rounded-full shadow-lg transition-transform transform lg:px-8 hover:bg-green-700 hover:scale-105"
        >
          Log In with Auth0
        </button>


        <p className="z-10 mt-5">
          Not a member?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => loginWithRedirect({ screen_hint: "signup" })}
          >
            Sign Up
          </span>
        </p>

        <button
          onClick={() => navigate("/")}
          className="z-10 px-6 py-2 mt-5 text-green-700 rounded-full border border-green-600 transition-all hover:bg-green-600 hover:text-white"
        >
          Continue without Signing In
        </button>
      </div>

      <div className="hidden overflow-hidden relative flex-col justify-center items-center py-10 w-full text-white bg-gradient-to-br from-green-300 to-green-600 lg:w-1/2 lg:flex">
 
        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-lg opacity-20 transform rotate-12"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-28 h-28 bg-green-700 rounded-full opacity-40"></div>

        <h2 className="z-10 text-2xl font-bold lg:text-3xl">Join AgroBrain Today!</h2>
        <img src={robot} alt="Analytics" className="z-10 mt-5 shadow-lg w-100 lg:w-100" />
      </div>
    </div>
  );
};

export default BrandingPage;
