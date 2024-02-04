import React from "react";

import SignInForm from "./SignInForm";

import googleIcon from "../images-icons/googleIcon.png";
import appleIcon from "../images-icons/appleIcon.png";
import linkedInIcon from "../images-icons/linkedInIcon.png";
import discordIcon from "../images-icons/discordIcon.png";
import githubIcon from "../images-icons/githubIcon.png";
import twitterIcon from "../images-icons/twitterIcon.png";

const LandingPage = ({ handleChange }) => {
  return (
    <div className="landing-page-parent flex flex-col sm:flex-row min-h-screen">
      <div className="flex flex-col justify-between left-sec w-full sm:w-1/2 text-center">
        <div className="logo-div"></div>
        <h1 className="font-bold text-4xl text-white">BASE</h1>
        <div className="flex justify-center mb-10">
          <img src={githubIcon} className="w-9 h-9 mr-2" alt="githubIcon" />
          <img src={twitterIcon} className="w-9 h-9 mr-2" alt="twitterIcon" />
          <img src={linkedInIcon} className="w-9 h-9 mr-2" alt="linkedInIcon" />
          <img src={discordIcon} className="w-9 h-9 mr-2" alt="discordIcon" />
        </div>
      </div>
      <div className="right-sec w-full sm:w-1/2 pt-11">
        <h1 className="text-4xl font-bold ml-4 sm:ml-32">Sign In</h1>
        <h5 className="ml-4 sm:ml-32 mt-2">Sign in to your account</h5>
        <div className="flex signIn-options mt-6 ml-4 sm:ml-32 mr-4 sm:mr-32">
          <button className="bg-white px-4 rounded-lg text-gray-300 h-10 flex items-center w-full sm:w-1/2 mr-2 sm:mr-5">
            <img src={googleIcon} className="w-6 h-6 mr-2" alt="Google Icon" />
            Sign in with Google
          </button>
          <button className="bg-white px-4 rounded-lg text-gray-300 h-10 flex items-center w-full sm:w-1/2">
            <img src={appleIcon} className="w-6 h-6 mr-2" alt="Google Icon" />
            Sign in with Apple
          </button>
        </div>
        <div className="form-container bg-white ml-4 sm:ml-32 mr-4 sm:mr-32 mt-7 mb-7 rounded-lg pt-10 pb-10 pl-7 pr-7">
          <SignInForm handleChange={handleChange} />
        </div>
        <h6 className="ml-4 sm:ml-20 mr-4 sm:mr-20 text-center mb-7">
          Don't have an account{" "}
          <span className="font-medium text-blue-500 cursor-pointer">
            Register here?
          </span>
        </h6>
      </div>
    </div>
  );
};

export default LandingPage;
