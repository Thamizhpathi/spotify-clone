import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPencil, GoHome } from "react-icons/go";
import { IoReloadOutline } from "react-icons/io5";
import { MdOutlineExpandLess } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData =useSelector((state)=>state.login.loggedUser)
//   console.log("profile",userData)
  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState({
    ...userData,
  });
  const id = user._id;
  //   console.log(user.day)

  const navigate = useNavigate();

  const links = [
    {
      label: "Edit Profile",
      icon: <GoPencil size={18} />,
      onClick: () => {setEditProfile(true); navigate(`/profile/${id}`)},
      type: "bg-black p-2 rounded-md",
    },
    {
      label: "Recover Playlist",
      icon: <IoReloadOutline size={18} />,
      to: "/",
      type: "bg-black p-2 rounded-md",
    },
    {
      label: "Address",
      icon: <GoHome size={18} />,
      to: "/",
      type: "bg-black p-2 rounded-md",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (id) => {
    try {
      console.log(user.date);
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:5000/api/v1/profile/user/updateuser/${id}`,
        {
          email: user.email,
          gender: user.gender,
          date: user.date,
          month: user.month,
          year: user.year,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-Type": "application/json",
          },
        }
      );

    //   console.log("success", response.data);
       localStorage.setItem('userdata',JSON.stringify(response.data.data.updatedUser))
    //   setEditProfile(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  return (
    <>
      {!editProfile && (
        <div className="flex flex-col w-96 bg-[#2A2A2A] mx-auto mt-5 rounded-md p-3 text-white sm:w-[70%] lg:w-[50%]">
          <h1>Account</h1>
          <ul>
            {links.map((link, index) => (
              <li
                key={index}
                className="flex mt-5 gap-3 p-2 items-center hover:bg-[#121212] hover:rounded-md cursor-pointer"
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else {
                    navigate(link.to);
                  }
                }}
              >
                <span className={`${link.type}`}>{link.icon}</span>
                {link.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {editProfile && (
        <div className="w-96 sm:w-[50%] mx-auto text-white mt-10">
          <MdOutlineExpandLess
            size={70}
            className="text-white p-4 rounded-full bg-[#2a2a2a] rotate-[270deg] cursor-pointer"
            onClick={() => setEditProfile(false)}
          />
          <h1 className="text-5xl font-bold m-12 ml-1">Edit Profile</h1>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="py-3 my-7 px-5 bg-[#121212] border border-gray-700 w-full rounded-md"
          />

          <label>Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="py-3 my-7 px-5 bg-[#121212] border border-gray-700 w-full rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer Not to Say">Prefer Not to Say</option>
          </select>

          <label>Date of Birth</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <input
              type="number"
              name="date"
              placeholder="Date"
              value={user.date}
              onChange={handleChange}
              className="py-3 my-7 px-5 bg-[#121212] border border-gray-700 rounded-md"
            />
            <select
              name="month"
              value={user.month}
              onChange={handleChange}
              className="py-3 my-7 px-5 bg-[#121212] border border-gray-700 rounded-md"
            >
              <option value="">Select Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((m, i) => (
                <option key={i} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={user.year}
              onChange={handleChange}
              className="py-3 my-7 px-5 bg-[#121212] border border-gray-700 rounded-md"
            />
          </div>

          <div className="flex w-full justify-end gap-6 mb-6">
            <button
              onClick={() => setEditProfile(false)}
              className="bg-transparent text-white font-bold"
            >
              Cancel
            </button>
            <button
              className="bg-[#1ED760] p-3 px-8 rounded-full text-black font-bold"
              onClick={() => {
                handleSubmit(id);
              }}
            >
              Save Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
