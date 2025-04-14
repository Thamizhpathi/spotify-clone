import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillSpotify } from "react-icons/ai";
import { setvalue } from "../features/loginSlicer";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputvalues = useSelector((state) => state.login.value);

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(setvalue({ name, value }));

    
    setInputErrors(prev => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const { name, email, password } = inputvalues;
    const errors = {};

    if (!name) errors.name = true;
    if (!email) errors.email = true;
    if (!password) errors.password = true;

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      // setErrorMessage("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInputErrors({ email: true });
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setInputErrors({ password: true });
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }

    setInputErrors({});
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/sign-up", {
        name: inputvalues.name,
        email: inputvalues.email,
        password: inputvalues.password,
      });

      if (response.status === 201) {
        setErrorMessage("✅ Account created successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.log("error", error.response?.data);

      const errorText = error?.response?.data;
      try {
        const matches = errorText.match(/Error: (.*?)<br>/);
        if (matches && matches[1]) {
          setErrorMessage(matches[1]);
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      } catch {
        setErrorMessage("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen w-full items-center justify-center mx-auto rounded-md shadow-md text-white md:w-[50%] md:h-auto md:mt-10 md:p-5"
      style={{ backgroundColor: "#121212" }}
    >
      <AiFillSpotify size={"60px"} />
      <h1 className="text-4xl mb-6 font-bold w-[70%] text-center">Sign up to Start Listening</h1>

      <div className="flex flex-col w-full max-w-sm p-5">
        {/* Name Input */}
        <label htmlFor="name" className="mb-2 font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputvalues.name}
          onChange={handleOnChange}
          className={`p-3 rounded-md border transition-all duration-300 bg-[#121212] text-white ${
            inputErrors.name
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-400 focus:ring-2 focus:ring-green-500"
          }`}
        />
        {inputErrors.name && (
            <p className="text-red-500 mt-1 text-sm">Name is required</p>
          )}

        {/* Email Input */}
        <label htmlFor="email" className="mb-2 mt-5 font-medium">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={inputvalues.email}
          onChange={handleOnChange}
          className={`p-3 rounded-md border transition-all duration-300 bg-[#121212] text-white ${
            inputErrors.email
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-400 focus:ring-2 focus:ring-green-500"
          }`}
        />
         {inputErrors.email && (
            <p className="text-red-500 mt-1 text-sm">Email is required</p>
          )}

        {/* Password Input */}
        <label htmlFor="password" className="mb-2 mt-5 font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={inputvalues.password}
          onChange={handleOnChange}
          className={`p-3 rounded-md border transition-all duration-300 bg-[#121212] text-white ${
            inputErrors.password
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-400 focus:ring-2 focus:ring-green-500"
          }`}
        />
       {inputErrors.password && (
            <p className="text-red-500 mt-1 text-sm">Password is required</p>
          )}
        {/* Error / Success Message */}
        {errorMessage && (
          <p
            className={`mt-4 text-center font-semibold transition-all duration-300 ${
              errorMessage.startsWith("✅") ? "text-green-400" : "text-red-500"
            }`}
            aria-live="polite"
          >
            {errorMessage}
          </p>
        )}

        {/* Sign Up Button */}
        <button
          className="rounded-full w-full max-w-sm p-4 mt-7 text-black font-bold hover:opacity-90 transition-all duration-300"
          style={{ backgroundColor: "#1ED760" }}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Redirect to Login */}
        <p className="font-bold underline mt-8 text-center">Already have an account?</p>
        <p className="text-gray-400 mt-2 text-center">
          <span
            className="underline font-bold text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here.
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
