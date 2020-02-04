import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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

const ExerciseForm = ({ workoutId, getWorkout }) => {
  const classes = useStyles();

  const [exercise, setExercise] = useState({
    name: ""
  });

  const handleChanges = e => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const addExercise = async exercise => {
    try {
      const userId = localStorage.getItem("user");
      await axiosWithAuth().post(
        `/users/${userId}/workouts/${workoutId}/exercises`,
        exercise
      );
      setExercise({ name: "" });
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addExercise(exercise);
  };

  const { name } = exercise;
  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <Container maxWidth="sm">
        <Typography>Add an Exercise</Typography>
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            type="text"
            placeholder="Exercise Name"
            name="name"
            value={name}
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
            Add Exercise
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ExerciseForm;
