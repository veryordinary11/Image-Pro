import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="navbar bg-base-100 justify-between">
      <a className="font-bold normal-case text-xl underline">GalleryPro📷</a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
