import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { axiosWithAuth } from "./util/axiosWithAuth";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.scss";
import LandingPage from "./components/LandingPage.js";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

function App() {
  const [user, setUser] = useState();

  const login = async user => {
    try {
      const res = await axiosWithAuth().post("/auth/login", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user._id));
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async user => {
    try {
      await axiosWithAuth().post("/auth/register", user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">Workout Tracker</header>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/login"
          render={props => <Login login={login} {...props} />}
        />
        <Route
          exact
          path="/register"
          render={props => <Register register={register} {...props} />}
        />
        <ProtectedRoute exact path="/dash" component={Dashboard} user={user} />
        <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
      </Switch>
    </div>
  );
}

export default App;
