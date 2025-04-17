import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from 'react'

const PublicRoute = ({children}) => {
    const isLoggedIn = useSelector((state) => state.login.isloggedin);
  return isLoggedIn?<Navigate to="/homepage" replace/>:children
}

export default PublicRoute