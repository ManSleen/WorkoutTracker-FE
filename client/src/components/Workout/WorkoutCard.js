import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

const WorkoutCard = ({ workout, deleteWorkout, updateWorkout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({});

  useEffect(() => {
    setWorkoutInfo({
      name: workout.name,
      duration: workout.duration,
      date: workout.date
    });
  }, []);

  const handleChanges = e => {
    setWorkoutInfo({ ...workoutInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ListItem
        button
        component={props => <Link to={`/workout/${workout._id}`} {...props} />}
      >
        {isEditing ? (
          <div>
            <form>
              <TextField
                autoComplete="off"
                name="name"
                onChange={handleChanges}
                value={workoutInfo.name}
              />
              <br />
              <TextField
                autoComplete="off"
                name="duration"
                onChange={handleChanges}
                value={workoutInfo.duration}
                type="number"
              />
              <br />
              <TextField
                autoComplete="off"
                name="date"
                onChange={handleChanges}
                value={workoutInfo.date}
                type="date"
              />
            </form>
          </div>
        ) : (
          <ListItemText
            primary={workout.name}
            secondary={`${
              workout.exercises.length === 1
                ? `${workout.exercises.length} exercise`
                : workout.exercises.length > 1
                ? `${workout.exercises.length} exercises`
                : "No exercises in this workout"
            } - ${workout.date.substr(0, 10)}`}
          />
        )}

        <ListItemSecondaryAction>
          <ListItemIcon onClick={() => deleteWorkout(workout._id)}>
            <DeleteIcon />
          </ListItemIcon>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default WorkoutCard;
