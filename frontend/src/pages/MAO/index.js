import React, { useState, useEffect } from "react";
import axios from "axios";
import BackHome from "../../components/BackHome";
import ModalLesson from "./ModalLesson";
import ModalAddLesson from "./ModalAddLesson";
import ModalModifyLesson from "./ModalModifyLesson";
import Profil from "../../components/Profil";
import Loading from "../../components/Loading";

const TheorieMusical = () => {
  const [lesson, setLesson] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("Admin") === "true"
  );
  const Duration = 300;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/Mao`
        );
        const sortedLessons = response.data.sort((a, b) =>
          a.Titre.localeCompare(b.Titre)
        );
        setIsPending(false);
        setLesson(sortedLessons);
        setFilteredLessons(sortedLessons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterLessons(e.target.value);
  };

  const filterLessons = (searchTerm) => {
    const filtered = lesson.filter((lesson) =>
      lesson.Titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLessons(filtered);
  };

  const handleAddLesson = () => {
    setIsModalOpen(true);
  };

  const updateAdminState = () => {
    setIsAdmin(!isAdmin);
    localStorage.setItem("Admin", !isAdmin);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-gray-200">
      <BackHome />
      <Profil />
      {isPending && <Loading />}
      <div
        className={`creation-musical-container ${
          isPending ? "fade-out" : "fade-in"
        }`}
      >
        <h1
          className="mb-4 text-gray-300 text-8xl font-bold pt-12 text-center"
          style={{ textShadow: "10px 5px 0px rgba(0, 0, 0, 1)" }}
        >
          Théorie Musicale
        </h1>
        <div className="flex items-center justify-center mb-8 text-black">
          <input
            type="text"
            placeholder="Rechercher par titre du cours..."
            className="border border-gray-300 rounded-md p-2 md:mb-0 md:mr-4 w-[20rem]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {isAdmin && (
          <article className="flex flex-col items-center">
            <div className="text-4xl font-bold text-gray-300 text-center text-shadow-lg mb-4 pt-12">
              Administrateur
            </div>
            <button
              className={`px-4 py-2 w-1/2 bg-green-600 text-white rounded-md mt-4 ml-2 hover:bg-green-400 transition duration-${Duration}`}
              onClick={handleAddLesson}
            >
              Ajouter
            </button>
          </article>
        )}
        <article className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 pt-20 pb-20 pl-10 pr-10">
          {filteredLessons.map((lesson) => (
            <div
              onClick={() => handleOpenModal(lesson)}
              key={lesson._id}
              id="cloud"
              className="relative bg-indigo-950 shadow-2xl shadow-gray-500 rounded-[6em] w-[20em] h-[13em] flex justify-center items-center cursor-pointer hover:opacity-75 hover:scale-105 transition-all"
              style={{ marginBottom: "2rem" }}
            >
              <h2 className="text-gray-900 font-bold text-3xl">
                {lesson.Titre}
              </h2>
            </div>
          ))}
        </article>
        <ModalAddLesson
          Duration={Duration}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
        <ModalLesson
          lesson={selectedLesson}
          Duration={Duration}
          onClose={handleCloseModal}
        />
        <ModalModifyLesson
          lesson={selectedLesson}
          Duration={Duration}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default TheorieMusical;
