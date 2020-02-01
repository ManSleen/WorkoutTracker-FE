import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const Workout = ({ match }) => {
  const [workout, setWorkout] = useState();
  const { workoutId } = match.params;

  console.log("match.params", match.params);
  useEffect(() => {
    const getWorkout = async () => {
      const res = await axiosWithAuth().get(
        `/users/${localStorage.getItem("user")}/workouts/${workoutId}`
      );

      const workout = res.data;
      setWorkout(workout);
    };
    getWorkout();
  }, []);
  return (
    <div>
      {workout && <h1>{workout.name}</h1>}
      {workout && workout.exercises.length > 0
        ? workout.exercises.map(exercise => <div>{exercise.name}</div>)
        : "No exercises for this workout"}
    </div>
  );
};

export default Workout;
