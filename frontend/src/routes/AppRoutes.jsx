import { Routes, Route } from "react-router-dom";
import App from "../App";
import React from 'react'
import Login from "../pages/login";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import Profile from "../pages/profile";

const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/"  element={<></>}/>
    {/* <Route path="/support"  element={<App/>}/> */}
    {/* <Route path="/support"  element={<App/>}/> */}
    {/* <Route path="/premium"  element={<App/>}/> */}
    <Route path="/login"  element={<Login/>}/>
    <Route path="/homepage"  element={<Home/>}/>
    <Route path="/signup"  element={<SignUp/>}/>
    
    <Route path="/profile/:id?"  element={<Profile/>}/>
</Routes>
  )
}

export default AppRoutes

