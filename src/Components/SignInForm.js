import React from "react";

const SignInForm = ({ handleChange }) => {
  return (
    <form>
            <div className="flex flex-col">
              <label className="font-medium">Email Address</label>
              <input
                className="mt-1 py-1 px-3 bg-gray-100 rounded outline-none"
                type="email"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="font-medium">Password</label>
              <input
                className="mt-1 py-1 px-3 bg-gray-100 rounded outline-none"
                type="password"
                name="password"
                onChange={handleChange}
                pattern=".{5,}"
                required
              />
            </div>
            <h5 className="mt-2 font-medium">
              <span className="font-medium text-blue-500 cursor-pointer">
                Forgot Password?
              </span>
            </h5>
            <button
              className="mt-2 bg-blue-600 rounded-lg w-full py-2 text-white font-medium"
              onClick={console.log("submitted")}
            >
              Sign In
            </button>
          </form>
  );
};

export default SignInForm;
