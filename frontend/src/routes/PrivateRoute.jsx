import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.login.isloggedin); // use your correct reducer slice
  
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };
  
  export default PrivateRoute;
  