import React from "react";
import Set from "./Set";
import SetForm from "./SetForm";

const Exercise = ({ exercise, workoutId, getWorkout }) => {
  return (
    <div>
      <h3>{exercise.name}</h3>
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
