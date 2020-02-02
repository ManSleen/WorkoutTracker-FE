import React from "react";
import Set from "./Set";
import SetForm from "./SetForm";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const Exercise = ({ exercise, workoutId, getWorkout }) => {
  const deleteExercise = async e => {
    e.preventDefault();
    console.log("clicked delete exercise!");
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().delete(
        `/users/${userId}/workouts/${workoutId}/exercises/${exercise._id}`
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ margin: "20px 0" }}>
      <h3 style={{ display: "inline" }}>{exercise.name}</h3>
      <span>
        <button onClick={e => deleteExercise(e)}>Delete</button>
      </span>
      {exercise.sets.length > 0 ? (
        exercise.sets.map(set => <Set key={set._id} set={set} />)
      ) : (
        <div>No sets in this exercise yet!</div>
      )}
      <SetForm
        getWorkout={getWorkout}
        exercise={exercise}
        workoutId={workoutId}
      />
    </div>
  );
};

export default Exercise;
