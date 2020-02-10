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

const Register = ({ register, history, setIsLoading }) => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    bio: ""
  });

  const { username, password, bio } = credentials;

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    await register(credentials);
    history.push("/dash");
    setIsLoading(false);
  };

  return (
    <div data-test="registerContainer">
      <h1 data-test="registerTitle">Sign Up</h1>
      <form
        data-test="registerForm"
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
        <TextField
          data-test="bioField"
          name="bio"
          placeholder="Bio"
          value={bio}
          onChange={handleChanges}
          multiline
          rows="4"
          required
        />
        <br />

        <Button
          data-test="registerSubmitButton"
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          type="submit"
        >
          Sign Me Up!
        </Button>
      </form>
    </div>
  );
};

export default Register;
