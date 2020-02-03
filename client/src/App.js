import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { axiosWithAuth } from "./util/axiosWithAuth";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage.js";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Workout from "./components/Workout/Workout";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const login = async user => {
    try {
      setIsLoading(true);
      const res = await axiosWithAuth().post("/auth/login", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user._id);
      setUser(res.data.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async user => {
    setIsLoading(true);
    try {
      await axiosWithAuth().post("/auth/register", user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <NavBar />
      {isLoading && <div>LOADING.....</div>}
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
        <ProtectedRoute
          exact
          path="/dash"
          component={Dashboard}
          user={user}
          setIsLoading={setIsLoading}
        />
        <ProtectedRoute
          exact
          path="/workout/:workoutId"
          component={Workout}
          user={user}
          setIsLoading={setIsLoading}
        />
        <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
      </Switch>
    </div>
  );
}

export default App;
