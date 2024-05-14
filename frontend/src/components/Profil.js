import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ModalProfil from "./ModalProfil";
import IProfil from "../ressources/image/IProfil.png";
import IAdmin from "../ressources/image/IAdmin.png";

const Profil = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <article>
      <div
        onClick={handleOpenModal}
        className="absolute top-4 right-4 w-12 h-12 bg-gray-800 flex items-center justify-center rounded-full text-white shadow-md transition duration-300 hover:bg-gray-700 hover:text-gray-200 cursor-pointer"
      >
        {localStorage.getItem("Admin") === "false" && <img src={IProfil}></img>}
        {localStorage.getItem("Admin") === "true" && (
          <img className="" src={IAdmin}></img>
        )}
      </div>
      <ModalProfil show={showModal} onClose={handleCloseModal} />
    </article>
  );
};

export default Profil;
