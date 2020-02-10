import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { axiosWithAuth } from "./util/axiosWithAuth";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Workout from "./components/Workout/Workout";
import NavBar from "./components/NavBar/NavBar";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  margin: 0 auto;
  background-color: none;
  position: absolute;
  top: 45%;
  left: 48%;
  color: #2196f3;
`;

function App() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const login = async user => {
    setIsLoading(true);
    try {
      const res = await axiosWithAuth().post("/auth/login", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user._id);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const register = async user => {
    setIsLoading(true);
    try {
      const res = await axiosWithAuth().post("/auth/register", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user._id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <NavBar isLoading={isLoading} />
      {isLoading && (
        <div className="loader-container">
          <PulseLoader
            css={override}
            size={20}
            color={"#2196f3"}
            loading={isLoading}
            margin={3}
          />
        </div>
      )}

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/login"
          render={props => (
            <Login setIsLoading={setIsLoading} login={login} {...props} />
          )}
        />
        <Route
          exact
          path="/register"
          render={props => (
            <Register
              setIsLoading={setIsLoading}
              register={register}
              {...props}
            />
          )}
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
