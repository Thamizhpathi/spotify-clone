import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
// import { setLoggedUser } from "./features/loginSlicer";
// import 'bootstrap/dist/css/bootstrap.css';

import AppRoutes from "./routes/AppRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setnav } from "./features/navbarSlicer";
import { setisLogedin, setLoggedUser } from "./features/loginSlicer";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate=useNavigate()
 
  //  const isnav = useSelector((state) => state.navbar.shownavbar);
  useEffect(() => {
    // Hide navbar on login page, show it on others
    if (location.pathname === "/login" ||location.pathname === "/signup") {
      dispatch(setnav(false));
    } else {
      dispatch(setnav(true));
    }
  }, [location, dispatch]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData=JSON.parse(localStorage.getItem('userdata'))
    if (token && userData) {
      
     dispatch( setisLogedin(true))
     dispatch(setLoggedUser(userData))
    //  console.log(userData)
    if (location.pathname === "/" || location.pathname === "/login") {
      navigate("/homepage", { replace: true });
    }
    }
  }, [navigate]);


  return (
    <>
      <Navbar />

      <AppRoutes />

      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
