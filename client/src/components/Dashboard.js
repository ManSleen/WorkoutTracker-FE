import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { UserContext } from "../context/UserContext";
import WorkoutForm from "./Workout/WorkoutForm";
import WorkoutCard from "./Workout/WorkoutCard";

const Dashboard = ({ history, setIsLoading }) => {
  const [userInfo, setUserInfo] = useState();

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
  };

  const deleteWorkout = async workoutId => {
    console.log("clicked delete!");
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().delete(`/users/${userId}/workouts/${workoutId}`);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userInfo: userInfo, addWorkout: addWorkout }}
    >
      <div>
        {userInfo && <h1>Welcome {userInfo.username}!</h1>}
        <WorkoutForm />
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

        <button
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
        >
          Log Out
        </button>
      </div>
    </UserContext.Provider>
  );
};

export default Dashboard;
