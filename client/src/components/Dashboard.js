import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { UserContext } from "../context/UserContext";

const Dashboard = ({ history }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const init = async () => {
      const res = await axiosWithAuth().get(
        `users/${JSON.parse(localStorage.getItem("user"))}`
      );
      setUserInfo(res.data);
    };
    init();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <div>
        <h1>User Dashboard</h1>
        {userInfo && <h2>Welcome {userInfo.username}!</h2>}

        {userInfo &&
          userInfo.workouts.length > 0 &&
          userInfo.workouts.map(workout => (
            <div>
              <h3>
                {workout.name} - {workout.date}
              </h3>
              {workout.exercises && workout.exercises.length > 0
                ? workout.exercises.map(exercise => <li>{exercise.name}</li>)
                : "No exercises in this workout!"}
            </div>
          ))}

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
