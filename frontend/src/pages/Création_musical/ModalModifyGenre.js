import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";

const ModalModifyGenre = ({ genre, Duration, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    Titre: "",
    Description: "",
    BPM: "",
    Exemple: "",
    availableInstruments: [],
    selectedInstruments: [],
  });
  const [errors, setErrors] = useState({
    Titre: "",
    Description: "",
    BPM: "",
    Instruments: "",
    Exemple: "",
  });
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const id = genre._id;
        console.log("id" + id);
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/genres/instruments/${id}`
        );
        if (response.data) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            availableInstruments: response.data.sort(),
          }));
        }
      } catch (error) {
        console.error("Error fetching instruments:", error);
      }
    };

    fetchInstruments();

    if (genre) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Titre: genre.Titre,
        Description: genre.Description,
        BPM: genre.BPM,
        Exemple: genre.Exemple,
        selectedInstruments: genre.Instrument,
      }));
    }
  }, [genre]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Titre") {
      const uppercaseValue = value.toUpperCase(); // Convertir en majuscules
      setFormData({
        ...formData,
        [name]: uppercaseValue,
      });
    } else if (name === "BPM") {
      const bpmValue = parseInt(value);
      if (!isNaN(bpmValue) && bpmValue >= 1 && bpmValue <= 500) {
        setFormData({
          ...formData,
          [name]: bpmValue,
        });
        setErrors({
          ...errors,
          [name]: "",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "Le BPM doit être compris entre 1 et 500",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleInstrumentSelection = (instrument) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableInstruments: prevFormData.availableInstruments.filter(
        (item) => item !== instrument
      ),
      selectedInstruments: [
        ...prevFormData.selectedInstruments,
        instrument,
      ].sort(),
    }));
    setErrors({
      ...errors,
      Instruments: "",
    });
  };

  const handleRemoveInstrument = (instrument) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedInstruments: prevFormData.selectedInstruments.filter(
        (item) => item !== instrument
      ),
      availableInstruments: [
        ...prevFormData.availableInstruments,
        instrument,
      ].sort(),
    }));
  };

  const handleModifyGenre = async (e) => {
    e.preventDefault();

    if (formData.selectedInstruments.length === 0) {
      setErrors({
        ...errors,
        Instruments: "Veuillez sélectionner au moins un instrument",
      });
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/genres/update/${genre._id}`,
        {
          Titre: formData.Titre,
          Description: formData.Description,
          BPM: formData.BPM,
          Instrument: formData.selectedInstruments,
          Exemple: formData.Exemple,
          LastUserModify: localStorage.getItem("Username"), // Ajout du nom de l'utilisateur
          Date: new Date(), // Ajout de la date
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onClose();
        localStorage.setItem("isAdmin", true); // Mettre à jour le statut de isAdmin à true
        window.location.reload();
      } else {
        console.error("Erreur lors de la modification du genre");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du genre :", error);
    }
  };

  return (
    <Transition
      show={isOpen}
      enter={`transition-opacity duration-${Duration}`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`transition-opacity duration-${Duration / 2}`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-800">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        <div className="relative bg-gray-300 p-8 rounded-lg z-50 w-4/6 h-4/6 flex flex-col">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Modifier un genre
          </h2>
          <form
            onSubmit={handleModifyGenre}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              name="Titre"
              placeholder="Titre"
              className="bg-gray-200 w-1/2 mx-auto text-center rounded-md"
              onChange={handleInputChange}
              value={formData.Titre}
            />
            {errors.Titre && <p className="text-red-500">{errors.Titre}</p>}
            <textarea
              name="Description"
              placeholder="Description"
              className="bg-gray-200 text-center max-h-32 min-h-6 rounded-md"
              onChange={handleInputChange}
              value={formData.Description}
            ></textarea>
            {errors.Description && (
              <p className="text-red-500">{errors.Description}</p>
            )}
            <input
              type="text"
              name="BPM"
              placeholder="BPM"
              className="bg-gray-200 text-center rounded-md w-22"
              onChange={handleInputChange}
              value={formData.BPM}
            />
            {errors.BPM && <p className="text-red-500">{errors.BPM}</p>}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-2">Instruments disponibles :</label>
                <ul className="border rounded-md p-2 max-h-32 overflow-y-auto">
                  {formData.availableInstruments.map((instrument) => (
                    <li
                      key={instrument}
                      onClick={() => handleInstrumentSelection(instrument)}
                      className="cursor-pointer hover:text-blue-500"
                    >
                      {instrument}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2">
                <label className="block mb-2">Instruments sélectionnés :</label>
                <ul className="border rounded-md p-2 max-h-32 overflow-y-auto">
                  {formData.selectedInstruments.map((instrument) => (
                    <li
                      key={instrument}
                      className="flex items-center justify-between"
                    >
                      <span>{instrument}</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleRemoveInstrument(instrument)}
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {errors.Instruments && (
              <p className="text-red-500">{errors.Instruments}</p>
            )}
            <input
              type="text"
              name="Exemple"
              placeholder="Exemple (lien YouTube : optionnel)"
              className="bg-gray-200 text-center rounded-md w-22"
              onChange={handleInputChange}
              value={formData.Exemple}
            />
            {errors.Exemple && <p className="text-red-500">{errors.Exemple}</p>}
            <div className="flex justify-end">
              <button
                onClick={handleModifyGenre}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md mt-4 -ml-8 hover:bg-blue-400 transition-all duration-${Duration}`}
              >
                Modifier
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="absolute right-5 top-0 px-3 py-1 bg-red-600 text-white rounded-full mt-4 ml-2"
          >
            X
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default ModalModifyGenre;
