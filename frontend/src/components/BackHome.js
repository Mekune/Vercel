import React from "react";
import { Link } from "react-router-dom";
import IBackHome from "../ressources/image/IBackHome.png";

const BackHome = () => {
  return (
    <Link
      to="/Home"
      className="absolute top-4 left-4 w-12 h-12 bg-gray-800 flex items-center justify-center rounded-full text-white shadow-md transition duration-300 hover:bg-gray-700 hover:text-gray-200"
    >
      <img className="" src={IBackHome}></img>
    </Link>
  );
};

export default BackHome;
