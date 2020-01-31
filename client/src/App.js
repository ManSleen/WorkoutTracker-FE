import React from "react";
import LandingPage from "./components/LandingPage.js";
import Dashboard from "./components/Dashboard.js";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">Workout Tracker</header>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dash" component={Dashboard} />
    </div>
  );
}

export default App;
