import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillSpotify } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();

  const isnav = useSelector((state) => state.navbar.shownavbar);
  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { icon: <AiFillSpotify size={38} />, to: "/", type: "text-white ml-4" },
    {
      icon: <GoHome size={30} />,
      to: "/",
      type: "p-2 rounded-full bg-custom-gray text-white ml-4",
    },
    { label: "Premium", to: "/", type: "p-2 font-bold" },
    { label: "Support", to: "/", type: "p-2 font-bold" },
    { label: "Download", to: "/", type: "p-2 font-bold" },
    { label: "Install App", to: "/", type: "m-5 font-bold" },
    { label: "Sign Up", to: "/signup", type: "m-5" },
  ];

  if (isLoggedIn) {
    links.push({
      label: "Logout",
      to: "/login",
      type: "rounded-full p-3 px-6 bg-white text-black cursor-pointer",
    });
  } else {
    links.push({
      label: "Login",
      to: "/login",
      type: "rounded-full py-3 px-6 bg-white text-black cursor-pointer",
    });
  }

  if (!isnav) return null;

  return (
    <div className="bg-black text-[#B3B3B3] font-bold text-sm w-full px-4 py-2">
      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-between">
        <ul className="flex items-center gap-x-4 flex-wrap w-full">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <li
                className={`${link.type} ${
                  link.label !== "Login" && link.label !== "Logout"
                    ? "hover:text-white hover:scale-105 transition"
                    : "hover:scale-105 transition"
                }`}
                onClick={() => navigate(link.to)}
              >
                <span className="cursor-pointer">
                  {link.icon}
                  {link.label}
                </span>
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

              {index === 4 && <div className="text-white text-2xl mx-2">|</div>}
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
              navigate(link.to);
              setMenuOpen(false);
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
