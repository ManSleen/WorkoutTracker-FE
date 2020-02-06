import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const LandingPage = ({ history }) => {
  const classes = useStyles();

  return (
    <div data-test="landingContainer" className="landing-container">
      {localStorage.getItem("token") && history.push("/dash")}
      <Container maxWidth="sm">
        <h1 data-test="landingTitle">
          Sign Up or Log In
          <br /> to start tracking your workouts
        </h1>
        <Button
          data-test="signUpButton"
          variant="contained"
          component={Link}
          to={"/register"}
          color="primary"
          className={classes.button}
          size="large"
        >
          Sign Up
        </Button>
        <br />

        <Button
          data-test="logInButton"
          variant="contained"
          component={Link}
          to={"/login"}
          color="primary"
          className={classes.button}
          size="large"
        >
          Log In
        </Button>
      </Container>
    </div>
  );
};

export default LandingPage;
