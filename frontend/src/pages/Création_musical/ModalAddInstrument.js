import React, { useState, useEffect } from "react";
import axios from "axios";
import Oeil from "../../ressources/image/oeil.png";
import OeilB from "../../ressources/image/oeilB.png";

export default function ModalAddInstrument({ isOpen, onClose }) {
  const [instrument, setInstrument] = useState("");
  const [error, setError] = useState("");
  const [availableInstruments, setAvailableInstruments] = useState([]);
  const id = "6615088d7039689985590873"; // ID spécifié pour la requête PUT
  const [wouldDelete, setWouldDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/listeInstruments`
        );
        const sortedInstruments = response.data.sort();
        setAvailableInstruments(sortedInstruments);
      } catch (error) {
        console.error("Error fetching instruments:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedInstrument =
        instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase();

      // Vérifier si l'instrument existe déjà
      if (availableInstruments.includes(formattedInstrument)) {
        setError("Cet instrument existe déjà");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/listeInstruments/modify/${id}`,
        { instrument: formattedInstrument }
      );
      setInstrument("");
      onClose();
      window.location.reload(); // Rafraîchir la page après succès
    } catch (error) {
      console.error("Error adding instrument:", error);
      setError("Error adding instrument. Please try again later.");
    }
  };

  const handleInstrumentClick = async (instrumentIndex) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/listeInstruments/delete/${instrumentIndex}`
      );
      setAvailableInstruments((prevInstruments) =>
        prevInstruments.filter((inst, index) => index !== instrumentIndex)
      );
    } catch (error) {
      console.error("Error deleting instrument:", error);
      setError("Error deleting instrument. Please try again later.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto text-black">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                        Ajouter un instrument
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mt-5"
                          placeholder="Nom de l'instrument"
                          value={instrument}
                          onChange={(e) => setInstrument(e.target.value)}
                          required
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    Ajouter
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="absolute right-5 top-0 px-3 py-1 bg-red-600 text-white rounded-full mt-4 ml-2"
                  >
                    X
                  </button>
                </div>
              </form>
              <div className="mt-4">
                <div className="flex justify-center items-center">
                  <h2 className="text-lg font-bold mb-2 ml-2">
                    Liste des instruments (cliquer pour supprimer)
                  </h2>
                  <button
                    onClick={() => setWouldDelete(!wouldDelete)}
                    className="w-5 text-center ml-3 "
                  >
                    {wouldDelete ? (
                      <img src={Oeil} alt="Oeil" />
                    ) : (
                      <img src={OeilB} alt="OeilB" />
                    )}
                  </button>
                </div>
                {wouldDelete && (
                  <div className="flex justify-center">
                    <ul className="text-center flex flex-col">
                      {availableInstruments
                        .slice(0, Math.ceil(availableInstruments.length / 2))
                        .map((availableInstrument, index) => (
                          <li
                            key={index}
                            className="text-blue-700 cursor-pointer m-3"
                            onClick={() => handleInstrumentClick(index)}
                          >
                            {availableInstrument}
                          </li>
                        ))}
                    </ul>
                    <ul className="text-center flex flex-col">
                      {availableInstruments
                        .slice(Math.ceil(availableInstruments.length / 2))
                        .map((availableInstrument, index) => (
                          <li
                            key={index}
                            className="text-blue-700 cursor-pointer m-3"
                            onClick={() => handleInstrumentClick(index)}
                          >
                            {availableInstrument}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
