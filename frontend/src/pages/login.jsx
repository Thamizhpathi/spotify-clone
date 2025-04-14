import React, { useState } from "react";
import { AiFillSpotify } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setvalue, setLoggedUser, setisLogedin } from "../features/loginSlicer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputvalues = useSelector((state) => state.login.value);

  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({}); // To store field validation errors

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    dispatch(setvalue({ name, value }));
    setInputErrors((prev) => ({ ...prev, [name]: false })); // Remove red border as user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = {};
    if (!inputvalues.email) errors.email = true;
    if (!inputvalues.password) errors.password = true;

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email: inputvalues.email,
        password: inputvalues.password,
      });

      if (response.status === 200) {
        dispatch(setLoggedUser(response.data.data));
        dispatch(setisLogedin(true));
        navigate("/homepage");
      }
    } catch (error) {
      console.log("error", error.response?.data);

      const errorText = error?.response?.data;
      try {
        const matches = errorText.match(/Error: (.*?)<br>/);
        if (matches && matches[1]) {
          setErrorMessage(matches[1]);
        } else {
          setErrorMessage("Login failed. Please try again.");
        }
      } catch {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div
        className="flex flex-col h-screen w-full items-center justify-center rounded-lg mx-auto shadow-md text-white md:w-[50%] md:h-auto md:mt-10 md:p-6"
        style={{ backgroundColor: "#121212" }}
      >
        <AiFillSpotify size={"60px"} />
        <h1 className="text-3xl font-bold">Login to Spotify</h1>

        <form onSubmit={handleLogin} method="post" className="flex flex-col w-full max-w-sm p-5">
          <label htmlFor="email" className="mb-2">
            Email or username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email or username"
            className={`p-3 rounded-md border ${
              inputErrors.email ? "border-red-500" : "border-gray-400"
            } focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-[#121212] text-white`}
            value={inputvalues.email}
            onChange={handleOnchange}
          />
          {inputErrors.email && (
            <p className="text-red-500 mt-1 text-sm">Email is required</p>
          )}

          <label htmlFor="password" className="mb-2 mt-5">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={`p-3 rounded-md border ${
              inputErrors.password ? "border-red-500" : "border-gray-400"
            } focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-[#121212] text-white`}
            value={inputvalues.password}
            onChange={handleOnchange}
          />
          {inputErrors.password && (
            <p className="text-red-500 mt-1 text-sm">Password is required</p>
          )}

          {errorMessage && (
            <p className="text-red-500 mt-4 font-semibold text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="rounded-full w-full max-w-sm p-4 mt-7 text-black font-bold"
            style={{ backgroundColor: "#1ED760" }}
          >
            Log in
          </button>

          <p className="font-bold underline mt-8 text-center">Forgot your Password?</p>
          <p className="text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <span
              className="underline font-bold text-white cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up for Spotify.
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
