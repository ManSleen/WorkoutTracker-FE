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

const Login = ({ login, history }) => {
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
    e.preventDefault();
    await login(credentials);
    history.push("/dash");
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChanges}
          required
        />
        <br />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChanges}
          required
        />

        <br />
        <Button
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
