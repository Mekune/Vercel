// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import ProtectedInscriptionRoute from "./auth/ProtectedInscriptionRoute";
import Home from "./pages/Home";
import Théorie_musical from "./pages/Théorie_musical";
import Création_musical from "./pages/Création_musical";
import MAO from "./pages/MAO";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/Connexion" component={Connexion} />
          <ProtectedRoute path="/Home" component={Home} />
          <ProtectedRoute path="/Théorie_musical" component={Théorie_musical} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
