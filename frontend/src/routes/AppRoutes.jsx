import { Routes, Route } from "react-router-dom";
import App from "../App";
import React from "react";
import Login from "../pages/login";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import Profile from "../pages/profile";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./publicRoute";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      {/* <Route path="/support"  element={<App/>}/> */}
      {/* <Route path="/support"  element={<App/>}/> */}
      {/* <Route path="/premium"  element={<App/>}/> */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/homepage"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      /> */}

      <Route
        path="/profile/:id?"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
