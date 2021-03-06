import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import SetForm from "./SetForm";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(8)
  }
}));

const Set = ({ set, workoutId, exerciseId, getWorkout }) => {
  const classes = useStyles();

  const { number, weight, reps, completed } = set;

  const [isEditing, setIsEditing] = useState(false);

  const completeSet = async e => {
    e.preventDefault();
    const userId = localStorage.getItem("user");
    try {
      const changes = { ...set, completed: !completed };
      await axiosWithAuth().put(
        `/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}/sets/${set._id}`,
        changes
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSet = async e => {
    e.preventDefault();
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().delete(
        `/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}/sets/${set._id}`
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <List component="div" disablePadding>
      {isEditing ? (
        <>
          <ListItem className={classes.nested}>
            <SetForm
              setIsEditing={setIsEditing}
              getWorkout={getWorkout}
              exerciseId={exerciseId}
              isEditing={isEditing}
              set={set}
            />
          </ListItem>
        </>
      ) : (
        <ListItem className={classes.nested}>
          <Box
            display="flex"
            flexFlow="row nowrap"
            justifyContent="flex-start"
            width="100%"
            alignItems="center"
          >
            <Box
              width="40%"
              display="flex"
              flexFlow="row nowrap"
              alignItems="center"
            >
              <Checkbox
                checked={completed}
                onChange={completeSet}
                value="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <ListItemText primary={`${number}.`} />
              <ListItemText primary={`${reps} reps`} />
              <ListItemText primary={`x`} />
              <ListItemText primary={`${weight} lbs.`} />
            </Box>
            <Box>
              <ListItemIcon onClick={() => setIsEditing(true)}>
                <EditIcon style={{ fontSize: 15 }} />
              </ListItemIcon>
              <ListItemIcon onClick={deleteSet}>
                <DeleteIcon style={{ fontSize: 15 }} />
              </ListItemIcon>
            </Box>
          </Box>
        </ListItem>
      )}
      <Divider />
    </List>
  );
};

export default Set;
