import React from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "left"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = ({ history }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            edge="start"
            title="title"
            color="inherit"
            className={classes.title}
          >
            Workout Tracker
          </Typography>

          {localStorage.getItem("token") ? (
            <>
              <Link to="/dash">Dashboard</Link>
              <button
                onClick={() => {
                  history.push("/");
                  localStorage.clear();
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Log In</Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
