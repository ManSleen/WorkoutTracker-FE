import React, { useState, useEffect } from "react";

import Set from "./Set";
import SetForm from "./SetForm";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: "50px"
  }
}));

const Exercise = ({ exercise, workoutId, getWorkout }) => {
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    console.log("clicked exercise!");
    console.log(open);
  };

  useEffect(() => {
    setExerciseName(exercise.name);
  }, [exercise]);

  const deleteExercise = async e => {
    e.preventDefault();
    console.log("clicked delete exercise!");
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().delete(
        `/users/${userId}/workouts/${workoutId}/exercises/${exercise._id}`
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const updateExercise = async e => {
    e.preventDefault();
    console.log(exerciseName);
    const userId = localStorage.getItem("user");
    const exerciseObj = { name: exerciseName };
    try {
      await axiosWithAuth().put(
        `/users/${userId}/workouts/${workoutId}/exercises/${exercise._id}`,
        exerciseObj
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanges = e => {
    setExerciseName(e.target.value);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        {isEditing ? (
          <TextField
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={handleChanges}
            type="text"
            value={exerciseName}
          />
        ) : (
          <>
            <ListItemIcon>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>

            <ListItemText primary={exercise.name} />

            <ListItemIcon
              onClick={e => {
                setIsEditing(true);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <EditIcon />
            </ListItemIcon>
            <ListItemIcon
              onClick={e => {
                deleteExercise(e);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <DeleteIcon />
            </ListItemIcon>
          </>
        )}
        <span>
          {isEditing && (
            <CheckRoundedIcon
              onClick={e => {
                setIsEditing(!isEditing);
                updateExercise(e);
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          )}
        </span>

        <Divider />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {exercise.sets.length > 0 &&
          exercise.sets
            .sort((a, b) => a.number - b.number)
            .map(set => (
              <Set
                exerciseId={exercise._id}
                workoutId={workoutId}
                key={set._id}
                set={set}
                getWorkout={getWorkout}
              />
            ))}
        <ListItem>
          <SetForm
            getWorkout={getWorkout}
            exerciseId={exercise._id}
            workoutId={workoutId}
          />
        </ListItem>
      </Collapse>
    </div>
  );
};

export default Exercise;
