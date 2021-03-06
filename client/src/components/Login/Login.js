import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300
    }
  }
}));

const Login = ({ login, history, setIsLoading }) => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const { username, password } = credentials;

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    await login(credentials);
    setIsLoading(false);
    history.push("/dash");
  };

  return (
    <div data-test="loginContainer">
      <h1 data-test="loginTitle">Log In</h1>
      <form
        data-test="loginForm"
        onSubmit={handleSubmit}
        className={classes.root}
      >
        <TextField
          data-test="usernameField"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChanges}
          required
        />
        <br />
        <TextField
          data-test="passwordField"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChanges}
          required
        />

        <br />
        <Button
          data-test="loginSubmitButton"
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
