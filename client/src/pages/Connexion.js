import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import AuthContext from "../auth/AuthContext";
import ModalInscription from "./ModalInscription";
import Oeil from "../ressources/image/oeil.png";
import OeilB from "../ressources/image/oeilB.png";
import Granim from "granim";

const Connexion = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const history = useHistory();
  const gradientRef = useRef(null);
  const { login, logout, Ilogout } = useContext(AuthContext);

  useEffect(() => {
    const granimInstance = new Granim({
      element: "#granim-canvas",
      name: "basic-gradient",
      direction: "diagonal",
      opacity: [1, 1],
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ["#222A39", "#3A598D"], // Dégradé bleu clair
            ["#3A598D", "#222A39"], // Dégradé bleu clair
          ],
          transitionSpeed: 2000,
        },
      },
    });

    return () => {
      granimInstance.destroy();
    };
  }, []);

  useEffect(() => {
    Ilogout();
    logout();
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users/connexion`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("Username", username);
      login();
      history.push("/home");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setIsAnimating(true);
  };

  return (
    <section className="h-screen">
      <h1
        className="mb-4 pt-[1em] text-gray-300 text-8xl font-bold text-center"
        style={{ textShadow: "10px 5px 0px rgba(0, 0, 0, 1)" }}
      >
        Connexion
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[20em] h-[20em] mx-auto my-[10em] items-center justify-center rounded-xl p-10 shadow-md gap-1 relative"
      >
        <canvas
          id="granim-canvas"
          className="absolute top-0 left-0 w-full h-full -z-10 rounded-xl"
          ref={gradientRef}
        ></canvas>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 px-4 py-2 w-48 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
        <div className="relative w-48">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
          />
          <motion.button
            type="button"
            onClick={toggleShowPassword}
            animate={{
              scale: isAnimating ? 1.2 : 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className={`absolute right-4 top-5 transform -translate-y-1/2 focus:outline-none ${
              isAnimating ? "pointer-events-none" : ""
            }`}
          >
            <img
              src={showPassword ? Oeil : OeilB}
              alt="Afficher/Masquer mot de passe"
              className="w-6 h-6 -mt-3 text-gray-400 hover:text-gray-600"
            />
          </motion.button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="px-6 py-3 mt-5 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Se connecter
          </button>
          <p
            onClick={handleOpenModal}
            className="text-blue-500 mt-2 cursor-pointer"
          >
            S'inscrire
          </p>
        </div>
      </form>
      <ModalInscription show={showModal} onClose={handleCloseModal} />
    </section>
  );
};

export default Connexion;
