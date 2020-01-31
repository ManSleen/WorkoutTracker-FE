import React from "react";
import LandingPage from "./components/LandingPage.js";
import Dashboard from "./components/Dashboard.js";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">Workout Tracker</header>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/dash" component={Dashboard} />
    </div>
  );
}

export default App;
