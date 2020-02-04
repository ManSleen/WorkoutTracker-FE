import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 100,
      verticalAlign: "middle"
    }
  }
}));

const SetForm = ({
  exerciseId,
  workoutId,
  getWorkout,
  isEditing,
  set,
  setIsEditing
}) => {
  const classes = useStyles();

  const handleChanges = e => {
    setSetInfo({ ...setInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(setInfo);
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().post(
        `/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}/sets`,
        setInfo
      );
      setSetInfo({
        number: "",
        weight: "",
        reps: "",
        completed: false
      });
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const updateSet = async e => {
    e.preventDefault();
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().put(
        `/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}/sets/${set._id}`,
        setInfo
      );
      setIsEditing(false);
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const [setInfo, setSetInfo] = useState({
    number: isEditing ? set.number : "",
    weight: isEditing ? set.weight : "",
    reps: isEditing ? set.reps : "",
    completed: isEditing ? set.completed : false
  });

  const { number, weight, reps } = setInfo;

  return (
    <div style={{ margin: "0 auto" }}>
      <form className={classes.root}>
        <TextField
          type="number"
          placeholder="Set Number"
          name="number"
          value={number}
          onChange={handleChanges}
        />

        <TextField
          type="number"
          placeholder="Reps"
          name="reps"
          value={reps}
          onChange={handleChanges}
        />
        <TextField
          type="number"
          placeholder="Weight (lbs)"
          name="weight"
          value={weight}
          onChange={handleChanges}
        />
        {isEditing ? (
          <CheckRoundedIcon onClick={updateSet} />
        ) : (
          <AddIcon onClick={handleSubmit} />
        )}
      </form>
    </div>
  );
};

export default SetForm;
