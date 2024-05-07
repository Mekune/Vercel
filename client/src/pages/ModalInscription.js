// ModalInscription.js

// 314
// 1592
// 6535
// 8979
// 3238
// 4626
import React, { useState, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import axios from "axios";

const ModalInscription = ({ show, onClose }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { Ilogin } = useContext(AuthContext);
  const [Index, setIndex] = useState();
  const [codeList, setCodeList] = useState(["la", "la"]);
  // const codesList = "3141592653";

  useEffect(() => {
    const getInscriptionPasswordListe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/InscriptionPassword"
        );
        const newListe = response.data.liste.map((element) =>
          element.toString()
        );
        setCodeList(newListe);
      } catch (error) {
        console.error("Login failed:", error.response.data);
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    };

    const getIndex = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/IndexInscriptionPassword"
        );
        setIndex(response.data.Index);
      } catch (error) {
        console.error("Login failed:", error.response.data);
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    };

    getIndex();
    getInscriptionPasswordListe(); // Appel de la fonction sans passer d'événement
  }, []);

  const putIndex = async () => {
    try {
      let newValue = Index;
      newValue++;
      if (newValue >= codeList.length) {
        newValue = 0;
      }
      const response = await axios.put(
        `http://localhost:3001/IndexInscriptionPassword/${newValue}`
      );
      setIndex(response.data.i);
    } catch (error) {
      console.error("Failed to update index:", error.response.data);
      setError("Échec de la mise à jour de l'index. Veuillez réessayer.");
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleValidateCode = () => {
    if (codeList[Index] == code && code != "") {
      putIndex();
      Ilogin();
      history.push("/Inscription");
    } else {
      setError("Clé incorrect. Veuillez réessayer.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleValidateCode();
    }
  };

  return (
    <Transition
      show={!!show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {(ref) => (
        <div
          ref={ref}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <form
            className="bg-white p-8 rounded-lg z-50"
            onSubmit={(e) => {
              e.preventDefault();
              handleValidateCode();
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
            <input
              type="text"
              placeholder="Entrez le code de sécurité"
              value={code}
              onChange={handleCodeChange}
              onKeyPress={handleKeyPress} // Gestionnaire pour la touche "Entrée"
              className="mb-4 px-4 py-2 w-52 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
            >
              Valider
            </button>
            <button
              onClick={onClose}
              type="button" // Définir le type de bouton sur "button"
              className="px-4 py-2 bg-gray-400 text-white rounded-md mt-4 ml-2"
            >
              Annuler
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      )}
    </Transition>
  );
};

export default ModalInscription;
