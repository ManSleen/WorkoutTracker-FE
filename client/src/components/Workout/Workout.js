import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import Exercise from "../Exercise/Exercise";
import ExerciseForm from "../Exercise/ExerciseForm";

const Workout = ({ match }) => {
  const [workout, setWorkout] = useState();
  const { workoutId } = match.params;

  console.log("match.params", match.params);
  const getWorkout = async () => {
    const userId = localStorage.getItem("user");
    const res = await axiosWithAuth().get(
      `/users/${userId}/workouts/${workoutId}`
    );

    const workout = res.data;
    setWorkout(workout);
  };
  useEffect(() => {
    getWorkout();
  }, []);
  return (
    <div>
      {workout && <h1>{workout.name}</h1>}
      <ExerciseForm getWorkout={getWorkout} workoutId={workoutId} />
      {workout && workout.exercises.length > 0
        ? workout.exercises.map(exercise => (
            <Exercise
              getWorkout={getWorkout}
              key={exercise._id}
              exercise={exercise}
            />
          ))
        : "No exercises for this workout"}
    </div>
  );
};

export default Workout;
