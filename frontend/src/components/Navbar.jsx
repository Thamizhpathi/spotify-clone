import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillSpotify } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { setdropDown } from "../features/navbarSlicer";

const Navbar = () => {
  const navigate = useNavigate();

  const isnav = useSelector((state) => state.navbar.shownavbar);
  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const [menuOpen, setMenuOpen] = useState(false);
  const loggeduser = useSelector((state) => state.login.loggedUser);
  const isdropDown = useSelector((state) => state.navbar.dropDown);
  // console.log(isdropDown);
  const dispatch = useDispatch();
  let profile = "";

  if (loggeduser) {
    // console.log(loggeduser)
    profile = loggeduser.name[0]
    
  }
  // useEffect(() => {
  //   // Prevent the user from going back to the previous page
  //   const preventBackNavigation = (event) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // Standard for Chrome, Firefox, etc.
  //     navigate("/login"); // Forcefully navigate to the login page if back is pressed
  //   };

  //   // Add event listener for the beforeunload event (for browsers like Chrome)
  //   window.addEventListener("popstate", preventBackNavigation);

  //   return () => {
  //     // Cleanup event listener when the component is unmounted
  //     window.removeEventListener("popstate", preventBackNavigation);
  //   };
  // }, [navigate]);
 
  const links = [
    {
      icon: <AiFillSpotify size={38} />,
      to: "/",
      type: " absolute left-0 text-white ml-4",
    },
    {
      icon: <GoHome size={30} />,
      to: "/",
      type: "p-2 rounded-full bg-custom-gray text-white ml-4",
    },
  ];

  if (isLoggedIn) {
    links.push({ label: "Install App", to: "/", type: "ml-5 font-bold" });
    links.push({
      icon: <IoNotificationsOutline size={30} />,
      to: "/",
      type: "text-white ml-4",
    });

    links.push({
      label:  profile.toUpperCase(),

      type: " relative rounded-full py-3 px-5  bg-red-200 text-black cursor-pointer ",
      onClick: () => {
        if (!isdropDown) {
          dispatch(setdropDown());
        } else {
          dispatch(setdropDown());
        }
      },
      dropdown: [
        { label: "Account", to: "/profile", type: "hover:none" },
        {
          label: "Logout",
          onClick: () => {
            handleLogOut()
          },
          type: "hover:none",
        },
      ],
    });
  } else {
    links.push({ label: "Premium", to: "/", type: "p-2 font-bold" });
    links.push({ label: "Support", to: "/", type: "p-2 font-bold" });
    links.push({ label: "Download", to: "/", type: "p-2 font-bold" });
    links.push({
      label: "|",
      to: "/",
      type: "p-2  text-white text-2xl font-bold",
    });
    links.push({ label: "Install App", to: "/", type: "m-5 font-bold" });
    links.push({ label: "Sign Up", to: "/signup", type: "m-5" });

    links.push({
      label: "Login",
      to: "/login",
      type: "rounded-full py-3 px-6 bg-white text-black cursor-pointer",
    });
  }
  const handleLogOut = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userdata');
      setTimeout(() => {
        window.location.replace("/login");

        
      }, 1000);
    }
  };
  if (!isnav) return null;

  return (
    <div className="bg-black text-[#B3B3B3] font-bold text-sm w-full px-4 py-2">
      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-between">
        <ul className="flex relative items-center gap-x-4 flex-wrap w-full  justify-center">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <li
                className={`${link.type} ${
                  link.label !== "Login" && link.label !== "Logout"
                    ? "hover:text-white hover:scale-105 transition"
                    : "hover:scale-105 transition"
                }`}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else {
                    navigate(link.to);
                  }
                }}
              >
                <span className="cursor-pointer">
                  {link.icon}
                  {link.label}
                  {/* {link.onClick} */}
                </span>
                {link.dropdown && isdropDown && (
                  <ul className="absolute top-14  bg-custom-gray text-white text-sm rounded shadow-md z-50 w-56 py-2">
                    {link.dropdown.map((link, index) => (
                      <li
                        key={index}
                        className={`${link.type} px-4 py-2 cursor-pointer`}
                        onClick={() => {
                          if (link.onClick) {
                            link.onClick();
                          } else {
                            navigate(link.to);
                          }
                        }}
                      >
                        {link.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {index === 1 && (
                <div className="hidden md:flex relative w-full max-w-[600px] mr-10">
                  <CiSearch
                    className="absolute top-2 left-3 text-white"
                    size={28}
                  />
                  <input
                    type="text"
                    placeholder="What do you want to play?"
                    className="w-full p-3 pl-12 pr-12 border-none rounded-full bg-custom-gray"
                  />
                </div>
              )}

              {/* {index === 4 && <div className="text-white text-2xl mx-2">|</div>} */}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex justify-between items-center">
        <AiFillSpotify
          size={32}
          className="text-white cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-4 mt-20 items-center h-screen">
          {links
            .filter((_, index) => index !== 0 && index !== 1) // skip Spotify and Home
            .map((link, index) => (
              <React.Fragment key={index}>
                <div
                  className={`${link.type} ${
                    link.label !== "Login" && link.label !== "Logout"
                      ? "hover:text-white hover:scale-105 transition"
                      : "hover:scale-105 transition"
                  }`}
                  onClick={() => {
                    if (link.onClick) {
                      link.onClick();
                      setMenuOpen(false);
                    } else {
                      navigate(link.to);
                      setMenuOpen(false);
                    }
                  }}
                >
                  <span className="cursor-pointer">
                    {link.icon}
                    {link.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
