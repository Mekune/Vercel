import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { Scrollbars } from "react-custom-scrollbars"; // Import du composant Scrollbars
import ProtectedRoute from "./auth/ProtectedRoute";
import ProtectedInscriptionRoute from "./auth/ProtectedInscriptionRoute";
import Home from "./pages/Home";
import Théorie_musical from "./pages/Théorie_musical";
import Création_musical from "./pages/Création_musical";
import MAO from "./pages/MAO";
import Connexion from "./pages/Authentification/Connexion";
import Inscription from "./pages/Authentification/Inscription";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Scrollbars style={{ width: "100%", height: "100vh" }}>
          <Switch>
            <Route path="/Connexion" component={Connexion} />
            <ProtectedRoute path="/Home" component={Home} />
            <ProtectedRoute
              path="/Théorie_musical"
              component={Théorie_musical}
            />
            <ProtectedRoute
              path="/Création_musical"
              component={Création_musical}
            />
            <ProtectedRoute path="/MAO" component={MAO} />
            <ProtectedInscriptionRoute
              path="/Inscription"
              component={Inscription}
            />
            <Redirect from="/" to="/Connexion" />
          </Switch>
        </Scrollbars>
      </Router>
    </AuthProvider>
  );
}

export default App;
