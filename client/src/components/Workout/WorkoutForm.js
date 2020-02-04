import React, { useState, useContext } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { UserContext } from "../../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300
    }
  },
  button: {
    margin: theme.spacing(2)
  }
}));

const WorkoutForm = ({ setShowForm }) => {
  const classes = useStyles();

  const [workout, setWorkout] = useState({
    name: "",
    duration: "",
    date: Date.now()
  });

  const { userInfo, addWorkout } = useContext(UserContext);

  const handleChanges = e => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addWorkout(workout, userInfo._id);

    setShowForm(false);
    setWorkout({ name: "", duration: 0, date: Date.now() });
  };

  const { name, duration, date } = workout;

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <Container maxWidth="sm">
        <Typography>Add a New Workout</Typography>
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            type="text"
            placeholder="Workout Name"
            name="name"
            value={name}
            onChange={handleChanges}
          />
          <TextField
            type="number"
            placeholder="Duration (mins)"
            name="duration"
            value={duration}
            onChange={handleChanges}
          />
          <TextField
            type="date"
            placeholder="Date"
            name="date"
            value={date}
            onChange={handleChanges}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            type="submit"
          >
            Add Workout
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default WorkoutForm;
