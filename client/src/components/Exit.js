import React from "react";
import { Link } from "react-router-dom";
import IExit from "../ressources/image/IExit.png";

const Exit = () => {
  return (
    <Link
      to="/Connexion"
      className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center rounded-full text-white shadow-md transition duration-300 hover:bg-gray-700 hover:text-gray-200"
    >
      <img className="" src={IExit}></img>
    </Link>
  );
};

export default Exit;
