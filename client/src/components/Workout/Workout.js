import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import { makeStyles } from "@material-ui/core/styles";
import Exercise from "../Exercise/Exercise";
import ExerciseForm from "../Exercise/ExerciseForm";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: "0 auto",
    verticalAlign: "middle"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

const Workout = ({ match }) => {
  const classes = useStyles();

  const [workout, setWorkout] = useState();
  const [isEditing, setIsEditing] = useState(false);
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

  const handleChanges = e => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const updateWorkout = async e => {
    e.preventDefault();
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().put(
        `/users/${userId}/workouts/${workoutId}`,
        workout
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkout();
  }, []);

  if (workout) {
    return (
      <div
        style={{
          textAlign: "left",
          marginTop: "20px",
          verticalAlign: "middle"
        }}
      >
        <Container>
          {isEditing ? (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                p={1}
                m={1}
              >
                <Box p={1}>
                  <TextField
                    inputProps={{
                      style: {
                        fontSize: "3rem",
                        lineHeight: "3rem"
                      }
                    }}
                    label="Workout Name"
                    type="text"
                    placeholder="Workout Name"
                    name="name"
                    value={workout.name}
                    onChange={handleChanges}
                  />
                  <br />
                  <TextField
                    label="Date"
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={workout.date.substr(0, 10)}
                    onChange={handleChanges}
                  />
                  <br />
                  <TextField
                    label="Duration (mins)"
                    type="number"
                    placeholder="Duration (mins)"
                    name="duration"
                    value={workout.duration}
                    onChange={handleChanges}
                  />
                </Box>
                <Box alignSelf="center" p={1}>
                  <ListItemIcon
                    style={{ minWidth: 0, cursor: "pointer" }}
                    onClick={e => {
                      setIsEditing(false);
                      updateWorkout(e);
                    }}
                  >
                    <CheckRoundedIcon />
                  </ListItemIcon>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                p={1}
                m={1}
              >
                <Box p={1}>
                  <Typography gutterBottom variant="h2">
                    <strong>{workout.name}</strong>
                  </Typography>
                  <Typography variant="h5">
                    <strong>{workout.date.substr(0, 10)}</strong>
                  </Typography>
                  <Typography variant="h6">{`Duration: ${workout.duration} mins`}</Typography>
                </Box>
                <Box alignSelf="center" p={1}>
                  <ListItemIcon
                    style={{ minWidth: 0, cursor: "pointer" }}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    <EditIcon />
                  </ListItemIcon>
                </Box>
              </Box>
            </>
          )}

          <List>
            {workout.exercises.length > 0 ? (
              workout.exercises.map(exercise => (
                <Exercise
                  getWorkout={getWorkout}
                  key={exercise._id}
                  exercise={exercise}
                  workoutId={workoutId}
                />
              ))
            ) : (
              <p style={{ marginLeft: "20px" }}>
                No exercises for this workout
              </p>
            )}
          </List>
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
    return null;
  }
};

export default Workout;
