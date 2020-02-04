import React from "react";

import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";

const WorkoutCard = ({ workout, deleteWorkout }) => {
  return (
    <>
      <ListItem
        button
        component={props => <Link to={`/workout/${workout._id}`} {...props} />}
      >
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

        <ListItemIcon
          style={{ minWidth: 0 }}
          onClick={e => {
            deleteWorkout(workout._id);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DeleteIcon />
        </ListItemIcon>
      </ListItem>
      <Divider />
    </>
  );
};

export default WorkoutCard;
