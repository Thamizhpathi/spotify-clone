import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";

// import 'bootstrap/dist/css/bootstrap.css';

import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setnav } from "./features/navbarSlicer";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  //  const isnav = useSelector((state) => state.navbar.shownavbar);
  useEffect(() => {
    // Hide navbar on login page, show it on others
    if (location.pathname === "/login" ||location.pathname === "/signup") {
      dispatch(setnav(false));
    } else {
      dispatch(setnav(true));
    }
  }, [location, dispatch]);

  return (
    <>
      <Navbar />

      <AppRoutes />

      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
