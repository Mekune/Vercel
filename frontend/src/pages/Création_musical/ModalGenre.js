import React, { useState } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import ModalModifyGenre from "./ModalModifyGenre";
import YouTube from "react-youtube";

const ModalGenre = ({ genre, isAdmin, Duration, onClose }) => {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      // Envoyer une requête DELETE pour supprimer le genre avec l'ID correspondant
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/genres/delete/${genre._id}`
      );

      // Vérifier le statut de la réponse
      if (response.status === 200) {
        onClose(); // Fermer la fenêtre modale
        localStorage.setItem("isAdmin", true); // Mettre à jour le statut de isAdmin à true
        window.location.reload();
      } else {
        // Gérer d'autres statuts d'erreur ici si nécessaire
        console.error(
          "Erreur lors de la suppression du genre :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du genre :", error);
    }
  };

  const handleModifyClick = () => {
    setIsModifyModalOpen(true);
  };

  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : null;
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return (
      new Date(date).toLocaleDateString("fr-FR", options) +
      " " +
      new Date(date).toLocaleTimeString("fr-FR")
    );
  };

  return (
    <Transition
      show={!!genre}
      enter={`transition-opacity duration-${Duration}`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`transition-opacity duration-${Duration / 2}`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-800">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        <div className="relative bg-gray-300 p-8 rounded-lg z-50 w-4/6 min-h-4/6 flex flex-col">
          <h2 className="text-4xl font-bold mb-4 text-center">
            {genre && genre?.Titre}
          </h2>
          <div className="flex justify-center mb-4">
            <p className="italic text-sm text-center">
              {genre && "'" + genre?.Description + "'"}
            </p>
            {genre && (
              <p className="absolute right-10 font-bold text-right">
                {genre.BPM} BPM
              </p>
            )}
          </div>
          <ul className="flex flex-wrap justify-evenly mb-5">
            {genre &&
              genre.Instrument.map((instrument, index) => (
                <li key={index} className="w-1/4">
                  <strong>- {instrument}</strong>
                </li>
              ))}
          </ul>
          {genre && genre.Exemple && (
            <YouTube
              className="flex flex-col items-center h-full"
              videoId={extractVideoId(genre.Exemple)}
            />
          )}
          {genre && !genre.Exemple && (
            <div className="flex flex-col justify-center items-center h-72">
              <h2>Aucune vidéo exemple disponible</h2>
            </div>
          )}
          <div className="flex justify-end -mt-4">
            {genre && (
              <p className="font-bold text-right">
                Dernière modification le {formatDate(genre.Date)} par{" "}
                {genre.LastUserModify}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            {localStorage.getItem("Admin") === "true" && (
              <button
                onClick={handleDelete} // Appeler la fonction de suppression
                className={`bg-red-600 text-white px-4 py-2 rounded-md mt-4 ml-2 hover:bg-red-400 transition duration-${Duration}`}
              >
                Supprimer
              </button>
            )}
            {localStorage.getItem("Admin") === "true" && (
              <button
                onClick={handleModifyClick}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md mt-4 ml-2 hover:bg-blue-400 transition duration-${Duration}`}
              >
                Modifier
              </button>
            )}
            <button
              onClick={onClose}
              className="absolute right-5 top-0 px-3 py-1 bg-red-600 text-white rounded-full mt-4 ml-2"
            >
              x
            </button>
          </div>
        </div>
      </div>
      {isModifyModalOpen && (
        <ModalModifyGenre
          genre={genre}
          Duration={Duration}
          onClose={() => setIsModifyModalOpen(false)}
        />
      )}
    </Transition>
  );
};

export default ModalGenre;
