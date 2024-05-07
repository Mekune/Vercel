// ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { accessInscription } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        accessInscription ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Connexion" />
        )
      }
    />
  );
};
export default ProtectedRoute;
