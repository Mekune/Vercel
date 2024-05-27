// ModalLesson.jsx
import React, { useState } from "react";
import ModalModifyLesson from "./ModalModifyLesson";
import axios from "axios";

const ModalLesson = ({ lesson, Duration, onClose }) => {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Ajout du mode sombre

  const handleModifyClick = () => {
    setIsModifyModalOpen(true);
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/mao/delete/${lesson._id}`
      );

      if (response.status === 200) {
        onClose();
        window.location.reload();
      } else {
        console.error(
          "Erreur lors de la suppression de la leçon :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la leçon :", error);
    }
  };

  return (
    <>
      {lesson && (
        <div
          className={`${
            darkMode ? "dark" : ""
          } fixed inset-0 flex items-center justify-center z-50 text-gray-800`}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div
            className={`relative bg-white p-8 rounded-lg z-50 w-4/6 max-h-[calc(100vh-100px)] overflow-y-auto flex flex-col ${
              darkMode ? "dark" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-5xl font-bold text-center ts mb-12">
              {lesson.Titre}
            </h2>
            {lesson.element
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((item, index) => (
                <div key={index}>
                  {item.isOne === 1 ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: item.valeur }}
                      className="text-justify style md:text-[1.3em] lg:text-[1.6em]"
                    ></div>
                  ) : (
                    <img
                      src={item.valeur}
                      alt="Image"
                      className="w-full max-h-96 lg:max-w-[65%] mx-auto mb-14 mt-14 rounded-2xl"
                    />
                  )}
                </div>
              ))}
            <div className="flex justify-end relative">
              {lesson && (
                <p className="font-bold text-right">
                  Dernière modification le {formatDate(lesson.Date)} par{" "}
                  {lesson.LastUserModify}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              {localStorage.getItem("Admin") === "true" && (
                <button
                  onClick={handleDelete}
                  className={`bg-red-600 text-white px-4 py-2 rounded-md mt-4 ml-2 hover:bg-red-400 transition duration-${Duration}`}
                >
                  Supprimer
                </button>
              )}
              <ModalModifyLesson
                lesson={lesson}
                Duration={Duration}
                onClose={() => setIsModifyModalOpen(false)}
                isOpen={isModifyModalOpen}
              />
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
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLesson;
