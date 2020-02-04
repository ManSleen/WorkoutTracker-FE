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

const Register = ({ register, history }) => {
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
    e.preventDefault();
    await register(credentials);
    history.push("/login");
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <TextField
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
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
