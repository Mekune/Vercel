import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import AuthContext from "../auth/AuthContext";
import Granim from "granim";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const gradientRef = useRef(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Réinitialiser les messages d'erreur
    setUsernameError("");
    setPasswordError("");
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    // Vérifier si l'identifiant contient des chiffres
    const regex = /\d/;
    if (regex.test(formData.username)) {
      setUsernameError("L'identifiant ne peut contenir de chiffres.");
      return;
    }

    // Vérifier si le mot de passe a au moins 4 caractères
    if (formData.password.length < 4) {
      setPasswordError("Le mot de passe doit contenir au moins 4 caractères.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/users/add",
        formData
      );
      localStorage.setItem("Username", formData.username);
      login();
      history.push("/home");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <section className="h-screen relative">
      <h1
        className="mb-4 text-gray-300 text-8xl font-bold pt-12 text-center"
        style={{ textShadow: "10px 5px 0px rgba(0, 0, 0, 1)" }}
      >
        Inscription
      </h1>
      <form
        onSubmit={handleRegisterClick}
        className="flex flex-col w-[20em] mx-auto my-[10em] items-center bg-gray-800 rounded-xl p-10 shadow-md relative"
        style={{
          background: "linear-gradient(145deg, #222A39, #3A598D)",
        }}
      >
        <canvas
          id="granim-canvas"
          className="absolute top-0 left-0 w-full h-full -z-10 rounded-xl"
          ref={gradientRef}
        ></canvas>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 w-52 m-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
        {usernameError && <p className="text-red-500">{usernameError}</p>}
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 w-52 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          S'inscrire
        </button>
        <Link to="Connexion" className="text-blue-500 mt-2">
          Se connecter
        </Link>
      </form>
    </section>
  );
};

export default LoginForm;
