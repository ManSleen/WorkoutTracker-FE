import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { UserContext } from "../context/UserContext";
import { WorkoutContext } from "../context/WorkoutContext";
import WorkoutForm from "./WorkoutForm";

const Dashboard = ({ history }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axiosWithAuth().get(
        `users/${JSON.parse(localStorage.getItem("user"))}`
      );
      setUserInfo(res.data);
    };
    fetchUserData();
  }, []);

  const addWorkout = async (workout, userId) => {
    try {
      await axiosWithAuth().post(`/users/${userId}/workouts`, workout);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userInfo: userInfo, addWorkout: addWorkout }}
    >
      <div>
        <h1>User Dashboard</h1>
        {userInfo && <h2>Welcome {userInfo.username}!</h2>}

        {userInfo && userInfo.workouts.length > 0 ? (
          userInfo.workouts
            .sort((a, b) => {
              console.log("a.date: ", a.date, "b.date: ", b.date);
              return b.date < a.date ? -1 : b.date > a.date ? 1 : 0;
            })
            .map(workout => (
              <div>
                <h3>
                  {workout.name} - {workout.date.substr(0, 10)}
                </h3>
                <h6>workout id: {workout._id}</h6>
                {workout.exercises && workout.exercises.length > 0
                  ? workout.exercises.map(exercise => (
                      <li>
                        {exercise.name} - {exercise._id}
                      </li>
                    ))
                  : "No exercises in this workout!"}
              </div>
            ))
        ) : (
          <p>You haven't added any workouts yet!</p>
        )}

        <WorkoutForm />

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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
