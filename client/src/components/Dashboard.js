import React, { useState, useEffect } from "react";

import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { UserContext } from "../context/UserContext";
import WorkoutForm from "./Workout/WorkoutForm";
import WorkoutCard from "./Workout/WorkoutCard";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  list: {
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

const Dashboard = ({ history, setIsLoading }) => {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState();

  const [showForm, setShowForm] = useState(false);

  const toggleForm = open => e => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setShowForm(open);
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    const res = await axiosWithAuth().get(
      `users/${localStorage.getItem("user")}`
    );
    setUserInfo(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const addWorkout = async (workout, userId) => {
    setIsLoading(true);
    try {
      await axiosWithAuth().post(`/users/${userId}/workouts`, workout);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateWorkout = async (workout, workoutId) => {
    setIsLoading(true);
    const userId = localStorage.getItem("user");
    const workoutObj = {
      name: workout.name,
      duration: workout.duration,
      date: workout.date
    };
    try {
      await axiosWithAuth().put(
        `/users/${userId}/workouts/${workoutId}`,
        workoutObj
      );
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteWorkout = async workoutId => {
    setIsLoading(true);
    console.log("clicked delete!");
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().delete(`/users/${userId}/workouts/${workoutId}`);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (userInfo) {
    return (
      <UserContext.Provider
        value={{ userInfo: userInfo, addWorkout: addWorkout }}
      >
        <div style={{ paddingTop: "40px" }}>
          <Container>
            {userInfo && (
              <>
                <Typography gutterBottom variant="h3">
                  Welcome back <strong>{userInfo.username}!</strong>
                  <span
                    style={{ fontSize: "2.5rem" }}
                    role="img"
                    aria-label="muscle emoji"
                  >
                    💪
                  </span>
                </Typography>
              </>
            )}
            <div style={{ marginTop: "60px", textAlign: "left" }}>
              <Typography gutterBottom variant="h5">
                <strong>Your Past Workouts</strong>
              </Typography>
              <List className={classes.list}>
                {userInfo && userInfo.workouts.length > 0 ? (
                  userInfo.workouts
                    .sort((a, b) => {
                      return b.date < a.date ? -1 : b.date > a.date ? 1 : 0;
                    })
                    .map(workout => (
                      <WorkoutCard
                        updateWorkout={updateWorkout}
                        deleteWorkout={deleteWorkout}
                        key={workout._id}
                        fetchUserData={fetchUserData}
                        workout={workout}
                      />
                    ))
                ) : (
                  <p>You haven't added any workouts yet!</p>
                )}
              </List>
            </div>
            <Tooltip title="Add a New Workout">
              <Fab
                color="primary"
                className={classes.fab}
                onClick={toggleForm(true)}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Container>
          <Drawer anchor="bottom" open={showForm} onClose={toggleForm(false)}>
            <WorkoutForm setShowForm={setShowForm} />
          </Drawer>
        </div>
      </UserContext.Provider>
    );
  } else {
    return "loading...";
  }
};

export default Dashboard;
