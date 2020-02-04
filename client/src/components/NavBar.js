import React from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    flexGrow: 1
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
          <FitnessCenterIcon />
          <Typography
            variant="h6"
            title="Workout Tracker"
            color="inherit"
            className={classes.title}
          >
            <Link to="/dash">Workout Tracker</Link>
          </Typography>

          {localStorage.getItem("token") && (
            <>
              <ExitToAppIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/");
                  localStorage.clear();
                }}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
