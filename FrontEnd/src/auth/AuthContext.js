// AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [accessInscription, setAccessInscription] = useState(
    localStorage.getItem("accessInscription") === "true"
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  const Ilogin = () => {
    setAccessInscription(true);
    localStorage.setItem("accessInscription", "true");
  };

  const Ilogout = () => {
    setAccessInscription(false);
    localStorage.setItem("accessInscription", "false");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        accessInscription,
        Ilogin,
        Ilogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
