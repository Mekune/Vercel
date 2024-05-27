import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MAO from "../ressources/image/Mao2.png";
import Théorie_musical from "../ressources/image/TheorieMusical.png";
import CreationMusical from "../ressources/image/CreationMusical.png";
import Exit from "../components/Exit";
import Profil from "../components/Profil";
import AuthContext from "../auth/AuthContext";

const linksData = [
  {
    to: "/Théorie_musical",
    text: "Théorie Musicale",
    image: Théorie_musical,
  },
  {
    to: "/Création_musical",
    text: "Création Musicale",
    image: CreationMusical,
  },
  {
    to: "/MAO",
    text: "MAO",
    image: MAO,
  },
];

export default function Home() {
  const { Ilogout } = useContext(AuthContext);

  useEffect(() => {
    Ilogout();
  }, []);

  return (
    <section className="flex flex-col items-center h-screen text-gray-200 md:gap-0 lg:gap-32">
      <div className="mb-10">
        <h1
          className="mb-4 pt-[1em] text-gray-300 text-8xl font-bold text-center"
          style={{ textShadow: "10px 5px 0px rgba(0, 0, 0, 1)" }}
        >
          BeatLab
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-20">
        {linksData.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="relative pl-2 pr-2 gradient rounded-3xl"
            // ["#222A39", "#3A598D"], // Dégradé bleu clair
            // ["#3A598D", "#222A39"],
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-col items-center justify-cente p-6">
              <img
                className="h-48 mb-4 hover:scale-105 hover:opacity-75 transition duration-300"
                src={link.image}
                alt={link.text}
              />
              <h2 className="text-xl font-bold text-center">{link.text}</h2>
            </div>
          </Link>
        ))}
      </div>
      <Exit />
      <Profil />
    </section>
  );
}
