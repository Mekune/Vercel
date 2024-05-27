import React, { useState, useEffect } from "react";
import axios from "axios";
import BackHome from "../../components/BackHome";
import ModalGenre from "./ModalGenre";
import ModalAddGenre from "./ModalAddGenre";
import ModalAddInstrument from "./ModalAddInstrument"; // Ajout de l'import pour le composant ModalAddInstrument
import Profil from "../../components/Profil";
import Loading from "../../components/Loading";

export default function Création_musical() {
  const [genres, setGenres] = useState([null]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalInstrumentOpen, setIsModalInstrumentOpen] = useState(false); // Correction du nom de l'état
  const [isPending, setIsPending] = useState(true);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("Admin") === "true"
  );
  const Duration = 300;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/genres`
        );
        const sortedGenres = response.data.sort((a, b) =>
          a.Titre.localeCompare(b.Titre)
        );
        setIsPending(false);
        setGenres(sortedGenres);
        setFilteredGenres(sortedGenres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (genre) => {
    setSelectedGenre(genre);
  };

  const handleCloseModal = () => {
    setSelectedGenre(null);
    setIsModalOpen(false);
    setIsModalInstrumentOpen(false); // Fermeture du modal d'ajout d'instrument
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterGenres(e.target.value);
  };

  const filterGenres = (searchTerm) => {
    const filtered = genres.filter((genre) =>
      genre.Titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGenres(filtered);
  };

  const handleAddGenre = () => {
    setIsModalOpen(true);
  };

  const handleAddInstrument = () => {
    setIsModalInstrumentOpen(true); // Ouverture du modal d'ajout d'instrument
  };

  const updateAdminState = () => {
    setIsAdmin(!isAdmin);
    localStorage.setItem("Admin", !isAdmin);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen  text-gray-200">
      <BackHome />
      <Profil />
      <div
        className={`creation-musical-container ${
          isPending ? "fade-out" : "fade-in"
        }`}
      >
        <h1
          className="mb-10 pt-[1em] text-gray-300 text-8xl font-bold text-center"
          style={{ textShadow: "10px 5px 0px rgba(0, 0, 0, 1)" }}
        >
          Création Musical
        </h1>
        <div className="flex items-center justify-center -mb-12 text-black">
          <input
            type="text"
            placeholder="Rechercher par titre de genre..."
            className="border border-gray-300 rounded-md p-2  md:mb-0 md:mr-4 w-[20rem]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {isAdmin && (
          <article className="fixed flex flex-col items-center bottom-5 right-5">
            <button
              className={` fixed bottom-4 right-5s z-10 text-white font-bold py-2 px-4 rounded-full bg-green-600  mt-4 ml-2 hover:bg-green-400 transition duration-${Duration}`}
              onClick={handleAddGenre}
            >
              +
            </button>
            <button
              className={`fixed bottom-16 right-5 text-white font-bold py-2 px-3 rounded-full bg-green-600  mt-4 ml-2 hover:bg-green-400 transition duration-${Duration}`}
              onClick={handleAddInstrument}
            >
              🎹
            </button>
          </article>
        )}
        <article className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 pt-20 pb-20 pl-10 pr-10">
          {filteredGenres.map((genre) => (
            <div
              onClick={() => handleOpenModal(genre)}
              key={genre._id}
              id="cloud"
              className="relative shadow-2xl shadow-gray-500 rounded-[6em] w-[20em] h-[13em] flex justify-center items-center cursor-pointer hover:opacity-75 hover:scale-105 transition-all"
              style={{ marginBottom: "2rem" }}
            >
              <h2 className="text-gray-900 font-bold text-3xl">
                {genre.Titre}
              </h2>
            </div>
          ))}
        </article>
        <ModalAddGenre
          Duration={Duration}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
        <ModalAddInstrument
          Duration={Duration}
          onClose={handleCloseModal}
          isOpen={isModalInstrumentOpen} // Propriété isOpen renommée correctement
        />
        <ModalGenre
          genre={selectedGenre}
          Duration={Duration}
          onClose={handleCloseModal}
        />
      </div>
      {isPending && <Loading />}
    </section>
  );
}
