// ModalAddLesson.jsx
import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalAddLesson = ({ onClose, isOpen }) => {
  const [lessonData, setLessonData] = useState([
    { valeur: "", position: 1, isOne: 1 },
  ]);
  const [globalTitle, setGlobalTitle] = useState("");
  const [errors, setErrors] = useState({});

  // Récupérer le nom de l'utilisateur depuis localStorage
  const lastUserModify = localStorage.getItem("Username");

  const handleAddLesson = async () => {
    try {
      const formData = new FormData();
      formData.append("Titre", globalTitle);
      formData.append("LastUserModify", lastUserModify); // Ajouter le nom de l'utilisateur
      formData.append("Date", new Date().toISOString()); // Ajouter la date actuelle

      lessonData.forEach((lesson, index) => {
        formData.append(`element[${index}][valeur]`, lesson.valeur);
        formData.append(`element[${index}][position]`, lesson.position);
        formData.append(`element[${index}][isOne]`, lesson.isOne);
      });

      const response = await axios.post(
        "https://vercel-back-sigma.vercel.app/mao/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        onClose();
        window.location.reload();
      } else {
        console.error("Erreur lors de l'ajout de la leçon");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la leçon :", error);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value, files } = e.target;
    const lessonDataCopy = [...lessonData];

    if (lessonDataCopy[index]) {
      if (name === "image" && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          lessonDataCopy[index].valeur = event.target.result;
          setLessonData(lessonDataCopy);
        };
        reader.readAsDataURL(files[0]);
      } else {
        let newValue = parseInt(value);
        const currentContent = lessonDataCopy[index];
        const isPositionOccupied = lessonDataCopy.find(
          (content, i) => content.position === newValue && i !== index
        );
        if (isPositionOccupied) {
          const newPosition = currentContent.position;
          currentContent.position = isPositionOccupied.position;
          isPositionOccupied.position = newPosition;
        } else {
          lessonDataCopy[index][name] =
            name === "position"
              ? Math.min(Math.max(parseInt(value), 1), lessonData.length)
              : value;
        }
        lessonDataCopy.sort((a, b) => a.position - b.position);
        setLessonData(lessonDataCopy);
      }
    }
  };

  const addNewContent = () => {
    const position = lessonData.length + 1;
    const newContent = { valeur: "", position, isOne: 1 };
    setLessonData([...lessonData, newContent]);
  };

  const removeContent = (index) => {
    const lessonDataCopy = [...lessonData];
    lessonDataCopy.splice(index, 1);
    setLessonData(lessonDataCopy);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-800">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="relative bg-white p-8 rounded-lg z-50 w-4/6 max-h-[calc(100vh-100px)] overflow-y-auto flex flex-col">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Ajouter une leçon
            </h2>
            <label className="block">
              Titre global :
              <input
                type="text"
                value={globalTitle}
                onChange={(e) => setGlobalTitle(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-md mb-4"
              />
            </label>
            <div className="flex flex-col space-y-4">
              {lessonData.map((lesson, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  {lesson.isOne == 1 ? (
                    <ReactQuill
                      value={lesson.valeur}
                      onChange={(value) =>
                        handleInputChange(index, {
                          target: { name: "valeur", value },
                        })
                      }
                      className="bg-gray-200 w-1/2 mx-auto text-center rounded-md"
                    />
                  ) : (
                    <div>
                      <label>Uploader une image</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      {lesson.valeur && (
                        <img
                          src={lesson.valeur}
                          alt="Uploaded"
                          className="w-1/2 mx-auto"
                        />
                      )}
                    </div>
                  )}
                  <label className="block">
                    Position :
                    <select
                      name="position"
                      value={lesson.position}
                      onChange={(e) => handleInputChange(index, e)}
                      className="bg-gray-200 w-1/2 mx-auto text-center rounded-md"
                    >
                      {Array.from({ length: lessonData.length }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Type de contenu :
                    <select
                      name="isOne"
                      value={lesson.isOne}
                      onChange={(e) => handleInputChange(index, e)}
                      className="bg-gray-200 w-1/2 mx-auto text-center rounded-md"
                    >
                      <option value={1}>Texte</option>
                      <option value={2}>Image</option>
                    </select>
                  </label>
                  <button
                    onClick={() => removeContent(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Supprimer
                  </button>
                  <hr />
                </div>
              ))}
              <button
                onClick={addNewContent}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Ajouter un contenu
              </button>
              <button
                onClick={handleAddLesson}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Ajouter la leçon
              </button>
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

export default ModalAddLesson;
