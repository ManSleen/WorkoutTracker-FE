import React from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const Set = ({ set, workoutId, exerciseId, getWorkout }) => {
  const { number, weight, reps, completed } = set;

  const deleteSet = async e => {
    e.preventDefault();
    console.log("clicked delete set!");
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
    <div>
      <span># {number}</span>
      <span>Weight: {weight}</span>
      <span>Reps: {reps}</span>
      <span>{completed ? "completed" : "not completed"}</span>
      <span>
        <button onClick={e => deleteSet(e)}>Delete</button>
      </span>
    </div>
  );
};

export default Set;
