import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import { makeStyles } from "@material-ui/core/styles";
import Exercise from "../Exercise/Exercise";
import ExerciseForm from "../Exercise/ExerciseForm";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: "0 auto"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

const Workout = ({ match }) => {
  const classes = useStyles();

  const [workout, setWorkout] = useState();
  const [isEditingName, setIsEditingName] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { workoutId } = match.params;

  const toggleForm = open => e => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setShowForm(open);
  };
  const getWorkout = async () => {
    const userId = localStorage.getItem("user");
    const res = await axiosWithAuth().get(
      `/users/${userId}/workouts/${workoutId}`
    );

    const workout = res.data;
    setWorkout(workout);
  };

  const updateWorkout = () => {};

  useEffect(() => {
    getWorkout();
  }, []);

  if (workout) {
    return (
      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <Container>
          <Card className={classes.root}>
            {isEditingName ? (
              <>
                <input
                  defaultValue={workout.name}
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    margin: ".67em auto",
                    display: "block",
                    fontFamily: "Roboto"
                  }}
                />
                <button
                  onClick={() => {
                    setIsEditingName(false);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <CardHeader
                  title={workout.name}
                  subheader={`${workout.date.substr(0, 10)} - ${
                    workout.duration
                  } mins`}
                  action={
                    <ListItemIcon
                      onClick={() => {
                        setIsEditingName(true);
                      }}
                    >
                      <EditIcon />
                    </ListItemIcon>
                  }
                />
              </>
            )}

            {/* {isEditing ? (
            <ListItemIcon
              button
              onClick={() => {
                setIsEditing(false);
                updateWorkout(workoutInfo, workout._id);
              }}
              style={{ cursor: "pointer" }}
            >
              <CheckRoundedIcon />
            </ListItemIcon>
          ) : (
            <ListItemIcon
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <EditIcon />
            </ListItemIcon>
          )} */}

            <List>
              {workout.exercises.length > 0
                ? workout.exercises.map(exercise => (
                    <Exercise
                      getWorkout={getWorkout}
                      key={exercise._id}
                      exercise={exercise}
                      workoutId={workoutId}
                    />
                  ))
                : "No exercises for this workout"}
            </List>
          </Card>
        </Container>
        <Tooltip title="Add an Exercise">
          <Fab
            color="primary"
            className={classes.fab}
            onClick={toggleForm(true)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Drawer anchor="bottom" open={showForm} onClose={toggleForm(false)}>
          <ExerciseForm getWorkout={getWorkout} workoutId={workoutId} />
        </Drawer>
      </div>
    );
  } else {
    return "loading...";
  }
};

export default Workout;
