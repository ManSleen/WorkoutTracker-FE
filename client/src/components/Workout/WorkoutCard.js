import React from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const WorkoutCard = ({ workout, fetchUserData }) => {
  const deleteWorkout = async () => {
    console.log("clicked delete!");
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().delete(`/users/${userId}/workouts/${workout._id}`);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "15px 0" }}>
      <Link key={workout._id} to={`/workout/${workout._id}`}>
        <div style={{ display: "inline" }}>
          <h3 style={{ display: "inline" }}>
            {workout.name} - {workout.date.substr(0, 10)}
          </h3>
        </div>
      </Link>

      <span>
        <button>Edit</button>
        <button onClick={() => deleteWorkout()}>Delete</button>
      </span>
    </div>
  );
};

export default WorkoutCard;
