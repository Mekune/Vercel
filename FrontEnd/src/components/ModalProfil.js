import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import de Framer Motion
import Oeil from "../ressources/image/oeil.png";
import OeilB from "../ressources/image/oeilB.png";

const ModalProfil = ({ show, onClose }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [password2, setPassword2] = useState("");
  const [value, setValue] = useState("");
  const [storedUsername, setStoredUsername] = useState("");
  const [modify, setModify] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour indiquer si le mot de passe doit être affiché
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("Admin") === "true"
  );

  useEffect(() => {
    const username = localStorage.getItem("Username");
    setStoredUsername(username);
    setValue(username);
  }, []);

  const getIdByUsername = async (username) => {
    try {
      const response = await axios.get(
        `${process.env.FRONT_URL}/users/id/${username}`
      );
      return response.data.userId;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const userId = await getIdByUsername(storedUsername);
      const response = await axios.put(
        `${REACT_APP_BACK_URL}/users/${userId}`,
        {
          acutalUsername: localStorage.getItem("Username"),
          username: value,
          password: password2,
        }
      );
      setError("");
      setMessage("Modification réussie !");
      localStorage.setItem("Username", value);
      setStoredUsername(value);
      history.push("/home");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("Erreur lors de la communication avec le serveur");
      } else {
        setError("Erreur lors de la requête vers le serveur");
      }
      setMessage("");
    }
  };

  const toggleModify = () => {
    setModify(!modify);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Inversion de la valeur de l'état pour basculer l'affichage du mot de passe
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    localStorage.setItem("Admin", !isAdmin);
    window.location.reload(); // Rafraîchir toute la page
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
          className="fixed text-gray-800 inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <form
            onSubmit={handleUpdateUser}
            className="relative flex flex-col bg-white p-8 rounded-lg z-50 w-[30em] h-[30em]"
          >
            <h2 className="text-2xl text-center">
              Bonjour <p className="underline inline">{storedUsername}</p> !
            </h2>
            <button
              onClick={() => {
                onClose();
                setModify(false);
                setMessage("");
                setError("");
                setValue(storedUsername);
                setPassword2("");
              }}
              type="button"
              className="absolute right-5 top-0 px-3 py-1 bg-red-600 text-white rounded-full mt-4 ml-2"
            >
              X
            </button>
            {!modify && (
              <div className="text-center mt-36">Que puis-je pour toi ?</div>
            )}
            {modify && (
              <>
                <p>Identifiant :</p>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mb-4 px-4 py-2 w-52 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                />
                <p>Mot de passe :</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Condition pour afficher le mot de passe en clair ou masqué
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="mb-4 px-4 py-2 w-52 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                  />
                  <motion.button
                    type="button"
                    onClick={toggleShowPassword} // Gérer le clic sur le bouton pour basculer l'affichage du mot de passe
                    className="absolute left-44 w-6 right-4 top-6 transform -translate-y-1/2 focus:outline-none"
                  >
                    {" "}
                    <img
                      src={showPassword ? Oeil : OeilB}
                      alt="Afficher/Masquer mot de passe"
                      className="w-6 h-6 -mt-2 text-gray-400 hover:text-gray-600"
                    />
                  </motion.button>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                >
                  Modifier
                </button>
              </>
            )}
            <button
              type="button"
              onClick={toggleModify}
              className="absolute bottom-5 left-5 w-52 px-4 py-2 bg-gray-400 text-white rounded-md mt-4"
            >
              {modify ? "Annuler la modification" : "Modifier le profil"}
            </button>
            <button
              type="button"
              onClick={toggleAdmin}
              className={`absolute bottom-5 right-5 w-52 px-4 py-2 rounded-md mt-4 transition duration-300 ${
                isAdmin
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isAdmin ? "Mode Utilisateur" : "Mode Admin"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
          </form>
        </div>
      )}
    </Transition>
  );
};

export default ModalProfil;
