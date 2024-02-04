import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(emailRef.current.value);
    const isPasswordValid = passwordRef.current.value.length >= 5;

    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const submitData = () => {
    // Perform form submission logic here
    if (isFormValid) {
      navigate("/dashboard");
    }
  };

  return (
    <form>
      <div className="flex flex-col">
        <label className="font-medium">Email Address</label>
        <input
          className="mt-1 py-1 px-3 bg-gray-100 rounded outline-none"
          type="email"
          name="username"
          ref={emailRef}
          required
          onBlur={validateForm}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="font-medium">Password</label>
        <input
          className="mt-1 py-1 px-3 bg-gray-100 rounded outline-none"
          type="password"
          name="password"
          ref={passwordRef}
          pattern=".{5,}"
          required
          onBlur={validateForm}
        />
      </div>
      <h5 className="mt-2 font-medium">
        <span className="font-medium text-blue-500 cursor-pointer">
          Forgot Password?
        </span>
      </h5>
      <button
        className={`mt-2 bg-customBlue rounded-lg w-full py-2 text-white font-medium ${
          isFormValid ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={submitData}
        disabled={!isFormValid}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
