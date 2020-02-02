import React, { useState } from "react";
import Set from "./Set";
import SetForm from "./SetForm";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const Exercise = ({ exercise, workoutId, getWorkout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [exerciseName, setExerciseName] = useState("");

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

  const updateExercise = async e => {
    e.preventDefault();
    console.log(exerciseName);
    const userId = localStorage.getItem("user");
    const exerciseObj = { name: exerciseName };
    try {
      await axiosWithAuth().put(
        `/users/${userId}/workouts/${workoutId}/exercises/${exercise._id}`,
        exerciseObj
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanges = e => {
    setExerciseName(e.target.value);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      {isEditing ? (
        <input onChange={handleChanges} type="text" value={exerciseName} />
      ) : (
        <h3
          onClick={() => setIsEditing(!isEditing)}
          style={{ display: "inline" }}
        >
          {exercise.name}
        </h3>
      )}
      <span>
        <button onClick={e => deleteExercise(e)}>Delete</button>
        {isEditing ? (
          <button
            onClick={e => {
              setIsEditing(!isEditing);
              updateExercise(e);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setExerciseName(exercise.name);
            }}
          >
            Edit
          </button>
        )}
      </span>
      {exercise.sets.length > 0 ? (
        exercise.sets
          .sort((a, b) => a.number - b.number)
          .map(set => (
            <Set
              exerciseId={exercise._id}
              workoutId={workoutId}
              key={set._id}
              set={set}
              getWorkout={getWorkout}
            />
          ))
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
